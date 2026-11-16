import type { Metadata } from "next";
import Image from "next/image";
import { Users } from "lucide-react";
import { organizations } from "@/content/data";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "সংগঠনসমূহ", description: "ছারছীনা দরবার শরীফের আদর্শে পরিচালিত সহযোগী সংগঠনসমূহ।", alternates: { canonical: "/organizations" } };

export default function OrganizationsPage() {
  return (
    <>
      <PageHero title="সংগঠনসমূহ" subtitle="দরবার শরীফের আদর্শে পরিচালিত সহযোগী সংগঠন।" crumbs={[{ label: "সংগঠনসমূহ" }]} />
      <section className="section"><div className="container grid-2">
        {organizations.map((o) => (
          <article key={o.slug} id={o.slug} className="card" style={{ padding: 22, display: "flex", gap: 16, alignItems: "center", scrollMarginTop: 100 }}>
            <span className="org-card__logo">{o.logo ? <Image src={o.logo.src} alt={o.logo.alt} width={144} height={144} /> : <Users aria-hidden />}</span>
            <div><h2 className="card__title">{o.name}</h2><p className="card__text">{o.description}</p></div>
          </article>
        ))}
      </div></section>
    </>
  );
}
