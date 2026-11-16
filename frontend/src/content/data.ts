/**
 * Prototype content. Entries flagged `sample: true` are illustrative only and
 * must be replaced with real, verified content from the admin panel.
 * Numbers that need verification (donation targets, collected amounts) are
 * deliberately `null` — the UI never shows invented figures.
 */
import type {
  Article,
  Author,
  DonationFund,
  DonationProject,
  Institution,
  Mahfil,
  NewsItem,
  Organization,
  PaymentMethod,
  PublicationCategory,
  TeamDepartment,
  TeamMember,
} from "./types";

/* ------------------------------------------------------------------ News */

export const news: NewsItem[] = [
  {
    slug: "monthly-mahfil-held",
    title: "ছারছীনা দরবার শরীফে মাসিক মাহফিল অনুষ্ঠিত",
    excerpt:
      "আধ্যাত্মিক আলোচনা, দরুদ ও মিলাদ মাহফিলের মধ্য দিয়ে দরবার শরীফে মাসিক মাহফিল শান্তিপূর্ণভাবে অনুষ্ঠিত হয়েছে।",
    category: "মাহফিল",
    publishedAt: "2026-11-14",
    reporter: "নিজস্ব প্রতিবেদক",
    coverImage: null,
    featured: true,
    sample: true,
    body: [
      "আধ্যাত্মিক আলোচনা, দরুদ ও মিলাদ মাহফিলের মধ্য দিয়ে ছারছীনা দরবার শরীফে মাসিক মাহফিল অনুষ্ঠিত হয়েছে। দেশের বিভিন্ন অঞ্চল থেকে আগত মুসল্লিরা মাহফিলে অংশগ্রহণ করেন।",
      "মাহফিলে কুরআন তিলাওয়াত, হামদ-নাত এবং দ্বীনি আলোচনা পরিবেশিত হয়। শেষে দেশ ও জাতির কল্যাণ কামনায় বিশেষ মোনাজাত করা হয়।",
    ],
  },
  {
    slug: "minaret-construction-progress",
    title: "মিনার নির্মাণ কাজের অগ্রগতি পরিদর্শন",
    excerpt: "দরবার শরীফের মিনার নির্মাণ প্রকল্পের চলমান কাজ পরিদর্শন করা হয়েছে।",
    category: "উন্নয়ন",
    publishedAt: "2026-11-12",
    reporter: "নিজস্ব প্রতিবেদক",
    coverImage: null,
    sample: true,
    body: [
      "দরবার শরীফের মিনার নির্মাণ প্রকল্পের চলমান কাজ পরিদর্শন করা হয়েছে। পরিদর্শনকালে কাজের মান ও সময়সূচি নিয়ে আলোচনা হয়।",
    ],
  },
  {
    slug: "jamiyate-hizbullah-meeting",
    title: "বাংলাদেশ জমিয়াতে হিযবুল্লাহর কেন্দ্রীয় বৈঠক অনুষ্ঠিত",
    excerpt: "সাংগঠনিক কার্যক্রম পর্যালোচনা ও আগামী কর্মসূচি নিয়ে কেন্দ্রীয় বৈঠক অনুষ্ঠিত হয়েছে।",
    category: "সংগঠন",
    publishedAt: "2026-11-10",
    reporter: "নিজস্ব প্রতিবেদক",
    coverImage: null,
    sample: true,
    body: [
      "সাংগঠনিক কার্যক্রম পর্যালোচনা ও আগামী কর্মসূচি নিয়ে বাংলাদেশ জমিয়াতে হিযবুল্লাহর কেন্দ্রীয় বৈঠক অনুষ্ঠিত হয়েছে।",
    ],
  },
  {
    slug: "madrasa-board-exam-schedule",
    title: "দ্বীনিয়া মাদরাসা বোর্ডের বার্ষিক পরীক্ষার সময়সূচি প্রকাশ",
    excerpt: "বাংলাদেশ দ্বীনিয়া মাদরাসা বোর্ডের অধীন বার্ষিক পরীক্ষার সময়সূচি প্রকাশ করা হয়েছে।",
    category: "শিক্ষা",
    publishedAt: "2026-11-08",
    reporter: "নিজস্ব প্রতিবেদক",
    coverImage: null,
    sample: true,
    body: [
      "বাংলাদেশ দ্বীনিয়া মাদরাসা বোর্ডের অধীন বার্ষিক পরীক্ষার সময়সূচি প্রকাশ করা হয়েছে। বিস্তারিত সময়সূচি সংশ্লিষ্ট মাদরাসায় পাওয়া যাবে।",
    ],
  },
];

/* ---------------------------------------------------------------- Mahfil */

/** Featured / today's event. Set to null when nothing is scheduled. */
export const featuredMahfil: Mahfil | null = {
  slug: "monthly-mahfil",
  title: "মাসিক মাহফিল",
  kind: "monthly",
  startDate: "2026-11-16",
  time: "বাদ আসর",
  venue: "ছারছীনা দরবার শরীফ, নেছারাবাদ, পিরোজপুর",
  description:
    "কুরআন তিলাওয়াত, দ্বীনি আলোচনা, দরুদ ও মিলাদ এবং দেশ ও জাতির কল্যাণ কামনায় বিশেষ মোনাজাত।",
  bannerImage: null,
  sample: true,
};

export const annualMahfils: Mahfil[] = [
  {
    slug: "agrahayan",
    title: "অগ্রহায়ণের মাহফিল",
    kind: "annual",
    monthLabel: "অগ্রহায়ণ মাস",
    startDate: null,
    venue: "ছারছীনা দরবার শরীফ",
    description: "অগ্রহায়ণ মাসে অনুষ্ঠিত বাৎসরিক মাহফিল। তারিখ ঘোষণার পর এখানে প্রকাশ করা হবে।",
    bannerImage: null,
    theme: "autumn",
  },
  {
    slug: "magh",
    title: "মাঘের মাহফিল",
    kind: "annual",
    monthLabel: "মাঘ মাস",
    startDate: null,
    venue: "ছারছীনা দরবার শরীফ",
    description: "মাঘ মাসে অনুষ্ঠিত বাৎসরিক মাহফিল। তারিখ ঘোষণার পর এখানে প্রকাশ করা হবে।",
    bannerImage: null,
    theme: "winter",
  },
  {
    slug: "falgun",
    title: "ফাল্গুনের মাহফিল",
    kind: "annual",
    monthLabel: "ফাল্গুন মাস",
    startDate: null,
    venue: "ছারছীনা দরবার শরীফ",
    description: "ফাল্গুন মাসে অনুষ্ঠিত বাৎসরিক মাহফিল। তারিখ ঘোষণার পর এখানে প্রকাশ করা হবে।",
    bannerImage: null,
    theme: "spring",
  },
  {
    slug: "muharram",
    title: "মুহররমের মাহফিল",
    kind: "annual",
    monthLabel: "মুহররম মাস",
    startDate: null,
    venue: "ছারছীনা দরবার শরীফ",
    description: "মুহররম মাসে অনুষ্ঠিত বাৎসরিক মাহফিল। তারিখ ঘোষণার পর এখানে প্রকাশ করা হবে।",
    bannerImage: null,
    theme: "night",
  },
];

/* -------------------------------------------------------------- Donation */

export const donationFunds: DonationFund[] = [
  { id: "mosque", label: "মসজিদ নির্মাণ" },
  { id: "minaret", label: "মিনার নির্মাণ" },
  { id: "lillah", label: "লিল্লাহ বোর্ডিং" },
  { id: "general", label: "সাধারণ ফান্ড" },
  { id: "welfare", label: "জনকল্যাণমূলক কার্যক্রম" },
];

/**
 * No payment gateway is integrated yet (see docs/architecture.md §8), so every
 * online method is disabled. Flip `enabled` only after the merchant account
 * and server-side payment verification are live.
 */
export const paymentMethods: PaymentMethod[] = [
  { id: "bkash", label: "বিকাশ", enabled: false },
  { id: "nagad", label: "নগদ", enabled: false },
  { id: "bank", label: "ব্যাংক ট্রান্সফার", enabled: false },
  { id: "card", label: "ডেবিট / ক্রেডিট কার্ড", enabled: false },
];

export const presetAmounts = [500, 1000, 2000, 5000, 10000];

export const donationProjects: DonationProject[] = [
  {
    slug: "mosque-construction",
    fundId: "mosque",
    title: "মসজিদ নির্মাণ",
    shortDescription: "দরবার শরীফের জামে মসজিদ নির্মাণ ও সম্প্রসারণে আপনার সহযোগিতা কাম্য।",
    introduction:
      "দরবার শরীফে আগত মুসল্লিদের নামাজ আদায়ের সুবিধার্থে জামে মসজিদের নির্মাণ ও সম্প্রসারণ কাজ পরিচালিত হচ্ছে।",
    purpose: "মুসল্লিদের জন্য প্রশস্ত, নিরাপদ ও সুন্দর ইবাদতের পরিবেশ নিশ্চিত করা।",
    need: "মাহফিলের সময় বিপুল সংখ্যক মুসল্লির সমাগম হয়; বর্তমান পরিসর সম্প্রসারণ প্রয়োজন।",
    status: "active",
    statusNote: null,
    image: null,
    gallery: [],
    videos: [],
    targetAmount: null,
    collectedAmount: null,
    updates: [],
  },
  {
    slug: "minaret-construction",
    fundId: "minaret",
    title: "মিনার নির্মাণ",
    shortDescription: "দরবার শরীফের ঐতিহ্যবাহী মিনার নির্মাণ কাজে অংশ নিন, স্থায়ী সদকায়ে জারিয়ার সুযোগ।",
    introduction: "দরবার শরীফের মসজিদ সংলগ্ন মিনার নির্মাণ প্রকল্প।",
    purpose: "আজানের ধ্বনি দূর-দূরান্তে পৌঁছে দেওয়া এবং দরবার শরীফের স্থাপত্য ঐতিহ্য সংরক্ষণ।",
    need: "নির্মাণসামগ্রী ও কারিগরি ব্যয় নির্বাহে সর্বস্তরের সহযোগিতা প্রয়োজন।",
    status: "active",
    statusNote: null,
    image: null,
    gallery: [],
    videos: [],
    targetAmount: null,
    collectedAmount: null,
    updates: [],
  },
  {
    slug: "lillah-boarding",
    fundId: "lillah",
    title: "লিল্লাহ বোর্ডিং",
    shortDescription: "এতিম ও অসহায় শিক্ষার্থীদের আবাসন, খাদ্য ও সার্বিক ব্যবস্থাপনায় সহযোগিতা করুন।",
    introduction: "অসচ্ছল ও এতিম শিক্ষার্থীদের বিনা খরচে থাকা-খাওয়ার ব্যবস্থা করে লিল্লাহ বোর্ডিং।",
    purpose: "আর্থিক অসচ্ছলতার কারণে কোনো শিক্ষার্থী যেন দ্বীনি শিক্ষা থেকে বঞ্চিত না হয়।",
    need: "খাদ্য, আবাসন, চিকিৎসা ও শিক্ষাসামগ্রীর নিয়মিত ব্যয় নির্বাহে আপনার অনুদান প্রয়োজন।",
    status: "active",
    statusNote: null,
    image: null,
    gallery: [],
    videos: [],
    targetAmount: null,
    collectedAmount: null,
    updates: [],
  },
  {
    slug: "public-welfare",
    fundId: "welfare",
    title: "জনকল্যাণমূলক কার্যক্রম",
    shortDescription: "ত্রাণ, শীতবস্ত্র বিতরণসহ বিভিন্ন মানবিক ও সেবামূলক কার্যক্রমে অংশীদার হোন।",
    introduction: "দুর্যোগ ও প্রয়োজনের সময় দরবার শরীফের উদ্যোগে মানবিক সহায়তা কার্যক্রম পরিচালিত হয়।",
    purpose: "অসহায় ও দুর্গত মানুষের পাশে দাঁড়ানো।",
    need: "মৌসুমি ও জরুরি সহায়তা কার্যক্রমের জন্য তহবিল প্রয়োজন।",
    status: "active",
    statusNote: null,
    image: null,
    gallery: [],
    videos: [],
    targetAmount: null,
    collectedAmount: null,
    updates: [],
  },
];

/* ------------------------------------------------------------- Education */

export const institutions: Institution[] = [
  {
    slug: "darussunnat",
    name: "ছারছীনা দারুস্সুন্নাত কামিল মাদরাসা",
    kind: "কামিল মাদরাসা",
    description: "কুরআন-সুন্নাহভিত্তিক উচ্চতর দ্বীনি শিক্ষার ঐতিহ্যবাহী প্রতিষ্ঠান।",
    image: null,
  },
  {
    slug: "alia",
    name: "আলিয়া বিভাগ",
    kind: "শিক্ষা বিভাগ",
    description: "আলিয়া ধারার পাঠক্রমে দ্বীনি ও সাধারণ শিক্ষার সমন্বিত কার্যক্রম।",
    image: null,
  },
  {
    slug: "board",
    name: "বাংলাদেশ দ্বীনিয়া মাদরাসা বোর্ড",
    kind: "শিক্ষা বোর্ড",
    description: "দেশব্যাপী নিবন্ধিত দ্বীনিয়া মাদরাসাসমূহের পাঠক্রম ও পরীক্ষা পরিচালনা।",
    image: null,
  },
];

/* --------------------------------------------------------- Organizations */

export const organizations: Organization[] = [
  {
    slug: "jamiyate",
    name: "বাংলাদেশ জমিয়াতে হিযবুল্লাহ",
    shortName: "জমিয়াতে হিযবুল্লাহ",
    description: "দরবার শরীফের আদর্শে পরিচালিত কেন্দ্রীয় দ্বীনি সংগঠন।",
    logo: { src: "/brand/jamiyate-hizbullah-logo.webp", alt: "বাংলাদেশ জমিয়াতে হিযবুল্লাহর লোগো" },
  },
  {
    slug: "chhatra",
    name: "বাংলাদেশ ছাত্র হিযবুল্লাহ",
    shortName: "ছাত্র হিযবুল্লাহ",
    description: "ছাত্রদের মাঝে দ্বীনি শিক্ষা, আদব ও নৈতিকতা চর্চার সংগঠন।",
    logo: null,
  },
  {
    slug: "jubo",
    name: "বাংলাদেশ যুব হিযবুল্লাহ",
    shortName: "যুব হিযবুল্লাহ",
    description: "যুবসমাজকে দ্বীনের খেদমত ও সমাজসেবায় সম্পৃক্ত করার সংগঠন।",
    logo: null,
  },
  {
    slug: "aimmaye",
    name: "বাংলাদেশ আইম্মায়ে হিযবুল্লাহ",
    shortName: "আইম্মায়ে হিযবুল্লাহ",
    description: "মসজিদের ইমাম ও খতিবদের সমন্বয়ে গঠিত সংগঠন।",
    logo: null,
  },
];

/* ---------------------------------------------------------- Publications */

export const publicationCategories: PublicationCategory[] = [
  { slug: "quran-tafsir", label: "কুরআন ও তাফসীর", description: "তাফসীর ও কুরআন বিষয়ক গ্রন্থ", tone: "maroon" },
  { slug: "hadith-fiqh", label: "হাদিস ও ফিকহ", description: "হাদিস, ফিকহ ও মাসায়েল", tone: "green" },
  { slug: "tasawwuf", label: "তাসাউফ ও আত্মশুদ্ধি", description: "আধ্যাত্মিকতা ও আত্মশুদ্ধি", tone: "gold" },
  { slug: "seerah", label: "সীরাত ও জীবনী", description: "সীরাত, ইতিহাস ও জীবনী", tone: "cream" },
];

/* -------------------------------------------------------------- Articles */

export const authors: Author[] = [
  {
    slug: "editorial-desk",
    name: "সম্পাদকীয় ডেস্ক",
    photo: { src: "/brand/sarsina-media-forum-logo.webp", alt: "ছারছীনা মিডিয়া ফোরামের লোগো" },
    designation: "ছারছীনা মিডিয়া ফোরাম",
    bio: "ছারছীনা মিডিয়া ফোরামের সম্পাদকীয় বিভাগ। দরবার শরীফের আদর্শ, ইসলামী জ্ঞানচর্চা ও সমসাময়িক বিষয়ে নির্বাচিত লেখা প্রকাশ করে।",
    qualifications: null,
  },
];

export const articles: Article[] = [
  {
    slug: "importance-of-islamic-knowledge",
    title: "দ্বীনি ইলম অর্জনের গুরুত্ব ও আধুনিক প্রাসঙ্গিকতা",
    excerpt:
      "জ্ঞান অর্জন মুমিনের জীবনের অবিচ্ছেদ্য অংশ। সমকালীন প্রেক্ষাপটে দ্বীনি শিক্ষা কীভাবে ব্যক্তি ও সমাজকে আলোকিত করে, তা নিয়ে এই প্রবন্ধ।",
    category: "শিক্ষা",
    authorSlug: "editorial-desk",
    publishedAt: "2026-11-11",
    readingTimeMin: 4,
    coverImage: null,
    featured: true,
    sample: true,
    sections: [
      {
        id: "intro",
        heading: "ভূমিকা",
        paragraphs: [
          "ইসলাম জ্ঞানকে বিশেষ মর্যাদা দিয়েছে। কুরআন মাজিদের প্রথম নাযিলকৃত শব্দই ছিল পাঠের আহ্বান। তাই দ্বীনি ইলম অর্জন একজন মুমিনের ব্যক্তিগত ও সামাজিক দায়িত্ব।",
        ],
      },
      {
        id: "society",
        heading: "ব্যক্তি ও সমাজে প্রভাব",
        paragraphs: [
          "সঠিক জ্ঞান মানুষকে বিনয়ী, দায়িত্বশীল ও ন্যায়পরায়ণ করে। দ্বীনি শিক্ষা পরিবার ও সমাজে শৃঙ্খলা, সহমর্মিতা ও পারস্পরিক শ্রদ্ধার পরিবেশ তৈরি করে।",
        ],
      },
      {
        id: "today",
        heading: "আধুনিক প্রেক্ষাপট",
        paragraphs: [
          "প্রযুক্তি ও তথ্যের এই যুগে বিশুদ্ধ উৎস থেকে জ্ঞান গ্রহণ আরও গুরুত্বপূর্ণ হয়ে উঠেছে। নির্ভরযোগ্য আলেম ও প্রতিষ্ঠানের তত্ত্বাবধানে শিক্ষা গ্রহণই নিরাপদ পথ।",
        ],
      },
    ],
  },
  {
    slug: "virtue-of-sadaqah",
    title: "ইসলামে দান ও সদকার ফজিলত",
    excerpt: "দান-সদকা সম্পদকে পবিত্র করে এবং সমাজে সহমর্মিতা বৃদ্ধি করে।",
    category: "ফিকহ ও আমল",
    authorSlug: "editorial-desk",
    publishedAt: "2026-11-06",
    readingTimeMin: 3,
    coverImage: null,
    sample: true,
    sections: [
      {
        id: "meaning",
        heading: "দান ও সদকার অর্থ",
        paragraphs: [
          "আল্লাহর সন্তুষ্টির উদ্দেশ্যে নিজের সম্পদ থেকে অন্যকে দেওয়াই সদকা। এটি ফরজ যাকাতের পাশাপাশি একটি নফল ইবাদত।",
        ],
      },
      {
        id: "jariyah",
        heading: "সদকায়ে জারিয়া",
        paragraphs: [
          "মসজিদ, মাদরাসা বা জনকল্যাণমূলক স্থাপনায় দান এমন সদকা, যার কল্যাণ দীর্ঘদিন অব্যাহত থাকে।",
        ],
      },
    ],
  },
  {
    slug: "adab-of-mahfil",
    title: "মাহফিলে অংশগ্রহণের আদব",
    excerpt: "দ্বীনি মাহফিল থেকে পূর্ণ উপকার পেতে কিছু আদব ও প্রস্তুতি।",
    category: "আদব ও আখলাক",
    authorSlug: "editorial-desk",
    publishedAt: "2026-10-30",
    readingTimeMin: 3,
    coverImage: null,
    sample: true,
    sections: [
      {
        id: "niyyah",
        heading: "নিয়ত ও প্রস্তুতি",
        paragraphs: [
          "মাহফিলে যাওয়ার আগে নিয়ত বিশুদ্ধ করা, পরিচ্ছন্ন পোশাক পরিধান এবং সময়মতো উপস্থিত হওয়া উত্তম।",
        ],
      },
      {
        id: "conduct",
        heading: "মাহফিল চলাকালীন আচরণ",
        paragraphs: [
          "মনোযোগ দিয়ে আলোচনা শোনা, অপ্রয়োজনীয় কথা ও মোবাইল ফোন ব্যবহার থেকে বিরত থাকা এবং অন্যের সুবিধার প্রতি খেয়াল রাখা মাহফিলের আদব।",
        ],
      },
    ],
  },
  {
    slug: "tazkiyah-self-purification",
    title: "তাযকিয়ায়ে নফস: আত্মশুদ্ধির পথ",
    excerpt: "অন্তরের পরিশুদ্ধি ইসলামী জীবনের ভিত্তি। আত্মশুদ্ধির মৌলিক ধাপগুলো নিয়ে আলোচনা।",
    category: "তাসাউফ",
    authorSlug: "editorial-desk",
    publishedAt: "2026-10-22",
    readingTimeMin: 5,
    coverImage: null,
    sample: true,
    sections: [
      {
        id: "what",
        heading: "আত্মশুদ্ধি কী",
        paragraphs: [
          "অহংকার, হিংসা ও লোভের মতো মন্দ স্বভাব থেকে অন্তরকে মুক্ত করে উত্তম গুণাবলি অর্জনের প্রচেষ্টাই তাযকিয়ায়ে নফস।",
        ],
      },
      {
        id: "steps",
        heading: "মৌলিক ধাপ",
        paragraphs: [
          "নিয়মিত ইবাদত, যিকির, আত্মসমালোচনা এবং যোগ্য পীর-মাশায়েখের সোহবত আত্মশুদ্ধির পথে সহায়ক।",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ Team */

export const teamDepartments: { id: TeamDepartment; label: string }[] = [
  { id: "leadership", label: "পরিচালনা ও উপদেষ্টা পরিষদ" },
  { id: "editorial", label: "সম্পাদকীয় বিভাগ" },
  { id: "news", label: "সংবাদ বিভাগ" },
  { id: "video", label: "ভিডিও ও ফটোগ্রাফি বিভাগ" },
  { id: "design", label: "গ্রাফিক ডিজাইন বিভাগ" },
  { id: "tech", label: "ওয়েব ও প্রযুক্তি বিভাগ" },
  { id: "other", label: "অন্যান্য সদস্য" },
];

/**
 * Five featured slots for the homepage. Names & photos are intentionally
 * empty — real members are added from the admin panel.
 */
export const teamMembers: TeamMember[] = [
  { slug: null, name: null, designation: "সমন্বয়ক", department: "leadership", photo: null, bio: null, responsibilities: [], social: [], showOnHome: true, order: 1 },
  { slug: null, name: null, designation: "সংবাদ সম্পাদক", department: "editorial", photo: null, bio: null, responsibilities: [], social: [], showOnHome: true, order: 2 },
  { slug: null, name: null, designation: "সংবাদ প্রতিনিধি", department: "news", photo: null, bio: null, responsibilities: [], social: [], showOnHome: true, order: 3 },
  { slug: null, name: null, designation: "ভিডিও ও ভিজ্যুয়াল", department: "video", photo: null, bio: null, responsibilities: [], social: [], showOnHome: true, order: 4 },
  { slug: null, name: null, designation: "ডিজিটাল মিডিয়া", department: "tech", photo: null, bio: null, responsibilities: [], social: [], showOnHome: true, order: 5 },
];
