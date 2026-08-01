"use client";

import { FormEvent, useEffect, useState } from "react";

type Props = {
  onSearch: (question: string) => void;
  loading: boolean;
  prefill?: string;
};

export default function SearchBar({ onSearch, loading, prefill }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (prefill) setValue(prefill);
  }, [prefill]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    onSearch(q);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-stretch gap-2 rounded-xl bg-bleu-roi-dark/70 p-2 shadow-gold ring-1 ring-or/30 backdrop-blur"
    >
      <input
        type="text"
        inputMode="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Posez votre question juridique (ex : délai de rétractation d'un achat en ligne)"
        aria-label="Recherche juridique"
        className="min-w-0 flex-1 rounded-lg bg-transparent px-3 py-3 text-sm text-[#f5f0dd] placeholder:text-[#a9b3d9] focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        aria-label="Valider la recherche"
        title="Valider la recherche"
        className="flex w-14 shrink-0 items-center justify-center rounded-lg bg-vert font-display text-xl font-bold text-white shadow-md transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-vert-dark"
      >
        {loading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          "V"
        )}
      </button>
    </form>
  );
}
