import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticlesByAuthor, getAuthor, getAuthors } from "@/lib/content";
import { toBnDigits } from "@/lib/format";
import { personSchema } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleRowCard } from "@/components/ui/Cards";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getAuthor((await params).slug);
  if (!a) return {};
  return { title: `${a.name} — লেখক`, description: a.bio, alternates: { canonical: `/blog/author/${a.slug}` } };
}

export default async function AuthorPage({ params }: Props) {
  const author = getAuthor((await params).slug);
  if (!author) notFound();
  const list = getArticlesByAuthor(author.slug);
  return (
    <>
      <PageHero title={author.name} subtitle={author.designation} crumbs={[{ label: "ব্লগ", href: "/blog" }, { label: "লেখক" }]} />
      <section className="section">
        <div className="container layout-aside">
          <div style={{ display: "grid", gap: 12 }}>
            <h2 style={{ fontSize: 20 }}>প্রকাশিত প্রবন্ধ ({toBnDigits(list.length)})</h2>
            {list.map((a) => <ArticleRowCard key={a.slug} article={a} author={author} />)}
          </div>
          <aside className="card" style={{ padding: 24, display: "grid", gap: 12, justifyItems: "center", textAlign: "center" }}>
            <span className="author-box__photo" style={{ width: 120, height: 120 }}>
              {author.photo && <Image src={author.photo.src} alt={author.photo.alt} width={240} height={240} />}
            </span>
            <h2 style={{ fontSize: 20 }}>{author.name}</h2>
            <p style={{ color: "var(--emerald)", fontWeight: 600 }}>{author.designation}</p>
            <p style={{ color: "var(--text-soft)", fontSize: 15 }}>{author.bio}</p>
            {author.qualifications && <p style={{ fontSize: 14 }}><b>শিক্ষাগত পরিচয়:</b> {author.qualifications}</p>}
          </aside>
        </div>
      </section>
      <JsonLd data={personSchema(author)} />
    </>
  );
}
