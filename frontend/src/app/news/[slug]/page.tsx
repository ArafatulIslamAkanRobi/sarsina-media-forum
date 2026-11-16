import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Newspaper, UserRound } from "lucide-react";
import { getNews, getNewsBySlug } from "@/lib/content";
import { formatDateBn } from "@/lib/format";
import { absUrl, newsArticleSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { JsonLd } from "@/components/ui/JsonLd";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { NewsRowCard } from "@/components/ui/Cards";
import { ShareButtons } from "@/components/ShareButtons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getNewsBySlug((await params).slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: { type: "article", title: item.title, description: item.excerpt, publishedTime: item.publishedAt },
  };
}

export default async function NewsDetail({ params }: Props) {
  const item = getNewsBySlug((await params).slug);
  if (!item) notFound();
  const related = getNews().filter((n) => n.slug !== item.slug).slice(0, 3);
  return (
    <>
      <PageHero title={item.title} crumbs={[{ label: "সংবাদ", href: "/news" }, { label: item.category }]} />
      <section className="section">
        <div className="container layout-aside">
          <article className="card">
            <Media image={item.coverImage} ratio="16x9" icon={<Newspaper />} priority sizes="(min-width: 1024px) 800px, 100vw" />
            <div className="card__body" style={{ display: "grid", gap: 16 }}>
              <div className="meta">
                <span className="badge">{item.category}</span>
                <span><CalendarDays aria-hidden />{formatDateBn(item.publishedAt)}</span>
                <span><UserRound aria-hidden />{item.reporter}</span>
                <SampleBadge show={item.sample} />
              </div>
              <div className="prose">{item.body.map((p, i) => <p key={i}>{p}</p>)}</div>
              <ShareButtons url={absUrl(`/news/${item.slug}`)} title={item.title} />
            </div>
          </article>
          <aside style={{ display: "grid", gap: 12 }}>
            <h2 style={{ fontSize: 18 }}>আরও সংবাদ</h2>
            {related.map((n) => <NewsRowCard key={n.slug} item={n} />)}
          </aside>
        </div>
      </section>
      <JsonLd data={newsArticleSchema(item)} />
    </>
  );
}
