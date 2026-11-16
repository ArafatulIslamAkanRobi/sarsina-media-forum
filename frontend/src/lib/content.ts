/**
 * Data access layer. Today it reads the static files in /src/content; once the
 * backend API exists, replace each function body with a fetch() call — the
 * page components don't need to change.
 */
import {
  annualMahfils,
  articles,
  authors,
  donationProjects,
  featuredMahfil,
  news,
  teamMembers,
} from "@/content/data";

const byDateDesc = <T extends { publishedAt: string }>(a: T, b: T) =>
  b.publishedAt.localeCompare(a.publishedAt);

export function getNews() {
  return [...news].sort(byDateDesc);
}
export function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug) ?? null;
}

export function getFeaturedMahfil() {
  return featuredMahfil;
}
export function getAnnualMahfils() {
  return annualMahfils;
}

export function getDonationProjects() {
  return donationProjects;
}
export function getDonationProject(slug: string) {
  return donationProjects.find((p) => p.slug === slug) ?? null;
}

export function getArticles() {
  return [...articles].sort(byDateDesc);
}
export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug) ?? null;
}
export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug) ?? null;
}
export function getAuthors() {
  return authors;
}
export function getArticlesByAuthor(slug: string) {
  return getArticles().filter((a) => a.authorSlug === slug);
}

export function getTeam() {
  return [...teamMembers].sort((a, b) => a.order - b.order);
}
export function getHomeTeam() {
  return getTeam().filter((m) => m.showOnHome).slice(0, 5);
}
export function getTeamMember(slug: string) {
  return teamMembers.find((m) => m.slug === slug) ?? null;
}
