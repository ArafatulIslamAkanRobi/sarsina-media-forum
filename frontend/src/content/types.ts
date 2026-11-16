/**
 * Content types for the public site.
 *
 * These mirror the models in /backend/prisma/schema.prisma so the static
 * content files in this folder can later be replaced 1:1 by API responses
 * from the admin panel. Optional fields are `null` when the real, verified
 * information is not available yet — components render a tasteful
 * "coming soon" state instead of inventing numbers or names.
 */

export type ImageRef = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
} | null;

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date string */
  publishedAt: string;
  updatedAt?: string;
  reporter: string;
  coverImage: ImageRef;
  body: string[];
  featured?: boolean;
  /** true = example content shipped with the prototype; replace via admin */
  sample?: boolean;
};

export type Mahfil = {
  slug: string;
  title: string;
  kind: "annual" | "monthly" | "weekly" | "special";
  /** Bengali/Hijri month label shown on annual cards */
  monthLabel?: string;
  /** ISO date — null for annual mahfils whose date is announced later */
  startDate: string | null;
  time?: string | null;
  venue: string;
  description: string;
  bannerImage: ImageRef;
  theme?: "autumn" | "winter" | "spring" | "night";
  sample?: boolean;
};

export type DonationProject = {
  slug: string;
  title: string;
  shortDescription: string;
  introduction: string;
  purpose: string;
  need: string;
  status: "active" | "completed" | "paused";
  statusNote: string | null;
  image: ImageRef;
  gallery: ImageRef[];
  videos: { title: string; url: string }[];
  /** Only set when an approved, published target exists */
  targetAmount: number | null;
  /** Only set when verified collection data exists */
  collectedAmount: number | null;
  updates: { date: string; text: string }[];
  fundId: string;
};

export type DonationFund = { id: string; label: string };

export type PaymentMethod = {
  id: "bkash" | "nagad" | "bank" | "card";
  label: string;
  /** Only methods that are really integrated & approved are shown in the form */
  enabled: boolean;
};

export type Institution = {
  slug: string;
  name: string;
  kind: string;
  description: string;
  image: ImageRef;
};

export type Organization = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  logo: ImageRef;
};

export type PublicationCategory = {
  slug: string;
  label: string;
  description: string;
  tone: "maroon" | "green" | "gold" | "cream";
};

export type Author = {
  slug: string;
  name: string;
  photo: ImageRef;
  designation: string;
  bio: string;
  /** Only verified qualifications — leave null otherwise */
  qualifications: string | null;
};

export type ArticleSection = { id: string; heading: string; paragraphs: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  authorSlug: string;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMin: number;
  coverImage: ImageRef;
  sections: ArticleSection[];
  featured?: boolean;
  sample?: boolean;
};

export type TeamDepartment =
  | "leadership"
  | "editorial"
  | "news"
  | "video"
  | "design"
  | "tech"
  | "other";

export type TeamMember = {
  /** null until the real member is added from the admin panel */
  slug: string | null;
  name: string | null;
  designation: string;
  department: TeamDepartment;
  photo: ImageRef;
  bio: string | null;
  responsibilities: string[];
  social: { label: string; url: string }[];
  showOnHome: boolean;
  order: number;
};
