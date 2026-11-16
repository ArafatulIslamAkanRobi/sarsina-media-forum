import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { getAnnualMahfils } from "@/lib/content";
import { formatDateBn } from "@/lib/format";
import { PageHero } from "@/components/ui/PageHero";
import { TodayMahfil } from "@/components/home/Sections";
import { SeasonArt } from "@/components/home/Artwork";

export const metadata: Metadata = {
  title: "মাহফিল",
  description: "ছারছীনা দরবার শরীফের আজকের মাহফিল ও বাৎসরিক মাহফিলসমূহের সময়সূচি।",
  alternates: { canonical: "/mahfil" },
};

export default function MahfilPage() {
  return (
    <>
      <PageHero title="মাহফিল" subtitle="আজকের মাহফিল ও বাৎসরিক মাহফিলসমূহের তথ্য।" crumbs={[{ label: "মাহফিল" }]} />
      <TodayMahfil />
      <section className="section section--white" id="annual">
        <div className="container">
          <h2 style={{ fontSize: 24, marginBottom: 20 }}>বাৎসরিক মাহফিলসমূহ</h2>
          <div className="grid-2">
            {getAnnualMahfils().map((m) => (
              <article key={m.slug} id={m.slug} className={`card season season--${m.theme}`} style={{ scrollMarginTop: 100 }}>
                <div className="season__art"><SeasonArt theme={m.theme} /></div>
                <div className="card__body" style={{ display: "grid", gap: 8 }}>
                  <h3 className="card__title" style={{ fontSize: 20 }}>{m.title}</h3>
                  <div className="meta">
                    <span><CalendarDays aria-hidden />{m.startDate ? formatDateBn(m.startDate, true) : `${m.monthLabel} — তারিখ ঘোষণা করা হবে`}</span>
                    <span><MapPin aria-hidden />{m.venue}</span>
                  </div>
                  <p className="card__text">{m.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
