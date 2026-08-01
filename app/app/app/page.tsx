"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import ConnectionBadge from "@/components/ConnectionBadge";
import ThemeFilter from "@/components/ThemeFilter";
import FichesAutomobile from "@/components/FichesAutomobile";
import { getSousTheme, type ThemeKey } from "@/lib/themes";
import {
  findCachedRecord,
  getSearchHistory,
  saveSearchRecord,
  type SearchRecord,
} from "@/lib/offline-store";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<SearchRecord | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<SearchRecord[]>([]);
  const [theme, setTheme] = useState<ThemeKey>("droit-commun");
  const [sousThemeId, setSousThemeId] = useState("");
  const [prefill, setPrefill] = useState("");

  useEffect(() => {
    setHistory(getSearchHistory());
  }, []);

  function handleThemeChange(next: ThemeKey) {
    setTheme(next);
    setSousThemeId("");
    if (next === "droit-commun") setPrefill("");
  }

  function handleSousThemeChange(id: string) {
    setSousThemeId(id);
    const st = getSousTheme(id);
    if (st?.questionTemplate) setPrefill(st.questionTemplate);
  }

  async function handleSearch(question: string) {
    setLoading(true);
    setErrorMsg(null);
    setFromCache(false);

    const sousTheme = sousThemeId ? getSousTheme(sousThemeId)?.label : undefined;

    // Hors ligne : on tente directement le cache local.
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const cached = findCachedRecord(question, theme);
      if (cached) {
        setRecord(cached);
        setFromCache(true);
      } else {
        setErrorMsg(
          "Vous êtes hors ligne et cette question n'a pas encore été recherchée. Reconnectez-vous pour l'interroger."
        );
      }
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({ q: question, theme });
      if (sousTheme) params.set("sousTheme", sousTheme);
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();

      if (data.offline) {
        const cached = findCachedRecord(question, theme);
        if (cached) {
          setRecord(cached);
          setFromCache(true);
        } else {
          setErrorMsg(data.error || "Hors ligne et aucune donnée en cache pour cette question.");
        }
        return;
      }

      if (data.error) {
        setErrorMsg(data.error);
        return;
      }

      const newRecord: SearchRecord = data;
      setRecord(newRecord);
      saveSearchRecord(newRecord);
      setHistory(getSearchHistory());
    } catch (err) {
      const cached = findCachedRecord(question, theme);
      if (cached) {
        setRecord(cached);
        setFromCache(true);
      } else {
        setErrorMsg("Erreur réseau. Vérifiez votre connexion 4G/5G/Wi-Fi et réessayez.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-hero-gradient">
      {/* Fond décoratif : balance de la justice dorée */}
      <div
        className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: "url(/scales-bg.svg)", backgroundSize: "min(900px, 130%)" }}
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-or">
              ⚖ Droit Général
            </p>
            <p className="text-xs text-[#a9b3d9]">by Kevin</p>
          </div>
          <ConnectionBadge />
        </header>

        <section className="mt-2">
          <h1 className="mb-1 font-display text-xl font-semibold text-[#f5f0dd]">
            Posez votre question de droit
          </h1>
          <p className="mb-4 text-sm text-[#a9b3d9]">
            Réponses détaillées croisant Gemini et Perplexity, avec les articles de loi en
            référence (Légifrance, Code civil, Code pénal, Code de la consommation).
          </p>

          <div className="mb-3">
            <ThemeFilter
              theme={theme}
              sousThemeId={sousThemeId}
              onThemeChange={handleThemeChange}
              onSousThemeChange={handleSousThemeChange}
            />
          </div>

          <SearchBar onSearch={handleSearch} loading={loading} prefill={prefill} />
        </section>

        {theme === "droit-automobile" && <FichesAutomobile />}

        {errorMsg && (
          <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMsg}
          </div>
        )}

        {record && (
          <section className="animate-[fadeIn_0.2s_ease-in]">
            <div className="gold-divider mb-4" />
            <ResultCard record={record} fromCache={fromCache} />
          </section>
        )}

        {!record && history.length > 0 && (
          <section className="mt-2">
            <h2 className="mb-2 font-display text-sm font-semibold text-or">
              Recherches récentes (disponibles hors ligne)
            </h2>
            <ul className="flex flex-wrap gap-2">
              {history.slice(0, 8).map((h, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      setRecord(h);
                      setFromCache(true);
                    }}
                    className="rounded-full border border-or/30 px-3 py-1 text-xs text-[#cfd6f0] hover:bg-or/10 hover:text-or"
                  >
                    {h.question}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-auto pt-8 text-center text-[10px] leading-relaxed text-[#7c86b3]">
          Les réponses générées par IA sont fournies à titre informatif et ne remplacent pas
          l'avis d'un professionnel du droit. Vérifiez toujours le texte en vigueur sur
          Légifrance.
        </footer>
      </div>
    </main>
  );
}
