import type { Metadata } from "next";
import { getNews } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { NewsLeadCard } from "@/components/ui/Cards";

export const metadata: Metadata = {
  title: "সংবাদ",
  description: "ছারছীনা দরবার শরীফ ও সহযোগী প্রতিষ্ঠানসমূহের সর্বশেষ সংবাদ।",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const items = getNews();
  return (
    <>
      <PageHero title="সংবাদ" subtitle="দরবার শরীফ, মাহফিল, শিক্ষা ও সংগঠনের সর্বশেষ সংবাদ।" crumbs={[{ label: "সংবাদ" }]} />
      <section className="section">
        <div className="container grid-3">
          {items.map((n) => <NewsLeadCard key={n.slug} item={n} />)}
        </div>
      </section>
    </>
  );
}
