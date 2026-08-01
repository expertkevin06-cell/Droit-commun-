// Favoris ("fiches enregistrées") — stockage local des ids de fiches sauvegardées
// par l'utilisateur, pour un accès rapide même hors ligne (le contenu des fiches
// est intégré à l'application, donc déjà disponible hors ligne par nature ;
// ceci ne fait qu'épingler les fiches préférées de l'utilisateur).

const STORAGE_KEY = "dgk_saved_fiches_v1";

export function getSavedFicheIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function isFicheSaved(id: string): boolean {
  return getSavedFicheIds().includes(id);
}

export function toggleSavedFiche(id: string): string[] {
  if (typeof window === "undefined") return [];
  const current = getSavedFicheIds();
  const updated = current.includes(id)
    ? current.filter((f) => f !== id)
    : [...current, id];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // stockage indisponible : on ignore silencieusement
  }
  return updated;
}
