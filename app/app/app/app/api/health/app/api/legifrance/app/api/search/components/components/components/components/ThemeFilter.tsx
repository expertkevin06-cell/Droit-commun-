"use client";

import { THEMES, SOUS_THEMES_AUTOMOBILE, type ThemeKey } from "@/lib/themes";

type Props = {
  theme: ThemeKey;
  sousThemeId: string;
  onThemeChange: (theme: ThemeKey) => void;
  onSousThemeChange: (id: string) => void;
};

export default function ThemeFilter({
  theme,
  sousThemeId,
  onThemeChange,
  onSousThemeChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div
        role="tablist"
        aria-label="Choix du thème de recherche"
        className="flex gap-2 rounded-xl bg-bleu-roi-dark/50 p-1 ring-1 ring-or/20"
      >
        {THEMES.map((t) => {
          const active = t.key === theme;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onThemeChange(t.key)}
              title={t.description}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium tracking-wide transition ${
                active
                  ? "bg-or text-bleu-roi-dark shadow-gold"
                  : "text-[#cfd6f0] hover:bg-or/10 hover:text-or"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {theme === "droit-automobile" && (
        <label className="flex flex-col gap-1 text-xs text-[#a9b3d9]">
          Type de problème rencontré (réparateur / expert automobile)
          <select
            value={sousThemeId}
            onChange={(e) => onSousThemeChange(e.target.value)}
            className="rounded-lg border border-or/30 bg-bleu-roi-dark px-3 py-2 text-sm text-[#f5f0dd] focus:outline-none focus:ring-2 focus:ring-or/50"
          >
            <option value="">— Sélectionner un problème —</option>
            {SOUS_THEMES_AUTOMOBILE.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
