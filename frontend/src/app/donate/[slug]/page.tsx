import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, ImageIcon, PlayCircle } from "lucide-react";
import { getDonationProject, getDonationProjects } from "@/lib/content";
import { formatDateBn } from "@/lib/format";
import { PageHero } from "@/components/ui/PageHero";
import { Media } from "@/components/ui/Media";
import { DonationProgress } from "@/components/ui/Cards";
import { DonationForm } from "@/components/DonationForm";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDonationProjects().map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getDonationProject((await params).slug);
  if (!p) return {};
  return { title: `${p.title} — অনুদান প্রকল্প`, description: p.shortDescription, alternates: { canonical: `/donate/${p.slug}` } };
}

const statusLabel = { active: "চলমান", completed: "সম্পন্ন", paused: "সাময়িক স্থগিত" } as const;

export default async function DonationDetail({ params }: Props) {
  const p = getDonationProject((await params).slug);
  if (!p) notFound();
  const blocks = [
    { title: "প্রকল্প পরিচিতি", text: p.introduction },
    { title: "প্রকল্পের উদ্দেশ্য", text: p.purpose },
    { title: "কেন এই প্রকল্প প্রয়োজন", text: p.need },
  ];
  return (
    <>
      <PageHero title={p.title} subtitle={p.shortDescription} crumbs={[{ label: "দান কার্যক্রম", href: "/donate" }, { label: p.title }]} />
      <section className="section">
        <div className="container layout-aside">
          <div style={{ display: "grid", gap: 20, minWidth: 0 }}>
            <div className="card">
              <Media image={p.image} ratio="16x9" priority sizes="(min-width: 1024px) 820px, 100vw" />
            </div>
            <div className="card"><div className="card__body prose">
              {blocks.map((b) => (
                <section key={b.title}><h2>{b.title}</h2><p>{b.text}</p></section>
              ))}
            </div></div>

            <div className="card"><div className="card__body" style={{ display: "grid", gap: 14 }}>
              <h2 style={{ fontSize: 20 }}>প্রকল্পের ছবি ও ভিডিও</h2>
              {p.gallery.length || p.videos.length ? (
                <div className="grid-3">
                  {p.gallery.map((g, i) => <Media key={i} image={g} ratio="4x3" />)}
                  {p.videos.map((v) => <a key={v.url} href={v.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline"><PlayCircle size={18} aria-hidden />{v.title}</a>)}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: 24 }}><ImageIcon aria-hidden /><p>প্রকল্পের ছবি ও ভিডিও শীঘ্রই যুক্ত করা হবে।</p></div>
              )}
            </div></div>

            <div className="card"><div className="card__body" style={{ display: "grid", gap: 12 }}>
              <h2 style={{ fontSize: 20 }}>প্রকল্পের হালনাগাদ</h2>
              {p.updates.length ? (
                <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
                  {p.updates.map((u, i) => <li key={i}><b>{formatDateBn(u.date)}:</b> {u.text}</li>)}
                </ul>
              ) : (
                <p style={{ color: "var(--text-soft)" }}>এখনো কোনো হালনাগাদ প্রকাশিত হয়নি।</p>
              )}
            </div></div>
          </div>

          <aside className="card" style={{ padding: 20, display: "grid", gap: 14 }}>
            <div className="meta"><span>বর্তমান অবস্থা:</span><span className="badge">{statusLabel[p.status]}</span></div>
            {p.statusNote && <p style={{ fontSize: 14.5 }}>{p.statusNote}</p>}
            <DonationProgress project={p} />
            <Link href="#donate-form" className="btn btn-primary btn-block"><Heart size={18} aria-hidden />এই প্রকল্পে দান করুন</Link>
          </aside>
        </div>
      </section>
      <section className="section section--white" id="donate-form" style={{ scrollMarginTop: 80 }}>
        <div className="container">
          <div className="donate-form-wrap">
            <div className="donate-form-wrap__aside" style={{ paddingBottom: 24 }}>
              <h3 id="quick-donate-title">{p.title} — অনুদান</h3>
              <p>তহবিল আগে থেকেই নির্বাচিত আছে। পরিমাণ ও যোগাযোগের তথ্য দিন।</p>
            </div>
            <DonationForm defaultFund={p.fundId} />
          </div>
        </div>
      </section>
    </>
  );
}
