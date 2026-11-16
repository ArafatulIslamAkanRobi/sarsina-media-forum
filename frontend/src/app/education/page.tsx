import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { institutions } from "@/content/data";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";

export const metadata: Metadata = { title: "শিক্ষা", description: "ছারছীনা দরবার শরীফের শিক্ষা প্রতিষ্ঠান ও দ্বীনিয়া মাদরাসা বোর্ড।", alternates: { canonical: "/education" } };

export default function EducationPage() {
  return (
    <>
      <PageHero title="শিক্ষা প্রতিষ্ঠানসমূহ" subtitle="কুরআন-সুন্নাহভিত্তিক শিক্ষার ঐতিহ্যবাহী প্রতিষ্ঠান ও শিক্ষা বোর্ড।" crumbs={[{ label: "শিক্ষা" }]} />
      <section className="section"><div className="container grid-3">
        {institutions.map((i) => (
          <article key={i.slug} id={i.slug} className="card inst-card" style={{ scrollMarginTop: 100 }}>
            <Media image={i.image} ratio="none" icon={<Building2 />} />
            <div className="card__body"><span className="badge" style={{ alignSelf: "flex-start" }}>{i.kind}</span><h2 className="card__title">{i.name}</h2><p className="card__text">{i.description}</p></div>
          </article>
        ))}
      </div></section>
    </>
  );
}
