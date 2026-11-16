"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Info, LogIn } from "lucide-react";
import { site } from "@/content/site";

export function LoginForm() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ id?: string; password?: string }>({});
  const [notice, setNotice] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!id.trim()) next.id = "সদস্য আইডি অথবা ইমেইল লিখুন";
    if (password.length < 8) next.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    setErrors(next);
    if (Object.keys(next).length) return;
    // Backend auth (JWT/Sanctum) is not connected yet. Never fake a session.
    setNotice("লগইন সার্ভার এখনো সংযুক্ত হয়নি। ব্যাকএন্ড চালু হলে এই ফর্ম থেকেই লগইন করা যাবে।");
  }

  return (
    <div className="card auth-card">
      <Image src={site.logo} alt={site.mediaName} width={152} height={152} className="auth-card__logo" />
      <h1 style={{ textAlign: "center", fontSize: 24 }}>সদস্য লগইন</h1>
      <p style={{ textAlign: "center", color: "var(--text-soft)", fontSize: 15, marginTop: 4 }}>
        শুধুমাত্র {site.mediaName}-এর অনুমোদিত সদস্যদের জন্য
      </p>

      <form noValidate onSubmit={onSubmit} style={{ display: "grid", gap: 16, marginTop: 24 }}>
        <div className="field">
          <label htmlFor="lg-id">সদস্য আইডি / ইমেইল</label>
          <input id="lg-id" className="input" autoComplete="username" value={id} onChange={(e) => setId(e.target.value)} aria-invalid={!!errors.id} aria-describedby={errors.id ? "lg-id-err" : undefined} />
          {errors.id && <span id="lg-id-err" className="error">{errors.id}</span>}
        </div>
        <div className="field">
          <label htmlFor="lg-pw">পাসওয়ার্ড</label>
          <div className="input-group">
            <input id="lg-pw" className="input" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={!!errors.password} aria-describedby={errors.password ? "lg-pw-err" : undefined} />
            <button type="button" className="input-group__btn" onClick={() => setShow((v) => !v)} aria-label={show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"} aria-pressed={show}>
              {show ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
            </button>
          </div>
          {errors.password && <span id="lg-pw-err" className="error">{errors.password}</span>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <label className="check"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />মনে রাখুন</label>
          <button type="button" className="read-more" style={{ background: "none", border: 0, cursor: "pointer", minHeight: 44 }} onClick={() => setNotice("পাসওয়ার্ড পুনরুদ্ধারের জন্য অ্যাডমিনের সাথে যোগাযোগ করুন। স্বয়ংক্রিয় রিসেট ব্যবস্থা ব্যাকএন্ড চালু হলে যুক্ত হবে।")}>
            পাসওয়ার্ড ভুলে গেছেন?
          </button>
        </div>
        <button type="submit" className="btn btn-primary btn-block"><LogIn size={18} aria-hidden />লগইন</button>
        <div aria-live="polite">{notice && <p className="alert alert--warn"><Info aria-hidden /><span>{notice}</span></p>}</div>
      </form>

      <p style={{ fontSize: 14, color: "var(--text-soft)", textAlign: "center", marginTop: 16 }}>
        নতুন সদস্য? অ্যাডমিনের অনুমোদনের মাধ্যমে নিবন্ধন হয়। মিডিয়া ফোরামের দায়িত্বশীলের সাথে যোগাযোগ করুন।
      </p>
      <p style={{ textAlign: "center", marginTop: 12 }}>
        <Link href="/member/dashboard" className="read-more">ড্যাশবোর্ডের ডিজাইন প্রিভিউ দেখুন</Link>
      </p>
    </div>
  );
}
