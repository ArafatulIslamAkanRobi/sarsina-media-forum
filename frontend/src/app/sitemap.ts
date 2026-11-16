import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getArticles, getAuthors, getDonationProjects, getNews } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString();
  const staticPaths = ["/", "/about", "/news", "/mahfil", "/education", "/organizations", "/publications", "/blog", "/gallery", "/donate", "/media-forum", "/contact"];
  return [
    ...staticPaths.map((p) => ({ url: u(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...getNews().map((n) => ({ url: u(`/news/${n.slug}`), lastModified: n.updatedAt ?? n.publishedAt })),
    ...getArticles().map((a) => ({ url: u(`/blog/${a.slug}`), lastModified: a.updatedAt ?? a.publishedAt })),
    ...getAuthors().map((a) => ({ url: u(`/blog/author/${a.slug}`) })),
    ...getDonationProjects().map((p) => ({ url: u(`/donate/${p.slug}`) })),
  ];
}
