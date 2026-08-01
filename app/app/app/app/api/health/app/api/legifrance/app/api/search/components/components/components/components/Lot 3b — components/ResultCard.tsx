import type { SearchRecord } from "@/lib/offline-store";

function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-or/25 bg-bleu-roi-dark/60 p-4 shadow-gold">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-or">{title}</h3>
        {badge && (
          <span className="rounded-full bg-or/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-or">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export default function ResultCard({
  record,
  fromCache,
}: {
  record: SearchRecord;
  fromCache?: boolean;
}) {
  const themeLabel =
    record.theme === "droit-automobile" ? "Droit automobile" : "Droit commun";

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[#a9b3d9]">
        <span className="rounded-full border border-or/40 px-2 py-0.5 text-or">
          {themeLabel}
        </span>
        {record.sousTheme && (
          <span className="rounded-full border border-or/20 px-2 py-0.5">
            {record.sousTheme}
          </span>
        )}
      </div>

      {fromCache && (
        <div className="rounded-lg border border-or/40 bg-or/10 px-3 py-2 text-xs text-or">
          Résultat affiché depuis l'historique local (mode hors ligne).
        </div>
      )}

      <Section title="Synthèse — Gemini">
        {record.gemini.ok ? (
          <p className="whitespace-pre-line text-sm leading-relaxed text-[#eef0fb]">
            {record.gemini.text}
          </p>
        ) : (
          <p className="text-sm italic text-[#a9b3d9]">{record.gemini.error}</p>
        )}
      </Section>

      <Section title="Synthèse — Perplexity" badge="sources web">
        {record.perplexity.ok ? (
          <>
            <p className="whitespace-pre-line text-sm leading-relaxed text-[#eef0fb]">
              {record.perplexity.text}
            </p>
            {record.perplexity.citations && record.perplexity.citations.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-or/15 pt-3 text-xs text-[#a9b3d9]">
                {record.perplexity.citations.map((c, i) => (
                  <li key={i} className="truncate">
                    <a href={c} target="_blank" rel="noreferrer" className="hover:text-or">
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="text-sm italic text-[#a9b3d9]">{record.perplexity.error}</p>
        )}
      </Section>

      <Section title="Textes de loi — Légifrance" badge="source officielle">
        {record.legifrance.articles.length > 0 ? (
          <ul className="space-y-3">
            {record.legifrance.articles.map((a, i) => (
              <li key={i} className="rounded-lg bg-bleu-roi/60 p-3">
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-or hover:underline"
                >
                  {a.title}
                </a>
                <div className="mt-0.5 text-[11px] uppercase tracking-wide text-[#a9b3d9]">
                  {a.code}
                </div>
                {a.excerpt && (
                  <p className="mt-1 text-xs text-[#cfd6f0]">{a.excerpt}…</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-[#cfd6f0]">
            {record.legifrance.error && (
              <p className="mb-2 italic text-[#a9b3d9]">{record.legifrance.error}</p>
            )}
            <a
              href={record.legifrance.fallbackUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg border border-or/40 px-3 py-2 text-or hover:bg-or/10"
            >
              Rechercher directement sur Légifrance →
            </a>
          </div>
        )}
      </Section>

      <Section title="Aller plus loin — Dalloz" badge="version gratuite">
        <p className="mb-2 text-xs text-[#a9b3d9]">
          Le contenu Dalloz étant protégé, nous ne pouvons pas le reproduire ici — voici un
          accès direct à leur recherche gratuite.
        </p>
        <a
          href={record.legifrance.daloszUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block rounded-lg border border-or/40 px-3 py-2 text-sm text-or hover:bg-or/10"
        >
          Rechercher sur Dalloz.fr →
        </a>
      </Section>
    </div>
  );
}
