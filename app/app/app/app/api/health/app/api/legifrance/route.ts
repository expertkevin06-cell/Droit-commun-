import { NextRequest, NextResponse } from "next/server";
import { searchLegifrance } from "@/lib/legifrance";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const question = (searchParams.get("q") || "").trim();

  if (!question) {
    return NextResponse.json({ error: "Paramètre 'q' manquant." }, { status: 400 });
  }

  const result = await searchLegifrance(question);
  return NextResponse.json(result);
}
