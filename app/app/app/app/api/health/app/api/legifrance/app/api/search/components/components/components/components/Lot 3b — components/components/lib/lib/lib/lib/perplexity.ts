// Appel serveur à l'API Perplexity (modèle "sonar", avec sources web citées).
// Nécessite la variable d'environnement PERPLEXITY_API_KEY.

import type { ThemeKey } from "@/lib/themes";
import { buildOrientation } from "@/lib/prompts";

export type PerplexityResult = {
  ok: boolean;
  text?: string;
  citations?: string[];
  error?: string;
};

const PERPLEXITY_URL = "https://api.perplexity.ai/chat/completions";

export async function askPerplexity(
  question: string,
  theme?: ThemeKey,
  sousTheme?: string
): Promise<PerplexityResult> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error:
        "Clé PERPLEXITY_API_KEY absente. Ajoutez-la dans les variables d'environnement Vercel pour activer Perplexity.",
    };
  }

  const systemPrompt = `Tu es un assistant juridique spécialisé en droit français, rigoureux et à jour.
Réponds en français, de façon structurée. Cite systématiquement les articles de loi précis
(Code civil, Code pénal, Code de la consommation, etc.) et privilégie les sources officielles
(legifrance.gouv.fr, service-public.fr) ainsi que des synthèses fiables (Dalloz, Village de la Justice)
lorsque tu t'appuies sur le web. Indique clairement si un point est débattu en doctrine ou en jurisprudence.

${buildOrientation(theme)}${sousTheme ? `\nContexte précis signalé par l'utilisateur : "${sousTheme}".` : ""}`;

  try {
    const res = await fetch(PERPLEXITY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "sonar",
        temperature: 0.2,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return { ok: false, error: `Erreur Perplexity (${res.status}) : ${errText.slice(0, 300)}` };
    }

    const data = await res.json();
    const text: string | undefined = data?.choices?.[0]?.message?.content;
    const citations: string[] | undefined = data?.citations;

    if (!text) {
      return { ok: false, error: "Réponse Perplexity vide." };
    }

    return { ok: true, text, citations };
  } catch (err: any) {
    return { ok: false, error: `Échec de connexion à Perplexity : ${err?.message || err}` };
  }
}
