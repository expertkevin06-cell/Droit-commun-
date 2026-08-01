// Intégration Légifrance via l'API officielle et gratuite PISTE (DILA).
// Documentation & inscription (gratuite) : https://piste.gouv.fr
// Nécessite LEGIFRANCE_CLIENT_ID et LEGIFRANCE_CLIENT_SECRET dans les variables d'environnement.
//
// NB : Dalloz n'expose pas d'API publique et son contenu est protégé — on ne fait
// jamais de scraping de Dalloz ici, uniquement un lien de recherche direct vers dalloz.fr.

import type { ThemeKey } from "@/lib/themes";
import { buildLegifranceQuery } from "@/lib/prompts";

const TOKEN_URL = "https://oauth.piste.gouv.fr/api/oauth/token";
const SEARCH_URL = "https://api.piste.gouv.fr/dila/legifrance/lf-engine-app/search";

export type LegifranceArticle = {
  title: string;
  code: string;
  articleNumber?: string;
  url: string;
  excerpt?: string;
};

export type LegifranceResult = {
  ok: boolean;
  configured: boolean;
  articles: LegifranceArticle[];
  fallbackUrl: string;
  daloszUrl: string;
  error?: string;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.LEGIFRANCE_CLIENT_ID;
  const clientSecret = process.env.LEGIFRANCE_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now() + 5000) {
    return cachedToken.value;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
    scope: "openid",
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) return null;

  const data = await res.json();
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return cachedToken.value;
}

function buildFallbackUrl(question: string) {
  return `https://www.legifrance.gouv.fr/search/all?query=${encodeURIComponent(question)}`;
}

function buildDallozUrl(question: string) {
  return `https://www.dalloz.fr/recherche?query=${encodeURIComponent(question)}`;
}

export async function searchLegifrance(
  question: string,
  theme?: ThemeKey
): Promise<LegifranceResult> {
  const fallbackUrl = buildFallbackUrl(question);
  const daloszUrl = buildDallozUrl(question);
  const enrichedQuery = buildLegifranceQuery(question, theme);

  const clientId = process.env.LEGIFRANCE_CLIENT_ID;
  const clientSecret = process.env.LEGIFRANCE_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return {
      ok: true,
      configured: false,
      articles: [],
      fallbackUrl,
      daloszUrl,
      error:
        "Identifiants PISTE/Légifrance non configurés (LEGIFRANCE_CLIENT_ID / LEGIFRANCE_CLIENT_SECRET). Lien de recherche direct fourni à la place.",
    };
  }

  const token = await getAccessToken();
  if (!token) {
    return {
      ok: false,
      configured: true,
      articles: [],
      fallbackUrl,
      daloszUrl,
      error:
        "Identifiants PISTE/Légifrance configurés mais l'authentification a échoué. Vérifiez le Client ID / Secret.",
    };
  }

  try {
    const res = await fetch(SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        recherche: {
          champs: [
            {
              typeChamp: "ALL",
              criteres: [
                { typeRecherche: "UN_DES_MOTS", valeur: enrichedQuery, operateur: "ET" },
              ],
              operateur: "ET",
            },
          ],
          pageNumber: 1,
          pageSize: 8,
          sort: "PERTINENCE",
          typePagination: "DEFAUT",
        },
        fond: "CODE_DATE",
      }),
    });

    if (!res.ok) {
      return {
        ok: false,
        configured: true,
        articles: [],
        fallbackUrl,
        daloszUrl,
        error: `Erreur API Légifrance (${res.status}).`,
      };
    }

    const data = await res.json();
    const results = data?.results ?? [];

    const articles: LegifranceArticle[] = results.slice(0, 6).map((r: any) => {
      const titre = r?.titre || r?.titles?.[0]?.title || "Texte de loi";
      const id = r?.titles?.[0]?.id || r?.id;
      return {
        title: titre,
        code: r?.nature || "Code",
        url: id
          ? `https://www.legifrance.gouv.fr/codes/article_lc/${id}`
          : fallbackUrl,
        excerpt: r?.extract?.slice(0, 220),
      };
    });

    return { ok: true, configured: true, articles, fallbackUrl, daloszUrl };
  } catch (err: any) {
    return {
      ok: false,
      configured: true,
      articles: [],
      fallbackUrl,
      daloszUrl,
      error: `Échec de connexion à Légifrance : ${err?.message || err}`,
    };
  }
}
