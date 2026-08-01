// Définition des thèmes de recherche : "droit commun" (généraliste)
// et "droit automobile" (réparateurs, experts automobile, litiges véhicule),
// avec son menu déroulant de problématiques courantes.

export type ThemeKey = "droit-commun" | "droit-automobile";

export type SousTheme = {
  id: string;
  label: string;
  // Question pré-remplie proposée à l'utilisateur, modifiable avant validation.
  questionTemplate: string;
};

export const THEMES: { key: ThemeKey; label: string; description: string }[] = [
  {
    key: "droit-commun",
    label: "Droit commun",
    description: "Recherche juridique générale (tous domaines du droit français).",
  },
  {
    key: "droit-automobile",
    label: "Droit automobile",
    description: "Réparateurs, garages, experts automobile, litiges liés au véhicule.",
  },
];

export const SOUS_THEMES_AUTOMOBILE: SousTheme[] = [
  {
    id: "litige-garage",
    label: "Litige avec un garage / réparateur",
    questionTemplate:
      "Quels sont mes recours en cas de litige avec un garage automobile ?",
  },
  {
    id: "reparation-non-conforme",
    label: "Réparation mal exécutée ou non conforme au devis",
    questionTemplate:
      "Le garage a effectué une réparation non conforme au devis signé, que puis-je faire ?",
  },
  {
    id: "devis-non-respecte",
    label: "Devis non respecté / dépassement de prix",
    questionTemplate:
      "Le réparateur me facture un montant supérieur au devis initial sans mon accord, est-ce légal ?",
  },
  {
    id: "expertise-contestee",
    label: "Expertise automobile contestée",
    questionTemplate:
      "Comment contester les conclusions d'un rapport d'expertise automobile ?",
  },
  {
    id: "desaccord-expert-assurance",
    label: "Désaccord avec l'expert mandaté par l'assurance",
    questionTemplate:
      "Je suis en désaccord avec l'expert automobile mandaté par mon assurance, quels sont mes droits ?",
  },
  {
    id: "contre-expertise",
    label: "Demande de contre-expertise",
    questionTemplate:
      "Comment demander une contre-expertise automobile et qui en supporte le coût ?",
  },
  {
    id: "refus-prise-en-charge",
    label: "Refus de prise en charge par l'assurance",
    questionTemplate:
      "Mon assurance refuse de prendre en charge les réparations de mon véhicule, quels recours ai-je ?",
  },
  {
    id: "vice-cache",
    label: "Vice caché sur véhicule d'occasion",
    questionTemplate:
      "J'ai acheté un véhicule d'occasion avec un vice caché, comment agir contre le vendeur ?",
  },
  {
    id: "garantie-legale",
    label: "Garantie légale de conformité non respectée",
    questionTemplate:
      "Le réparateur refuse d'appliquer la garantie légale de conformité sur une pièce défectueuse, que dit la loi ?",
  },
  {
    id: "pieces-non-conformes",
    label: "Pièces non conformes ou d'occasion non signalées",
    questionTemplate:
      "Le garage a utilisé des pièces d'occasion sans m'en informer, en avait-il le droit ?",
  },
  {
    id: "immobilisation-prolongee",
    label: "Immobilisation prolongée du véhicule chez le réparateur",
    questionTemplate:
      "Mon véhicule est immobilisé chez le garagiste depuis plusieurs semaines, puis-je demander une indemnisation ?",
  },
  {
    id: "vei-epave",
    label: "Véhicule économiquement irréparable (VEI) / épave",
    questionTemplate:
      "Mon véhicule a été déclaré économiquement irréparable (VEI), quelles sont les conséquences et mes droits ?",
  },
  {
    id: "responsabilite-reparateur",
    label: "Responsabilité du réparateur en cas de panne après réparation",
    questionTemplate:
      "Une panne est survenue peu après une réparation, la responsabilité du garagiste est-elle engagée ?",
  },
  {
    id: "autre-auto",
    label: "Autre problème automobile",
    questionTemplate: "",
  },
];

export function getSousTheme(id: string): SousTheme | undefined {
  return SOUS_THEMES_AUTOMOBILE.find((s) => s.id === id);
}
