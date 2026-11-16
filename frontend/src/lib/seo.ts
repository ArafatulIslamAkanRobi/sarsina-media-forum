import { site } from "@/content/site";
import type { Article, Author, NewsItem } from "@/content/types";

export const absUrl = (path: string) => new URL(path, site.url).toString();

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: [site.nameEn, site.mediaName, site.mediaNameEn],
    url: site.url,
    logo: absUrl(site.logo),
    description: site.description,
    address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "BD" },
    ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
  };
}

export function personSchema(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.designation,
    description: author.bio,
    url: absUrl(`/blog/author/${author.slug}`),
    ...(author.photo ? { image: absUrl(author.photo.src) } : {}),
  };
}

export function articleSchema(article: Article, author: Author | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "bn",
    mainEntityOfPage: absUrl(`/blog/${article.slug}`),
    ...(article.coverImage ? { image: absUrl(article.coverImage.src) } : {}),
    author: author ? personSchema(author) : undefined,
    publisher: { "@type": "Organization", name: site.mediaName, logo: { "@type": "ImageObject", url: absUrl(site.logo) } },
  };
}

export function newsArticleSchema(item: NewsItem) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.publishedAt,
    dateModified: item.updatedAt ?? item.publishedAt,
    inLanguage: "bn",
    mainEntityOfPage: absUrl(`/news/${item.slug}`),
    ...(item.coverImage ? { image: absUrl(item.coverImage.src) } : {}),
    author: { "@type": "Organization", name: item.reporter },
    publisher: { "@type": "Organization", name: site.mediaName, logo: { "@type": "ImageObject", url: absUrl(site.logo) } },
  };
}
