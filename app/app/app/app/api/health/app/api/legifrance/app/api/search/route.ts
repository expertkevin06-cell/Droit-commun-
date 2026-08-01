import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { askPerplexity } from "@/lib/perplexity";
import { searchLegifrance } from "@/lib/legifrance";
import type { ThemeKey } from "@/lib/themes";

export const runtime = "nodejs";

const VALID_THEMES: ThemeKey[] = ["droit-commun", "droit-automobile"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const question = (searchParams.get("q") || "").trim();
  const rawTheme = searchParams.get("theme") || "droit-commun";
  const sousTheme = (searchParams.get("sousTheme") || "").trim() || undefined;

  if (!question) {
    return NextResponse.json(
      { error: "Merci de saisir une question juridique." },
      { status: 400 }
    );
  }
  if (question.length > 800) {
    return NextResponse.json(
      { error: "Question trop longue (800 caractères maximum)." },
      { status: 400 }
    );
  }

  const theme: ThemeKey = VALID_THEMES.includes(rawTheme as ThemeKey)
    ? (rawTheme as ThemeKey)
    : "droit-commun";

  const [gemini, perplexity, legifrance] = await Promise.allSettled([
    askGemini(question, theme, sousTheme),
    askPerplexity(question, theme, sousTheme),
    searchLegifrance(question, theme),
  ]);

  return NextResponse.json({
    question,
    theme,
    sousTheme: sousTheme || null,
    timestamp: new Date().toISOString(),
    gemini: gemini.status === "fulfilled" ? gemini.value : { ok: false, error: "Échec Gemini." },
    perplexity:
      perplexity.status === "fulfilled"
        ? perplexity.value
        : { ok: false, error: "Échec Perplexity." },
    legifrance:
      legifrance.status === "fulfilled"
        ? legifrance.value
        : { ok: false, configured: false, articles: [], fallbackUrl: "", daloszUrl: "" },
  });
}
