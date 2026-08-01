"use client";

import { useEffect, useState } from "react";

type ConnState = {
  online: boolean;
  type: string; // "wifi" | "4g" | "5g" | "3g" | "2g" | "inconnue"
};

function readConnection(): ConnState {
  if (typeof navigator === "undefined") {
    return { online: true, type: "inconnue" };
  }
  const online = navigator.onLine;
  // L'API Network Information n'est pas standard partout (pas de support Safari/Firefox complet).
  // @ts-expect-error - propriété non standard mais largement disponible sur Chrome/Android
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  let type = "inconnue";
  if (conn) {
    if (conn.type === "wifi") type = "wifi";
    else if (conn.effectiveType) {
      // effectiveType renvoie 4g/3g/2g/slow-2g ; on affine le libellé "5g" si downlink élevé
      if (conn.effectiveType === "4g" && conn.downlink && conn.downlink > 30) {
        type = "5g";
      } else {
        type = conn.effectiveType;
      }
    }
  }
  return { online, type };
}

export default function ConnectionBadge() {
  const [state, setState] = useState<ConnState>({ online: true, type: "inconnue" });

  useEffect(() => {
    setState(readConnection());

    const update = () => setState(readConnection());
    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    // @ts-expect-error - propriété non standard
    const conn = navigator.connection;
    conn?.addEventListener?.("change", update);

    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
      conn?.removeEventListener?.("change", update);
    };
  }, []);

  const label = state.online
    ? state.type === "inconnue"
      ? "En ligne"
      : state.type.toUpperCase()
    : "Hors ligne";

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${
        state.online
          ? "border-vert/50 text-vert bg-vert/10"
          : "border-or/50 text-or bg-or/10"
      }`}
      title="Statut de connexion"
    >
      <span
        className={`h-2 w-2 rounded-full ${
          state.online ? "bg-vert animate-pulse" : "bg-or"
        }`}
      />
      {label}
    </div>
  );
}
