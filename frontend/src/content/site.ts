/**
 * Site-wide settings. Every value here is meant to become an admin-editable
 * SiteSetting / Banner row (see backend schema). Keep them in one place so the
 * swap to the API is a single change.
 */

export const site = {
  name: "ছারছীনা দরবার শরীফ",
  nameEn: "Charchhina Darbar Sharif",
  mediaName: "ছারছীনা মিডিয়া ফোরাম",
  mediaNameEn: "Sarsina Media Forum",
  tagline: "ছারছীনা দরবার শরীফের কেন্দ্রীয় অনলাইন প্রচার মাধ্যম",
  description:
    "ছারছীনা দরবার শরীফের পরিচিতি, শিক্ষা কার্যক্রম, সংবাদ, মাহফিল, প্রকাশনী, ইসলামিক প্রবন্ধ, দান কার্যক্রম ও সংগঠনসমূহের অফিসিয়াল ডিজিটাল প্ল্যাটফর্ম।",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarsinamediaforum.com",
  logo: "/brand/sarsina-media-forum-logo.webp",
  // TODO(admin): verify the address / contact details before launch
  address: "ছারছীনা দরবার শরীফ, নেছারাবাদ, পিরোজপুর",
  phone: null as string | null,
  email: null as string | null,
  social: [] as { id: "facebook" | "youtube" | "telegram" | "whatsapp"; url: string }[],
  /**
   * While true, a slim notice tells visitors that news, articles and dates
   * are example content. Turn off once real content is entered.
   */
  previewMode: true,
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "হোম", href: "/" },
  {
    label: "আমাদের সম্পর্কে",
    href: "/about",
    children: [
      { label: "দরবার শরীফের পরিচিতি", href: "/about" },
      { label: "লক্ষ্য ও উদ্দেশ্য", href: "/about#mission" },
      { label: "ছারছীনা মিডিয়া ফোরাম", href: "/media-forum" },
    ],
  },
  { label: "সংবাদ", href: "/news" },
  {
    label: "মাহফিল",
    href: "/mahfil",
    children: [
      { label: "আজকের মাহফিল", href: "/mahfil#today" },
      { label: "বাৎসরিক মাহফিলসমূহ", href: "/mahfil#annual" },
    ],
  },
  {
    label: "শিক্ষা",
    href: "/education",
    children: [
      { label: "ছারছীনা দারুস্সুন্নাত কামিল মাদরাসা", href: "/education#darussunnat" },
      { label: "আলিয়া বিভাগ", href: "/education#alia" },
      { label: "বাংলাদেশ দ্বীনিয়া মাদরাসা বোর্ড", href: "/education#board" },
    ],
  },
  {
    label: "সংগঠনসমূহ",
    href: "/organizations",
    children: [
      { label: "বাংলাদেশ জমিয়াতে হিযবুল্লাহ", href: "/organizations#jamiyate" },
      { label: "বাংলাদেশ ছাত্র হিযবুল্লাহ", href: "/organizations#chhatra" },
      { label: "বাংলাদেশ যুব হিযবুল্লাহ", href: "/organizations#jubo" },
      { label: "বাংলাদেশ আইম্মায়ে হিযবুল্লাহ", href: "/organizations#aimmaye" },
    ],
  },
  { label: "প্রকাশনী", href: "/publications" },
  { label: "ব্লগ", href: "/blog" },
  { label: "গ্যালারি", href: "/gallery" },
  { label: "যোগাযোগ", href: "/contact" },
];

export type QuickLink = { label: string; href: string; icon: string };

export const quickAccess: QuickLink[] = [
  { label: "দান করুন", href: "/donate", icon: "heart-handshake" },
  { label: "সংবাদ", href: "/news", icon: "newspaper" },
  { label: "মাহফিল", href: "/mahfil", icon: "calendar" },
  { label: "শিক্ষা", href: "/education", icon: "graduation" },
  { label: "সংগঠনসমূহ", href: "/organizations", icon: "users" },
  { label: "প্রকাশনী", href: "/publications", icon: "book" },
  { label: "মিডিয়া ফোরাম", href: "/media-forum", icon: "video" },
  { label: "যোগাযোগ", href: "/contact", icon: "phone" },
];

export type HeroSlide = {
  id: string;
  eyebrow?: string;
  title: string;
  text: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Real photo / poster. null → designed fallback artwork */
  image: { src: string; alt: string } | null;
  /** Optional drone video for desktop; poster image is used on mobile */
  video?: { src: string; poster?: string } | null;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "intro",
    eyebrow: "স্বাগতম",
    title: "ছারছীনা দরবার শরীফ",
    text: "দ্বীনের খেদমত, শিক্ষা প্রসার ও মানবকল্যাণে নিয়োজিত এক ঐতিহ্যবাহী ইসলামী কেন্দ্র।",
    primary: { label: "আমাদের সম্পর্কে জানুন", href: "/about" },
    secondary: { label: "দান করুন", href: "/donate" },
    image: null,
    video: null,
  },
  {
    id: "education",
    eyebrow: "শিক্ষা",
    title: "কুরআন-সুন্নাহভিত্তিক শিক্ষা",
    text: "দারুস্সুন্নাত কামিল মাদরাসা ও দ্বীনিয়া মাদরাসা বোর্ডের মাধ্যমে আদর্শ আলেম ও নাগরিক তৈরির প্রয়াস।",
    primary: { label: "শিক্ষা কার্যক্রম দেখুন", href: "/education" },
    secondary: { label: "দান করুন", href: "/donate" },
    image: null,
  },
  {
    id: "mahfil",
    eyebrow: "মাহফিল",
    title: "বাৎসরিক মাহফিলসমূহ",
    text: "অগ্রহায়ণ, মাঘ, ফাল্গুন ও মুহররমের মাহফিলের সময়সূচি ও বিস্তারিত তথ্য এক জায়গায়।",
    primary: { label: "মাহফিলের তথ্য দেখুন", href: "/mahfil" },
    secondary: { label: "দান করুন", href: "/donate" },
    image: null,
  },
];

/**
 * Homepage section order & visibility — maps to an admin "Homepage Builder"
 * (show / hide, sort order). The page renders sections in this order.
 */
export type HomeSectionId =
  | "hero"
  | "quickAccess"
  | "todayMahfil"
  | "latestNews"
  | "annualMahfil"
  | "donationBanner"
  | "donationProjects"
  | "education"
  | "organizations"
  | "publications"
  | "articles"
  | "team"
  | "newsletter";

export const homepageSections: { id: HomeSectionId; visible: boolean; order: number }[] = [
  { id: "hero", visible: true, order: 1 },
  { id: "quickAccess", visible: true, order: 2 },
  { id: "todayMahfil", visible: true, order: 3 },
  { id: "latestNews", visible: true, order: 4 },
  { id: "annualMahfil", visible: true, order: 5 },
  { id: "donationBanner", visible: true, order: 6 },
  { id: "donationProjects", visible: true, order: 7 },
  { id: "education", visible: true, order: 8 },
  { id: "organizations", visible: true, order: 9 },
  { id: "publications", visible: true, order: 10 },
  { id: "articles", visible: true, order: 11 },
  { id: "team", visible: true, order: 12 },
  { id: "newsletter", visible: true, order: 13 },
];

export const footerLinks = {
  important: [
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "মাহফিলসমূহ", href: "/mahfil" },
    { label: "দান কার্যক্রম", href: "/donate" },
    { label: "প্রকাশনী", href: "/publications" },
    { label: "ইসলামিক প্রবন্ধ", href: "/blog" },
  ],
  education: [
    { label: "দারুস্সুন্নাত কামিল মাদরাসা", href: "/education#darussunnat" },
    { label: "আলিয়া বিভাগ", href: "/education#alia" },
    { label: "দ্বীনিয়া মাদরাসা বোর্ড", href: "/education#board" },
  ],
  organizations: [
    { label: "জমিয়াতে হিযবুল্লাহ", href: "/organizations#jamiyate" },
    { label: "ছাত্র হিযবুল্লাহ", href: "/organizations#chhatra" },
    { label: "যুব হিযবুল্লাহ", href: "/organizations#jubo" },
    { label: "আইম্মায়ে হিযবুল্লাহ", href: "/organizations#aimmaye" },
  ],
};
