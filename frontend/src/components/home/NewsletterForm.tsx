"use client";

import { useState } from "react";
import { Info } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates input on the client. There is no subscription backend yet, so on
 * submit we tell the visitor honestly instead of pretending it worked.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email.trim())) {
          setError("সঠিক ইমেইল ঠিকানা লিখুন");
          return;
        }
        setError(null);
        setDone(true);
      }}
    >
      <div className="field">
        <label htmlFor="nl-email" className="sr-only">ইমেইল ঠিকানা</label>
        <input
          id="nl-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className="input"
          placeholder="আপনার ইমেইল ঠিকানা"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setDone(false); }}
          aria-invalid={!!error}
          aria-describedby={error ? "nl-err" : undefined}
        />
      </div>
      <button type="submit" className="btn btn-gold">সাবস্ক্রাইব করুন</button>
      <div aria-live="polite" style={{ gridColumn: "1 / -1" }}>
        {error && <p id="nl-err" className="error" style={{ color: "#ffd2cc", fontSize: 14 }}>{error}</p>}
        {done && (
          <p className="alert alert--warn" style={{ marginTop: 4 }}>
            <Info aria-hidden />
            ধন্যবাদ! নিউজলেটার সেবা এখনো চালু হয়নি — চালু হলে এই ফর্ম থেকেই সাবস্ক্রাইব করা যাবে।
          </p>
        )}
      </div>
    </form>
  );
}
