"use client";

import { useState } from "react";
import { Check, Link2, Send } from "lucide-react";
import { FacebookIcon } from "./ui/Icon";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return (
    <div className="share" aria-label="শেয়ার করুন">
      <span style={{ fontWeight: 600, marginRight: 4 }}>শেয়ার:</span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer" aria-label="ফেসবুকে শেয়ার করুন"><FacebookIcon /></a>
      <a href={`https://wa.me/?text=${t}%20${u}`} target="_blank" rel="noopener noreferrer" aria-label="হোয়াটসঅ্যাপে শেয়ার করুন"><Send aria-hidden /></a>
      <button
        type="button"
        aria-label="লিংক কপি করুন"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked — ignore */
          }
        }}
      >
        {copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
      </button>
      <span aria-live="polite" className="sr-only">{copied ? "লিংক কপি হয়েছে" : ""}</span>
    </div>
  );
}
