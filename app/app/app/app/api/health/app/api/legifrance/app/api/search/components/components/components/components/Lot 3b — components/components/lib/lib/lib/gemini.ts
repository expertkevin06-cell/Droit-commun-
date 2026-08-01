// Appel serveur à l'API Gemini (Google AI Studio).
// Nécessite la variable d'environnement GEMINI_API_KEY (jamais exposée au client).

import type { ThemeKey } from "@/lib/themes";
import { buildLegalPrompt } from "@/lib/prompts";

export type GeminiResult = {
  ok: boolean;
  text?: string;
  error?: string;
};

const GEMINI_MODEL = "gemini-2.0-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function askGemini(
  question: string,
  theme?: ThemeKey,
  sousTheme?: string
): Promise<GeminiResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Clé GEMINI_API_KEY absente. Ajoutez-la dans les variables d'environnement Vercel pour activer Gemini.",
    };
  }

  const prompt = buildLegalPrompt(question, theme, sousTheme);

  try {
    const res = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1200 },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Erreur Gemini (${res.status}) : ${errText.slice(0, 300)}` };
    }

    const data = await res.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join("\n");

    if (!text) {
      return { ok: false, error: "Réponse Gemini vide ou filtrée." };
    }

    return { ok: true, text };
  } catch (err: any) {
    return { ok: false, error: `Échec de connexion à Gemini : ${err?.message || err}` };
  }
}
