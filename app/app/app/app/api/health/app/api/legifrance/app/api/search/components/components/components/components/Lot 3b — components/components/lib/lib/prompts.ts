import type { ThemeKey } from "@/lib/themes";

// Fonction pure (aucun appel réseau) afin d'être facilement testable en autotest.

const SOCLE_COMMUN = `Tu es un assistant juridique spécialisé en droit français.
Réponds de façon claire, structurée et rigoureuse, en français.
Consignes :
- Explique le principe juridique applicable.
- Cite les articles de loi précis avec leur numéro exact.
- Précise les conditions d'application et les éventuelles exceptions.
- Reste concis mais complet (paragraphes courts).
- Si tu n'es pas certain d'un numéro d'article, indique-le explicitement plutôt que d'inventer une référence.`;

const ORIENTATION_DROIT_COMMUN = `Domaine : droit commun (tous domaines confondus : civil, pénal, consommation, contrats, famille, travail, etc.).
Appuie-toi en priorité sur le Code civil, le Code pénal et le Code de la consommation selon la question posée.`;

const ORIENTATION_DROIT_AUTOMOBILE = `Domaine : droit automobile — litiges avec les garages/réparateurs automobiles,
expertises et contre-expertises automobiles, assurance auto, vices cachés sur véhicule.
Appuie-toi en priorité sur :
- le Code de la consommation (garantie légale de conformité, art. L217-3 et suivants ; vices cachés art. L217-14 ; pratiques commerciales) ;
- le Code civil (vices cachés art. 1641 à 1649 ; responsabilité contractuelle art. 1231-1 ; obligation d'information et de conseil du professionnel) ;
- le Code des assurances (expertise, indemnisation, contre-expertise) ;
- la réglementation de la profession d'expert en automobile (loi n° 71-1130 du 31 décembre 1971 modifiée, encadrant les experts en automobile, et le Conseil national des experts en automobile — CNEA) ;
- les obligations du réparateur (devis, respect du prix convenu, utilisation de pièces d'occasion — obligation d'information depuis la loi anti-gaspillage / AGEC).
Précise, quand c'est pertinent, la procédure concrète (mise en demeure, saisine du médiateur de la consommation, contre-expertise contradictoire, action en justice).`;

export function buildOrientation(theme: ThemeKey | undefined): string {
  if (theme === "droit-automobile") return ORIENTATION_DROIT_AUTOMOBILE;
  return ORIENTATION_DROIT_COMMUN;
}

export function buildLegalPrompt(
  question: string,
  theme?: ThemeKey,
  sousTheme?: string
): string {
  const orientation = buildOrientation(theme);
  const contexteSousTheme = sousTheme
    ? `\nContexte précis signalé par l'utilisateur : "${sousTheme}".`
    : "";

  return `${SOCLE_COMMUN}

${orientation}${contexteSousTheme}

Question : ${question}`;
}

export function buildLegifranceQuery(
  question: string,
  theme?: ThemeKey
): string {
  if (theme === "droit-automobile") {
    return `${question} réparateur automobile expert garantie véhicule`;
  }
  return question;
}
