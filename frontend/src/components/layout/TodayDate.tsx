"use client";
import { useEffect, useState } from "react";
import { formatDateBn } from "@/lib/format";

/** Renders today's date on the client so a statically built page never shows a stale date. */
export function TodayDate() {
  const [text, setText] = useState("");
  useEffect(() => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setText(formatDateBn(iso, true));
  }, []);
  return <span suppressHydrationWarning>{text || "—"}</span>;
}
