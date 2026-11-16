import type { Metadata } from "next";
import { getArticles, getAuthor } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { ArticleFeatureCard, ArticleRowCard } from "@/components/ui/Cards";

export const metadata: Metadata = {
  title: "ইসলামিক প্রবন্ধ ও লেখনী",
  description: "ইসলামী জ্ঞানচর্চা, গবেষণা, ইতিহাস, আদর্শ ও সমসাময়িক বিষয় নিয়ে নির্বাচিত প্রবন্ধ।",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const list = getArticles();
  const [first, ...rest] = list;
  return (
    <>
      <PageHero title="ইসলামিক প্রবন্ধ ও লেখনী" subtitle="ইসলামী জ্ঞানচর্চা, গবেষণা, ইতিহাস, আদর্শ ও সমসাময়িক বিষয় নিয়ে নির্বাচিত প্রবন্ধ।" crumbs={[{ label: "ব্লগ" }]} />
      <section className="section">
        <div className="container" style={{ display: "grid", gap: 24 }}>
          {first && (
            <div className="editorial">
              <ArticleFeatureCard article={first} author={getAuthor(first.authorSlug)} />
              <div className="article-list">
                {rest.slice(0, 3).map((a) => <ArticleRowCard key={a.slug} article={a} author={getAuthor(a.authorSlug)} />)}
              </div>
            </div>
          )}
          {rest.length > 3 && (
            <div className="grid-2">
              {rest.slice(3).map((a) => <ArticleRowCard key={a.slug} article={a} author={getAuthor(a.authorSlug)} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
