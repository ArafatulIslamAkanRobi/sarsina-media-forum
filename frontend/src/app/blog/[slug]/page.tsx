import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, PenLine, RefreshCw } from "lucide-react";
import { getArticle, getArticles, getArticlesByAuthor, getAuthor } from "@/lib/content";
import { formatDateBn, readingTimeBn, toBnDigits } from "@/lib/format";
import { absUrl, articleSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { JsonLd } from "@/components/ui/JsonLd";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { ArticleRowCard, Byline } from "@/components/ui/Cards";
import { ShareButtons } from "@/components/ShareButtons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const author = getAuthor(a.authorSlug);
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/blog/${a.slug}` },
    authors: author ? [{ name: author.name, url: `/blog/author/${author.slug}` }] : undefined,
    openGraph: { type: "article", title: a.title, description: a.excerpt, publishedTime: a.publishedAt, modifiedTime: a.updatedAt },
  };
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const author = getAuthor(a.authorSlug);
  const sameAuthor = getArticlesByAuthor(a.authorSlug).filter((x) => x.slug !== a.slug).slice(0, 3);
  const related = getArticles().filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 3);
  const relatedList = related.length ? related : getArticles().filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <PageHero title={a.title} subtitle={a.excerpt} crumbs={[{ label: "ব্লগ", href: "/blog" }, { label: a.category }]} />
      <section className="section">
        <div className="container layout-aside">
          <article style={{ display: "grid", gap: 20, minWidth: 0 }}>
            <div className="card">
              <Media image={a.coverImage} ratio="16x9" icon={<PenLine />} priority sizes="(min-width: 1024px) 820px, 100vw" />
              <div className="card__body" style={{ display: "grid", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  {author && <Link href={`/blog/author/${author.slug}`}><Byline author={author} /></Link>}
                  <SampleBadge show={a.sample} />
                </div>
                <div className="meta">
                  <span className="badge">{a.category}</span>
                  <span><CalendarDays aria-hidden />প্রকাশ: {formatDateBn(a.publishedAt)}</span>
                  <span><RefreshCw aria-hidden />হালনাগাদ: {formatDateBn(a.updatedAt ?? a.publishedAt)}</span>
                  <span><Clock aria-hidden />{readingTimeBn(a.readingTimeMin)}</span>
                </div>
              </div>
            </div>

            {a.sections.length > 1 && (
              <nav className="card toc" aria-labelledby="toc-title">
                <h2 id="toc-title">সূচিপত্র</h2>
                <ol>
                  {a.sections.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>)}
                </ol>
              </nav>
            )}

            <div className="card"><div className="card__body prose">
              {a.sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.heading}</h2>
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </section>
              ))}
            </div></div>

            <ShareButtons url={absUrl(`/blog/${a.slug}`)} title={a.title} />

            {author && (
              <section className="card author-box" aria-labelledby="about-author">
                <span className="author-box__photo">{author.photo && <Image src={author.photo.src} alt={author.photo.alt} width={144} height={144} />}</span>
                <div style={{ display: "grid", gap: 6 }}>
                  <h2 id="about-author" style={{ fontSize: 18 }}>লেখক পরিচিতি: {author.name}</h2>
                  <p style={{ color: "var(--emerald)", fontWeight: 600, fontSize: 14 }}>{author.designation}</p>
                  <p style={{ color: "var(--text-soft)", fontSize: 15 }}>{author.bio}</p>
                  <Link href={`/blog/author/${author.slug}`} className="read-more">লেখকের সকল প্রবন্ধ ({toBnDigits(getArticlesByAuthor(author.slug).length)})</Link>
                </div>
              </section>
            )}
          </article>

          <aside style={{ display: "grid", gap: 24 }}>
            <div style={{ display: "grid", gap: 12 }}>
              <h2 style={{ fontSize: 18 }}>সম্পর্কিত প্রবন্ধ</h2>
              {relatedList.map((x) => <ArticleRowCard key={x.slug} article={x} author={getAuthor(x.authorSlug)} />)}
            </div>
            {sameAuthor.length > 0 && author && (
              <div style={{ display: "grid", gap: 12 }}>
                <h2 style={{ fontSize: 18 }}>{author.name}-এর অন্যান্য লেখা</h2>
                {sameAuthor.map((x) => (
                  <Link key={x.slug} href={`/blog/${x.slug}`} className="card" style={{ padding: "12px 14px", fontWeight: 600, color: "var(--emerald-dark)" }}>{x.title}</Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
      <JsonLd data={articleSchema(a, author)} />
    </>
  );
}
