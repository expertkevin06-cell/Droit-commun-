import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    gemini: Boolean(process.env.GEMINI_API_KEY),
    perplexity: Boolean(process.env.PERPLEXITY_API_KEY),
    legifrance: Boolean(
      process.env.LEGIFRANCE_CLIENT_ID && process.env.LEGIFRANCE_CLIENT_SECRET
    ),
  });
}
