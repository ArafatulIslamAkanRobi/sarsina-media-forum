"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  FilePlus2,
  FileText,
  Hourglass,
  Images,
  Info,
  LayoutDashboard,
  Newspaper,
  PenLine,
  Settings,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { can, roles, type Action, type Module, type RoleId } from "@/lib/rbac";

type Panel = {
  id: string;
  label: string;
  Icon: typeof LayoutDashboard;
  /** shown only if the role has this permission */
  needs?: [Module, Action];
};

const panels: Panel[] = [
  { id: "overview", label: "ওভারভিউ", Icon: LayoutDashboard },
  { id: "profile", label: "আমার প্রোফাইল", Icon: UserRound },
  { id: "my-news", label: "আমার সংবাদ", Icon: Newspaper, needs: ["news", "create"] },
  { id: "my-articles", label: "আমার প্রবন্ধ", Icon: FileText, needs: ["articles", "create"] },
  { id: "submit-news", label: "নতুন সংবাদ জমা", Icon: FilePlus2, needs: ["news", "create"] },
  { id: "submit-article", label: "নতুন প্রবন্ধ জমা", Icon: PenLine, needs: ["articles", "create"] },
  { id: "pending", label: "অনুমোদনের অপেক্ষায়", Icon: Hourglass, needs: ["news", "approve"] },
  { id: "gallery", label: "গ্যালারি", Icon: Images, needs: ["gallery", "view"] },
  { id: "events", label: "মাহফিল ও ইভেন্ট", Icon: CalendarDays, needs: ["events", "view"] },
  { id: "donations", label: "অনুদান প্রকল্প", Icon: Wallet, needs: ["donations", "view"] },
  { id: "team", label: "সদস্য ব্যবস্থাপনা", Icon: Users, needs: ["team", "edit"] },
  { id: "notifications", label: "নোটিফিকেশন", Icon: Bell },
  { id: "settings", label: "অ্যাকাউন্ট সেটিংস", Icon: Settings },
];

function visiblePanels(role: RoleId) {
  return panels.filter((p) => {
    if (!p.needs) return true;
    const [mod, act] = p.needs;
    // Pending queue is visible to anyone who can approve news OR articles
    if (p.id === "pending") return can(role, "news", "approve") || can(role, "articles", "approve");
    return can(role, mod, act);
  });
}

export function Dashboard() {
  const [role, setRole] = useState<RoleId>("news_reporter");
  const [active, setActive] = useState("overview");
  const list = useMemo(() => visiblePanels(role), [role]);
  const current = list.find((p) => p.id === active) ?? list[0];

  return (
    <div className="dash">
      <aside className="dash__side" aria-label="ড্যাশবোর্ড মেনু">
        <ul className="dash__nav">
          {list.map((p) => (
            <li key={p.id}>
              <button type="button" aria-current={current.id === p.id ? "page" : undefined} onClick={() => setActive(p.id)}>
                <p.Icon aria-hidden />{p.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="dash__main">
        <p className="alert alert--warn" style={{ marginBottom: 20 }}>
          <Info aria-hidden />
          <span>
            <b>ডিজাইন প্রিভিউ:</b> লগইন ও ডাটাবেজ এখনো সংযুক্ত হয়নি। নিচে রোল পরিবর্তন করে দেখুন প্রতিটি রোল কোন কোন অংশ দেখতে পাবে। প্রকৃত অনুমতি ব্যাকএন্ডে একই নিয়মে যাচাই হবে।
          </span>
        </p>

        <div className="field" style={{ maxWidth: 360, marginBottom: 24 }}>
          <label htmlFor="role">প্রিভিউ রোল</label>
          <select id="role" className="select" value={role} onChange={(e) => { setRole(e.target.value as RoleId); setActive("overview"); }}>
            {(Object.keys(roles) as RoleId[]).map((r) => <option key={r} value={r}>{roles[r].label} — {roles[r].description}</option>)}
          </select>
        </div>

        <h1 style={{ fontSize: 24, marginBottom: 16 }}>{current.label}</h1>
        <PanelBody id={current.id} role={role} />
      </div>
    </div>
  );
}

function PanelBody({ id, role }: { id: string; role: RoleId }) {
  if (id === "overview") {
    const stats = [
      { label: "প্রকাশিত সংবাদ", show: can(role, "news", "create") },
      { label: "প্রকাশিত প্রবন্ধ", show: can(role, "articles", "create") },
      { label: "অনুমোদনের অপেক্ষায়", show: can(role, "news", "approve") || can(role, "articles", "approve") },
      { label: "নতুন নোটিফিকেশন", show: true },
    ].filter((s) => s.show);
    return (
      <div style={{ display: "grid", gap: 20 }}>
        <div className="grid-4">
          {stats.map((s) => (
            <div key={s.label} className="card stat">
              <span className="stat__label">{s.label}</span>
              <span className="stat__value" aria-label="তথ্য নেই">—</span>
            </div>
          ))}
        </div>
        <div className="card card__body">
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>এই রোলের অনুমতিসমূহ</h2>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>মডিউল</th><th>অনুমতি</th></tr></thead>
              <tbody>
                {Object.entries(roles[role].grants).map(([mod, acts]) => (
                  <tr key={mod}><td className="en">{mod}</td><td className="en">{acts!.join(", ")}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (id === "submit-news" || id === "submit-article") {
    const isNews = id === "submit-news";
    return (
      <form className="card card__body" style={{ display: "grid", gap: 16 }} onSubmit={(e) => e.preventDefault()}>
        <div className="field"><label htmlFor="t">শিরোনাম</label><input id="t" className="input" /></div>
        <div className="field"><label htmlFor="c">ক্যাটাগরি</label><input id="c" className="input" /></div>
        <div className="field"><label htmlFor="img">প্রচ্ছদ ছবি</label><input id="img" type="file" accept="image/*" className="input" /></div>
        <div className="field"><label htmlFor="b">{isNews ? "সংবাদের বিবরণ" : "প্রবন্ধের মূল লেখা"}</label><textarea id="b" className="textarea" rows={8} /></div>
        <p className="hint">জমা দেওয়ার পর {isNews ? "সংবাদ সম্পাদক" : "ব্লগ সম্পাদক"} পর্যালোচনা করে প্রকাশ করবেন।</p>
        <button type="submit" className="btn btn-primary" disabled title="ব্যাকএন্ড সংযুক্ত হলে চালু হবে">পর্যালোচনার জন্য জমা দিন (শীঘ্রই)</button>
      </form>
    );
  }

  return (
    <div className="empty-state">
      <Info aria-hidden />
      <p>এই অংশের তথ্য ব্যাকএন্ড API সংযুক্ত হলে এখানে দেখা যাবে।</p>
    </div>
  );
}
