"use client";

import { useEffect, useState } from "react";
import { FICHES_AUTOMOBILE, type Fiche } from "@/lib/fiches-automobile";
import {
  buildFicheText,
  buildDossierText,
  fichesFileName,
  DOSSIER_FILE_NAME,
} from "@/lib/fiche-export";
import { getSavedFicheIds, toggleSavedFiche } from "@/lib/fiches-store";

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function printFiche(fiche: Fiche) {
  const text = buildFicheText(fiche);
  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) return;
  win.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8" />
    <title>${fiche.title} — Droit Général by Kevin</title>
    <style>
      body { font-family: Georgia, serif; color: #0B1D51; padding: 32px; white-space: pre-wrap; line-height: 1.5; }
      h1 { color: #0B1D51; }
    </style></head><body>${text.replace(/</g, "&lt;")}</body></html>`);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 300);
}

function FicheItem({
  fiche,
  saved,
  onToggleSave,
}: {
  fiche: Fiche;
  saved: boolean;
  onToggleSave: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li className="rounded-lg border border-or/20 bg-bleu-roi-dark/50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
      >
        <span className="text-sm font-medium text-[#f5f0dd]">{fiche.title}</span>
        <span className="shrink-0 text-or">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="space-y-3 border-t border-or/15 px-3 pb-3 pt-2 text-sm text-[#cfd6f0]">
          <p className="text-xs italic text-[#a9b3d9]">{fiche.summary}</p>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-or">
              Textes de loi
            </p>
            <ul className="space-y-0.5 text-xs">
              {fiche.articles.map((a, i) => (
                <li key={i}>
                  {a.code}, {a.article}
                  {a.note ? ` — ${a.note}` : ""}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-or">
              Détails
            </p>
            <p className="whitespace-pre-line text-xs leading-relaxed">{fiche.development}</p>
          </div>

          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-or">
              Recours pratiques
            </p>
            <p className="whitespace-pre-line text-xs leading-relaxed">{fiche.recours}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => downloadTextFile(fichesFileName(fiche), buildFicheText(fiche))}
              className="rounded-lg border border-or/40 px-3 py-1.5 text-xs text-or hover:bg-or/10"
            >
              ⬇ Télécharger cette fiche
            </button>
            <button
              type="button"
              onClick={() => printFiche(fiche)}
              className="rounded-lg border border-or/40 px-3 py-1.5 text-xs text-or hover:bg-or/10"
            >
              🖨 Imprimer / Enregistrer en PDF
            </button>
            <button
              type="button"
              onClick={() => onToggleSave(fiche.id)}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                saved
                  ? "bg-vert text-white hover:bg-vert-dark"
                  : "border border-or/40 text-or hover:bg-or/10"
              }`}
            >
              {saved ? "★ Enregistrée" : "☆ Enregistrer"}
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default function FichesAutomobile() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [onlySaved, setOnlySaved] = useState(false);

  useEffect(() => {
    setSavedIds(getSavedFicheIds());
  }, []);

  function handleToggleSave(id: string) {
    setSavedIds(toggleSavedFiche(id));
  }

  const visibleFiches = onlySaved
    ? FICHES_AUTOMOBILE.filter((f) => savedIds.includes(f.id))
    : FICHES_AUTOMOBILE;

  return (
    <section className="mt-2 rounded-xl border border-or/25 bg-bleu-roi-dark/40 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-sm font-semibold text-or">
          Fiches pratiques — Droit automobile ({FICHES_AUTOMOBILE.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setOnlySaved((v) => !v)}
            className={`rounded-full px-3 py-1 text-[11px] ${
              onlySaved
                ? "bg-vert text-white"
                : "border border-or/30 text-[#cfd6f0] hover:text-or"
            }`}
          >
            {onlySaved ? "★ Mes fiches enregistrées" : "☆ Voir mes fiches enregistrées"}
          </button>
          <button
            type="button"
            onClick={() =>
              downloadTextFile(DOSSIER_FILE_NAME, buildDossierText(FICHES_AUTOMOBILE))
            }
            className="rounded-full border border-or/40 px-3 py-1 text-[11px] text-or hover:bg-or/10"
          >
            ⬇ Télécharger le dossier complet ({FICHES_AUTOMOBILE.length} fiches)
          </button>
        </div>
      </div>

      {visibleFiches.length === 0 ? (
        <p className="text-xs italic text-[#a9b3d9]">
          Aucune fiche enregistrée pour le moment. Ouvrez une fiche et cliquez sur « Enregistrer ».
        </p>
      ) : (
        <ul className="space-y-2">
          {visibleFiches.map((f) => (
            <FicheItem
              key={f.id}
              fiche={f}
              saved={savedIds.includes(f.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
