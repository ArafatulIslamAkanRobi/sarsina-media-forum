import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { UserRound } from "lucide-react";
import { teamDepartments } from "@/content/data";
import { getNews, getTeam, getTeamMember } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { NewsRowCard } from "@/components/ui/Cards";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Only members that have been added with a real name/slug get a profile page.
  const slugs = getTeam().flatMap((m) => (m.slug ? [{ slug: m.slug }] : []));
  return slugs.length ? slugs : [{ slug: "_" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = getTeamMember((await params).slug);
  if (!m?.name) return { robots: { index: false } };
  return { title: `${m.name} — ${m.designation}`, description: m.bio ?? undefined };
}

export default async function MemberProfile({ params }: Props) {
  const m = getTeamMember((await params).slug);
  if (!m || !m.name) notFound();
  const dept = teamDepartments.find((d) => d.id === m.department)?.label;
  const authored = getNews().filter((n) => n.reporter === m.name);
  return (
    <>
      <PageHero title={m.name} subtitle={m.designation} crumbs={[{ label: "মিডিয়া ফোরাম", href: "/media-forum" }, { label: m.name }]} />
      <section className="section">
        <div className="container layout-aside">
          <div style={{ display: "grid", gap: 20 }}>
            {m.bio && <div className="card card__body prose"><h2>পরিচিতি</h2><p>{m.bio}</p></div>}
            {m.responsibilities.length > 0 && (
              <div className="card card__body"><h2 style={{ fontSize: 20, marginBottom: 8 }}>দায়িত্বসমূহ</h2>
                <ul style={{ margin: 0, paddingLeft: 18 }}>{m.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
              </div>
            )}
            {authored.length > 0 && (
              <div style={{ display: "grid", gap: 12 }}><h2 style={{ fontSize: 20 }}>প্রকাশিত সংবাদ</h2>{authored.map((n) => <NewsRowCard key={n.slug} item={n} />)}</div>
            )}
          </div>
          <aside className="card" style={{ padding: 24, display: "grid", gap: 10, justifyItems: "center", textAlign: "center" }}>
            <span className="author-box__photo" style={{ width: 140, height: 140, display: "grid", placeItems: "center" }}>
              {m.photo ? <Image src={m.photo.src} alt={m.photo.alt} width={280} height={280} /> : <UserRound size={48} aria-hidden />}
            </span>
            <h2 style={{ fontSize: 20 }}>{m.name}</h2>
            <p style={{ color: "var(--emerald)", fontWeight: 600 }}>{m.designation}</p>
            {dept && <span className="badge">{dept}</span>}
            {m.social.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="read-more">{s.label}</a>)}
          </aside>
        </div>
      </section>
    </>
  );
}
