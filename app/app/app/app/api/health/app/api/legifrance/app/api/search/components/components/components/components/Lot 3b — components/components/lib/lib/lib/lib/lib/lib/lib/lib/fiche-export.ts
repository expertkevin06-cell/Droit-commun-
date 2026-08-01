import type { Fiche } from "@/lib/fiches-automobile";

const LIGNE = "─".repeat(60);

export function buildFicheText(fiche: Fiche): string {
  const articles = fiche.articles
    .map((a) => `  • ${a.code}, ${a.article}${a.note ? ` — ${a.note}` : ""}`)
    .join("\n");

  return `${LIGNE}
DROIT GÉNÉRAL BY KEVIN — FICHE JURIDIQUE (Droit automobile)
${LIGNE}

${fiche.title.toUpperCase()}

${fiche.summary}

TEXTES DE LOI EN RÉFÉRENCE
${articles}

DÉVELOPPEMENT
${fiche.development}

QUE FAIRE ? (recours pratiques)
${fiche.recours}

${LIGNE}
Document généré par Droit Général by Kevin — à titre informatif uniquement,
ne remplace pas l'avis d'un professionnel du droit. Vérifiez la version en
vigueur des textes sur https://www.legifrance.gouv.fr
${LIGNE}
`;
}

export function buildDossierText(fiches: Fiche[]): string {
  const sommaire = fiches.map((f, i) => `  ${i + 1}. ${f.title}`).join("\n");
  const corps = fiches.map((f) => buildFicheText(f)).join("\n\n");

  return `${LIGNE}
DROIT GÉNÉRAL BY KEVIN — DOSSIER COMPLET
Droit automobile : réparateurs, experts, garanties
${LIGNE}

SOMMAIRE (${fiches.length} fiches)
${sommaire}

${corps}`;
}

export function fichesFileName(fiche: Fiche): string {
  return `droit-general-kevin_fiche_${fiche.id}.txt`;
}

export const DOSSIER_FILE_NAME = "droit-general-kevin_dossier-droit-automobile.txt";
