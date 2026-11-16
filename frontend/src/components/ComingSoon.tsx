import Link from "next/link";
import { Hammer } from "lucide-react";
import { PageHero } from "./ui/PageHero";

export function ComingSoon({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} crumbs={[{ label: title }]} />
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <Hammer aria-hidden />
            <h2 style={{ fontSize: 20 }}>এই পেজটি নির্মাণাধীন</h2>
            <p>প্রকৃত তথ্য যুক্ত হলে শীঘ্রই এই পেজটি প্রকাশ করা হবে।</p>
            <Link href="/" className="btn btn-primary btn-sm">হোমে ফিরে যান</Link>
          </div>
        </div>
      </section>
    </>
  );
}
