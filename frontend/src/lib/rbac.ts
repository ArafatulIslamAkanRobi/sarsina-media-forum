/**
 * Role-Based Access Control definitions for the member portal.
 *
 * This is the single source of truth for which role can do what. The UI uses
 * it to show/hide dashboard sections; the backend MUST enforce the same map on
 * every API route — hiding a button is not security.
 */

export type Module =
  | "site"
  | "news"
  | "articles"
  | "gallery"
  | "events"
  | "donations"
  | "team"
  | "profile";

export type Action = "view" | "create" | "edit" | "delete" | "publish" | "approve" | "export";

export type RoleId =
  | "super_admin"
  | "admin"
  | "news_editor"
  | "news_reporter"
  | "blog_writer"
  | "blog_editor"
  | "gallery_manager"
  | "event_manager"
  | "donation_manager"
  | "member";

type Grants = Partial<Record<Module, Action[]>>;

const ALL: Action[] = ["view", "create", "edit", "delete", "publish", "approve", "export"];

export const roles: Record<RoleId, { label: string; description: string; grants: Grants }> = {
  super_admin: {
    label: "সুপার অ্যাডমিন",
    description: "সম্পূর্ণ ওয়েবসাইট নিয়ন্ত্রণ",
    grants: { site: ALL, news: ALL, articles: ALL, gallery: ALL, events: ALL, donations: ALL, team: ALL, profile: ALL },
  },
  admin: {
    label: "অ্যাডমিন",
    description: "অনুমোদিত ওয়েবসাইট ব্যবস্থাপনা",
    grants: {
      site: ["view", "edit"],
      news: ["view", "create", "edit", "publish", "approve"],
      articles: ["view", "create", "edit", "publish", "approve"],
      gallery: ["view", "create", "edit"],
      events: ["view", "create", "edit", "publish"],
      donations: ["view"],
      team: ["view", "edit"],
      profile: ["view", "edit"],
    },
  },
  news_editor: {
    label: "সংবাদ সম্পাদক",
    description: "সংবাদ সম্পাদনা ও প্রকাশ",
    grants: { news: ["view", "create", "edit", "publish", "approve"], profile: ["view", "edit"] },
  },
  news_reporter: {
    label: "সংবাদ প্রতিনিধি",
    description: "সংবাদ জমা দেওয়া",
    grants: { news: ["view", "create"], profile: ["view", "edit"] },
  },
  blog_writer: {
    label: "ব্লগ লেখক",
    description: "প্রবন্ধ লেখা ও জমা দেওয়া",
    grants: { articles: ["view", "create"], profile: ["view", "edit"] },
  },
  blog_editor: {
    label: "ব্লগ সম্পাদক",
    description: "প্রবন্ধ সম্পাদনা ও প্রকাশ",
    grants: { articles: ["view", "create", "edit", "publish", "approve"], profile: ["view", "edit"] },
  },
  gallery_manager: {
    label: "গ্যালারি ম্যানেজার",
    description: "ছবি ও ভিডিও ব্যবস্থাপনা",
    grants: { gallery: ["view", "create", "edit", "delete"], profile: ["view", "edit"] },
  },
  event_manager: {
    label: "ইভেন্ট ম্যানেজার",
    description: "মাহফিল ও ইভেন্ট ব্যবস্থাপনা",
    grants: { events: ["view", "create", "edit", "publish"], profile: ["view", "edit"] },
  },
  donation_manager: {
    label: "ডোনেশন ম্যানেজার",
    description: "অনুদান প্রকল্প ব্যবস্থাপনা",
    grants: { donations: ["view", "create", "edit", "export"], profile: ["view", "edit"] },
  },
  member: {
    label: "সদস্য",
    description: "নিজস্ব প্রোফাইল ও নির্ধারিত কাজ",
    grants: { profile: ["view", "edit"] },
  },
};

export function can(role: RoleId, module: Module, action: Action): boolean {
  return roles[role].grants[module]?.includes(action) ?? false;
}
