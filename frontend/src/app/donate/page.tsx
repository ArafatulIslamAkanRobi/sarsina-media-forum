import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { getDonationProjects } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCard } from "@/components/ui/Cards";
import { SectionHead } from "@/components/ui/SectionHead";
import { DonationForm } from "@/components/DonationForm";

export const metadata: Metadata = {
  title: "দান কার্যক্রম",
  description: "ছারছীনা দরবার শরীফের উন্নয়ন ও জনকল্যাণমূলক প্রকল্পসমূহে অংশ নিন — মসজিদ নির্মাণ, মিনার নির্মাণ, লিল্লাহ বোর্ডিং ও জনকল্যাণ।",
  alternates: { canonical: "/donate" },
};

export default function DonatePage() {
  const projects = getDonationProjects();
  return (
    <>
      <PageHero title="দান কার্যক্রম" subtitle="দরবার শরীফের উন্নয়ন ও জনকল্যাণমূলক প্রকল্পসমূহে অংশ নিন।" crumbs={[{ label: "দান কার্যক্রম" }]} />
      <section className="section">
        <div className="container">
          <SectionHead title="অনুদান প্রকল্পসমূহ" subtitle="প্রতিটি প্রকল্পের বিস্তারিত, বর্তমান অবস্থা ও হালনাগাদ তথ্য দেখুন।" />
          <div className="grid-4 project-grid">
            {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>
      <section className="section section--white" id="quick-donate" style={{ scrollMarginTop: 80 }}>
        <div className="container">
          <div className="donate-form-wrap">
            <div className="donate-form-wrap__aside">
              <h3 id="quick-donate-title">আপনার অনুদান প্রদান করুন</h3>
              <p>পছন্দের প্রকল্পে অনুদান পাঠাতে ফর্মটি পূরণ করুন।</p>
              <ol className="donate-form-wrap__steps">
                <li><b>১</b>তহবিল ও পরিমাণ নির্বাচন করুন</li>
                <li><b>২</b>মোবাইল নম্বর বা ইমেইল দিন</li>
                <li><b>৩</b>পেমেন্ট সম্পন্ন করে ডিজিটাল রসিদ গ্রহণ করুন</li>
              </ol>
              <p className="alert alert--info" style={{ marginTop: 20, marginBottom: 24 }}>
                <ShieldCheck aria-hidden />
                <span>প্রতিটি অনুদানের হিসাব সংরক্ষিত থাকে এবং নির্দিষ্ট প্রকল্পেই ব্যয় করা হয়।</span>
              </p>
            </div>
            <DonationForm />
          </div>
        </div>
      </section>
    </>
  );
}
