"use client";

import { useEffect, useMemo, useState } from "react";
import { Heart, Info, TriangleAlert } from "lucide-react";
import { donationFunds, paymentMethods, presetAmounts } from "@/content/data";
import { formatTaka } from "@/lib/format";

const MOBILE_RE = /^(?:\+?88)?01[3-9]\d{8}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_AMOUNT = 10;

type Errors = Partial<Record<"fund" | "contact" | "amount" | "method", string>>;

/** Converts Bengali digits typed by the user to ASCII before validation. */
const normalizeDigits = (s: string) => s.replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));

export function DonationForm({ defaultFund }: { defaultFund?: string }) {
  const enabledMethods = useMemo(() => paymentMethods.filter((m) => m.enabled), []);
  const [fund, setFund] = useState(defaultFund ?? "");
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [contact, setContact] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(enabledMethods[0]?.id ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<null | { fund: string; amount: number }>(null);

  // Allow deep links like /donate?fund=lillah#quick-donate
  useEffect(() => {
    if (defaultFund) return;
    const q = new URLSearchParams(window.location.search).get("fund");
    if (q && donationFunds.some((f) => f.id === q)) setFund(q);
  }, [defaultFund]);

  const amountNum = Number(normalizeDigits(amount));

  function validate(): Errors {
    const e: Errors = {};
    if (!fund) e.fund = "একটি তহবিল নির্বাচন করুন";
    const c = normalizeDigits(contact.trim()).replace(/[\s-]/g, "");
    if (!c) e.contact = "মোবাইল নম্বর অথবা ইমেইল লিখুন";
    else if (!MOBILE_RE.test(c) && !EMAIL_RE.test(c)) e.contact = "সঠিক মোবাইল নম্বর (01XXXXXXXXX) অথবা ইমেইল লিখুন";
    if (!amount) e.amount = "অনুদানের পরিমাণ লিখুন";
    else if (!Number.isFinite(amountNum) || amountNum < MIN_AMOUNT) e.amount = `সর্বনিম্ন ${formatTaka(MIN_AMOUNT)}`;
    if (enabledMethods.length > 0 && !method) e.method = "পেমেন্ট পদ্ধতি নির্বাচন করুন";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.getElementById(`df-${first}`)?.focus();
      return;
    }
    // No payment gateway is connected yet — never fake a transaction.
    // When integrated: POST to /api/donations → redirect to gateway → verify
    // server-side → show receipt with the gateway's transaction ID.
    setSubmitted({ fund, amount: amountNum });
  }

  const fundLabel = (id: string) => donationFunds.find((f) => f.id === id)?.label ?? id;

  return (
    <form className="donate-form" noValidate onSubmit={onSubmit} aria-labelledby="quick-donate-title">
      <div className="field">
        <label htmlFor="df-fund">তহবিল নির্বাচন করুন <span aria-hidden>*</span></label>
        <select id="df-fund" className="select" value={fund} onChange={(e) => setFund(e.target.value)} aria-invalid={!!errors.fund} aria-describedby={errors.fund ? "df-fund-err" : undefined}>
          <option value="">একটি তহবিল নির্বাচন করুন</option>
          {donationFunds.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
        </select>
        {errors.fund && <span id="df-fund-err" className="error">{errors.fund}</span>}
      </div>

      <div className="field">
        <label htmlFor="df-name">দাতার নাম</label>
        <input id="df-name" className="input" autoComplete="name" value={anonymous ? "" : name} disabled={anonymous} onChange={(e) => setName(e.target.value)} placeholder="আপনার নাম (ঐচ্ছিক)" />
        <label className="check" style={{ fontWeight: 500, color: "var(--text-soft)" }}>
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
          নাম প্রকাশে অনিচ্ছুক
        </label>
      </div>

      <div className="field span-2">
        <label htmlFor="df-contact">মোবাইল নম্বর / ইমেইল <span aria-hidden>*</span></label>
        <input id="df-contact" className="input" inputMode="email" autoComplete="tel" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="01XXXXXXXXX অথবা email@example.com" aria-invalid={!!errors.contact} aria-describedby={`df-contact-hint${errors.contact ? " df-contact-err" : ""}`} />
        <span id="df-contact-hint" className="hint">রসিদ ও নিশ্চিতকরণ বার্তা পাঠানোর জন্য প্রয়োজন।</span>
        {errors.contact && <span id="df-contact-err" className="error">{errors.contact}</span>}
      </div>

      <fieldset className="field span-2">
        <legend>অনুদানের পরিমাণ <span aria-hidden>*</span></legend>
        <div className="chips" role="group" aria-label="নির্ধারিত পরিমাণ">
          {presetAmounts.map((a) => (
            <button key={a} type="button" className="chip" aria-pressed={amountNum === a} onClick={() => setAmount(String(a))}>
              {formatTaka(a)}
            </button>
          ))}
        </div>
        <label htmlFor="df-amount" className="sr-only">অন্য পরিমাণ (টাকা)</label>
        <input id="df-amount" className="input" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^0-9০-৯]/g, ""))} placeholder="অথবা অন্য পরিমাণ লিখুন (টাকা)" aria-invalid={!!errors.amount} aria-describedby={errors.amount ? "df-amount-err" : undefined} style={{ marginTop: 4 }} />
        {errors.amount && <span id="df-amount-err" className="error">{errors.amount}</span>}
      </fieldset>

      <fieldset className="field span-2">
        <legend>পেমেন্ট পদ্ধতি</legend>
        {enabledMethods.length > 0 ? (
          <div className="chips" role="radiogroup" aria-label="পেমেন্ট পদ্ধতি">
            {enabledMethods.map((m) => (
              <button key={m.id} id={m.id === enabledMethods[0].id ? "df-method" : undefined} type="button" role="radio" aria-checked={method === m.id} className="chip" onClick={() => setMethod(m.id)}>
                {m.label}
              </button>
            ))}
          </div>
        ) : (
          <p className="alert alert--warn">
            <TriangleAlert aria-hidden />
            <span>অনলাইন পেমেন্ট (বিকাশ, নগদ, কার্ড) এখনো সংযুক্ত হয়নি। আপাতত দরবার শরীফের অফিসে সরাসরি অনুদান গ্রহণ করা হচ্ছে।</span>
          </p>
        )}
        {errors.method && <span className="error">{errors.method}</span>}
      </fieldset>

      <div className="span-2" style={{ display: "grid", gap: 12 }}>
        <button type="submit" className="btn btn-primary btn-block" style={{ minHeight: 52, fontSize: 16 }}>
          <Heart size={18} aria-hidden />
          {amountNum >= MIN_AMOUNT ? `${formatTaka(amountNum)} দান করুন` : "দান করুন"}
        </button>
        <div aria-live="polite">
          {submitted && (
            <div className="alert alert--info">
              <Info aria-hidden />
              <span>
                আপনার তথ্য যাচাই হয়েছে — <b>{fundLabel(submitted.fund)}</b> তহবিলে <b>{formatTaka(submitted.amount)}</b>।{" "}
                {enabledMethods.length === 0
                  ? "তবে অনলাইন পেমেন্ট সংযুক্ত না হওয়ায় কোনো লেনদেন সম্পন্ন হয়নি এবং কোনো অর্থ কাটা হয়নি। পেমেন্ট সেবা চালু হলে এখান থেকেই দান সম্পন্ন করা যাবে।"
                  : "পেমেন্ট পেজে নিয়ে যাওয়া হচ্ছে…"}
              </span>
            </div>
          )}
        </div>
        <p className="hint" style={{ fontSize: 12.5, color: "var(--text-soft)" }}>
          সফল লেনদেনের পর একটি ইউনিক ট্রানজেকশন আইডি ও ডিজিটাল রসিদ ইমেইল/এসএমএসে পাঠানো হবে। ন্যূনতম অনুদান {formatTaka(MIN_AMOUNT)}।
        </p>
      </div>
    </form>
  );
}
