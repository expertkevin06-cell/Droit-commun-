// Historique local des recherches, stocké dans localStorage, pour un accès
// instantané hors-ligne aux dernières réponses consultées.

export type SearchRecord = {
  question: string;
  theme?: "droit-commun" | "droit-automobile";
  sousTheme?: string | null;
  timestamp: string;
  gemini: { ok: boolean; text?: string; error?: string };
  perplexity: { ok: boolean; text?: string; citations?: string[]; error?: string };
  legifrance: {
    ok: boolean;
    configured: boolean;
    articles: { title: string; code: string; url: string; excerpt?: string }[];
    fallbackUrl: string;
    daloszUrl: string;
    error?: string;
  };
};

const STORAGE_KEY = "dgk_search_history_v1";
const MAX_HISTORY = 25;

export function saveSearchRecord(record: SearchRecord) {
  if (typeof window === "undefined") return;
  try {
    const history = getSearchHistory();
    const deduped = history.filter(
      (h) =>
        !(h.question === record.question && (h.theme || "droit-commun") === (record.theme || "droit-commun"))
    );
    const updated = [record, ...deduped].slice(0, MAX_HISTORY);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Stockage plein ou indisponible : on ignore silencieusement.
  }
}

export function getSearchHistory(): SearchRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SearchRecord[]) : [];
  } catch {
    return [];
  }
}

export function findCachedRecord(
  question: string,
  theme?: "droit-commun" | "droit-automobile"
): SearchRecord | undefined {
  return getSearchHistory().find(
    (h) =>
      h.question.trim().toLowerCase() === question.trim().toLowerCase() &&
      (!theme || (h.theme || "droit-commun") === theme)
  );
}

export function clearSearchHistory() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
