import type { Metadata } from "next";
import { Users } from "lucide-react";
import { teamDepartments } from "@/content/data";
import { getTeam } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { TeamCard } from "@/components/ui/Cards";

export const metadata: Metadata = {
  title: "ছারছীনা মিডিয়া ফোরাম — সদস্যবৃন্দ",
  description: "দরবার শরীফের সংবাদ, কার্যক্রম ও বার্তা মানুষের কাছে পৌঁছে দিতে নিয়োজিত ছারছীনা মিডিয়া ফোরামের সদস্যবৃন্দ।",
  alternates: { canonical: "/media-forum" },
};

export default function TeamPage() {
  const team = getTeam();
  return (
    <>
      <PageHero title="ছারছীনা মিডিয়া ফোরাম" subtitle="দরবার শরীফের সংবাদ, কার্যক্রম ও বার্তা মানুষের কাছে পৌঁছে দিতে নিয়োজিত আমাদের মিডিয়া টিম।" crumbs={[{ label: "মিডিয়া ফোরাম" }]} />
      <section className="section">
        <div className="container">
          {teamDepartments.map((d) => {
            const members = team.filter((m) => m.department === d.id);
            return (
              <section key={d.id} className="dept" aria-labelledby={`dept-${d.id}`}>
                <h2 id={`dept-${d.id}`}>{d.label}</h2>
                {members.length ? (
                  <div className="team-grid">{members.map((m, i) => <TeamCard key={m.slug ?? `${d.id}-${i}`} member={m} />)}</div>
                ) : (
                  <div className="empty-state" style={{ padding: 20 }}><Users aria-hidden /><p>এই বিভাগের সদস্য তালিকা শীঘ্রই প্রকাশিত হবে।</p></div>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
