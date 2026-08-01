// Fiches juridiques détaillées — Droit automobile.
// Contenu fourni à titre informatif : vérifiez toujours la version en vigueur
// sur Légifrance, les textes de loi évoluant (notamment le Code de la
// consommation, recodifié en 2022 pour la garantie légale de conformité).

export type LegalArticle = {
  code: string;
  article: string;
  note?: string;
};

export type Fiche = {
  id: string;
  title: string;
  summary: string;
  articles: LegalArticle[];
  development: string; // texte détaillé, structuré en paragraphes séparés par \n\n
  recours: string; // que faire concrètement
};

export const FICHES_AUTOMOBILE: Fiche[] = [
  {
    id: "vice-cache",
    title: "Vice caché",
    summary:
      "Défaut non apparent lors de l'achat, existant avant la vente, rendant le véhicule impropre à l'usage ou diminuant fortement cet usage.",
    articles: [
      { code: "Code civil", article: "art. 1641 à 1649" },
      { code: "Code civil", article: "art. 1648", note: "délai d'action : 2 ans à compter de la découverte du vice" },
    ],
    development: `Le vice caché est un défaut du véhicule qui n'était pas apparent au moment de l'achat, qui existait déjà (même de façon latente) avant la vente, et qui rend le véhicule impropre à l'usage auquel il est destiné, ou qui diminue tellement cet usage que l'acheteur ne l'aurait pas acheté, ou l'aurait acheté à un prix moindre, s'il l'avait connu.

Trois conditions cumulatives doivent être réunies : le défaut doit être caché (non détectable lors d'un examen normal), antérieur à la vente, et suffisamment grave.

Le vendeur professionnel (garage, concessionnaire) est présumé par la jurisprudence connaître les vices du véhicule qu'il vend, ce qui renforce sa responsabilité par rapport à un vendeur particulier de bonne foi.`,
    recours:
      "Action en garantie des vices cachés dans un délai de 2 ans à compter de la découverte du vice (et non de l'achat). L'acheteur peut choisir l'action rédhibitoire (annulation de la vente, restitution du prix) ou l'action estimatoire (garder le véhicule avec une réduction du prix), conformément à l'article 1644 du Code civil. Une expertise automobile contradictoire est fortement recommandée pour établir l'antériorité du défaut.",
  },
  {
    id: "non-facons",
    title: "Non-façons",
    summary:
      "Travaux facturés ou convenus qui n'ont en réalité pas été réalisés, en tout ou partie, par le réparateur.",
    articles: [
      { code: "Code civil", article: "art. 1217 et 1231-1", note: "inexécution contractuelle" },
      { code: "Code pénal", article: "art. 313-1", note: "si facturation frauduleuse de travaux non effectués : escroquerie" },
    ],
    development: `La « non-façon » désigne une prestation convenue (et souvent facturée) qui n'a en réalité pas été exécutée, en tout ou partie, par le réparateur. Il ne s'agit pas d'un travail mal fait (malfaçon) mais d'un travail absent : par exemple une pièce facturée comme remplacée mais qui ne l'a jamais été, ou une opération d'entretien annoncée sur la facture mais non réalisée en atelier.

Juridiquement, il s'agit d'une inexécution contractuelle : le réparateur ne remplit pas l'obligation à laquelle il s'est engagé (obligation de faire). Lorsque la facturation de travaux fictifs est intentionnelle, la qualification pénale d'escroquerie peut être retenue, car il y a manœuvre frauduleuse destinée à obtenir un paiement indu.`,
    recours:
      "Faire constater la non-façon par une contre-expertise ou un second avis technique (démontage si nécessaire), mettre le réparateur en demeure d'exécuter la prestation ou de rembourser, et, en cas de mauvaise foi caractérisée, envisager un dépôt de plainte pour escroquerie en parallèle de l'action civile en réparation du préjudice.",
  },
  {
    id: "malfacons",
    title: "Malfaçons",
    summary:
      "Travaux réalisés mais exécutés de façon défectueuse, non conforme aux règles de l'art ou au devis accepté.",
    articles: [
      { code: "Code civil", article: "art. 1231-1", note: "responsabilité contractuelle pour mauvaise exécution" },
      { code: "Code civil", article: "art. 1789 et s.", note: "contrat d'entreprise / louage d'ouvrage" },
    ],
    development: `La malfaçon est un travail effectivement réalisé, mais mal exécuté : montage incorrect d'une pièce, réglage défaillant, oubli d'une étape technique, non-respect des préconisations du constructeur. Elle se distingue de la non-façon (absence totale de travail) et du vice caché (défaut préexistant du véhicule indépendant de l'intervention du réparateur).

Le contrat conclu avec un garage pour une réparation est un contrat d'entreprise (louage d'ouvrage). Le réparateur est tenu d'exécuter sa prestation conformément aux règles de l'art et selon le devis accepté. Toute exécution défectueuse engage sa responsabilité contractuelle.`,
    recours:
      "Signaler la malfaçon par écrit (lettre recommandée avec accusé de réception) en détaillant les désordres constatés, demander la reprise gratuite des travaux, et à défaut de réponse ou de solution amiable, solliciter une expertise contradictoire puis, si besoin, saisir le médiateur de la consommation ou le tribunal compétent.",
  },
  {
    id: "obligation-resultat",
    title: "Obligation de résultat",
    summary:
      "Le réparateur automobile est tenu, selon une jurisprudence constante, à une obligation de résultat concernant la réparation confiée.",
    articles: [
      { code: "Code civil", article: "art. 1231-1", note: "distinction obligation de moyens / obligation de résultat" },
    ],
    development: `En droit des contrats, on distingue l'obligation de moyens (le professionnel doit mettre en œuvre tous les moyens raisonnables, sans garantir le résultat) de l'obligation de résultat (le professionnel doit atteindre le résultat promis, sous peine de voir sa faute présumée).

La jurisprudence considère de façon constante que le garagiste réparateur est tenu d'une obligation de résultat quant à la réparation qu'il effectue : le véhicule doit fonctionner correctement une fois la réparation réalisée. Si la panne réapparaît ou qu'un nouveau désordre lié à l'intervention survient, la faute du réparateur est présumée, et c'est à lui de prouver une cause étrangère (par exemple une mauvaise utilisation du véhicule par le client) pour s'exonérer.

Cette présomption de faute facilite grandement l'action du client, qui n'a pas à démontrer la faute technique précise du réparateur : il suffit de démontrer que le résultat promis (véhicule réparé et fonctionnel) n'a pas été atteint.`,
    recours:
      "En cas de panne liée à la réparation, il n'est pas nécessaire de prouver la faute technique exacte : il suffit d'établir le lien entre l'intervention et le nouveau désordre. Mise en demeure du réparateur, puis expertise contradictoire en cas de contestation, avant action en justice si besoin.",
  },
  {
    id: "dol",
    title: "Dol",
    summary:
      "Manœuvre frauduleuse ou mensonge destiné à tromper l'acheteur pour obtenir son consentement à la vente.",
    articles: [
      { code: "Code civil", article: "art. 1137", note: "définition du dol" },
      { code: "Code civil", article: "art. 1178", note: "nullité du contrat en cas de vice du consentement" },
    ],
    development: `Le dol est un vice du consentement : il s'agit de manœuvres, mensonges ou dissimulations volontaires par lesquels un contractant obtient le consentement de l'autre. En matière automobile, le dol peut consister à dissimuler volontairement un accident grave, un compteur kilométrique trafiqué, ou à mentir sur l'historique d'entretien du véhicule.

Contrairement au vice caché (qui n'exige pas de démontrer une intention de tromper), le dol suppose de prouver la mauvaise foi du vendeur : il savait et a volontairement caché ou déformé l'information.

Le dol peut être invoqué même si, techniquement, les conditions du vice caché ne seraient pas toutes réunies, car son fondement est différent (vice du consentement, et non défaut de la chose).`,
    recours:
      "Le dol permet de demander la nullité de la vente (le contrat est annulé, chacun restitue ce qu'il a reçu) et/ou des dommages-intérêts. Il faut réunir les preuves de la mauvaise foi du vendeur (annonces, échanges écrits, expertise établissant l'antériorité de la dissimulation).",
  },
  {
    id: "tromperie",
    title: "Tromperie",
    summary:
      "Infraction pénale consistant à tromper l'acheteur sur les qualités substantielles, l'origine ou la quantité du véhicule ou de la prestation.",
    articles: [
      { code: "Code de la consommation", article: "art. L441-1 (ex-art. L213-1)", note: "délit de tromperie" },
      { code: "Code de la route", article: "art. L119-1 et s.", note: "fraude au compteur kilométrique" },
    ],
    development: `La tromperie est une infraction pénale prévue par le Code de la consommation : le fait de tromper ou de tenter de tromper le cocontractant sur la nature, l'origine, les qualités substantielles, la composition ou l'aptitude à l'emploi d'un bien ou d'un service. En matière automobile, elle recoupe fréquemment le trafic de compteur kilométrique, spécifiquement réprimé par le Code de la route.

Contrairement au dol (sanction civile : nullité du contrat), la tromperie est une infraction pénale poursuivie par le ministère public, indépendamment de l'action civile en réparation que peut mener la victime.`,
    recours:
      "Dépôt de plainte auprès du commissariat, de la gendarmerie ou du procureur de la République, en parallèle d'une action civile en dommages-intérêts. La DGCCRF peut également être saisie pour signaler des pratiques commerciales trompeuses.",
  },
  {
    id: "garantie-legale-conformite",
    title: "Garantie légale de conformité",
    summary:
      "Garantie due par le vendeur professionnel : le véhicule doit être conforme à l'usage attendu et aux caractéristiques annoncées.",
    articles: [
      { code: "Code de la consommation", article: "art. L217-3 à L217-32", note: "recodifié en 2022 (ordonnance n° 2021-1247)" },
    ],
    development: `La garantie légale de conformité oblige tout vendeur professionnel à livrer un bien conforme au contrat : le véhicule doit correspondre à la description, être propre à l'usage habituellement attendu et présenter les qualités annoncées.

Depuis la réforme entrée en vigueur en 2022, cette garantie s'applique pendant 2 ans pour les biens neufs à compter de la délivrance, et pendant un délai qui a été porté à 12 mois minimum pour les biens d'occasion (contre 6 mois auparavant), sauf disposition contractuelle plus favorable.

Un défaut de conformité apparu dans ce délai est présumé exister au moment de la délivrance, sauf preuve contraire du vendeur (présomption plus ou moins étendue selon la date d'apparition du défaut) — ce qui facilite considérablement la démarche de l'acheteur par rapport à la garantie des vices cachés.`,
    recours:
      "L'acheteur peut demander la réparation ou le remplacement du véhicule (ou de la pièce concernée). En cas d'impossibilité ou de refus, il peut demander une réduction du prix ou la résolution de la vente. La demande doit être adressée par écrit au vendeur professionnel.",
  },
  {
    id: "garantie-delivrance",
    title: "Garantie de délivrance conforme",
    summary:
      "Obligation pour le vendeur de livrer un véhicule conforme à ce qui a été convenu au moment de la vente.",
    articles: [
      { code: "Code civil", article: "art. 1604 et s.", note: "obligation de délivrance" },
    ],
    development: `La garantie de délivrance conforme oblige le vendeur à livrer exactement la chose convenue, dans les caractéristiques, quantité et qualité prévues au contrat. Elle se distingue de la garantie des vices cachés : ici, le défaut est apparent dès la livraison et porte sur une différence entre ce qui a été commandé/annoncé et ce qui a été effectivement livré (par exemple un véhicule livré avec une motorisation, un kilométrage ou des équipements différents de ceux annoncés).

Cette non-conformité à la délivrance doit en principe être signalée rapidement, dès la prise de possession du véhicule, avant d'entamer son usage normal.`,
    recours:
      "Refuser la livraison ou signaler immédiatement l'écart par écrit, demander la mise en conformité, le remplacement, ou la résolution de la vente avec restitution du prix si l'écart est substantiel.",
  },
