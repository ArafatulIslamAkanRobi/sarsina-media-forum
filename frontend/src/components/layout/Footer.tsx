import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { footerLinks, site } from "@/content/site";
import { toBnDigits } from "@/lib/format";
import { FacebookIcon, YoutubeIcon } from "@/components/ui/Icon";

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <ChevronRight size={14} aria-hidden />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = toBnDigits(new Date().getFullYear());
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src={site.logo} alt="" width={128} height={128} style={{ width: 64, height: 64, borderRadius: "50%" }} />
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 19 }}>{site.name}</div>
              <div style={{ color: "var(--gold-soft)", fontWeight: 600, fontSize: 14 }}>{site.mediaName}</div>
            </div>
          </div>
          <p style={{ maxWidth: 360 }}>{site.tagline}।</p>
          {site.social.length > 0 && (
            <div style={{ display: "flex", gap: 10 }}>
              {site.social.map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.id} className="icon-btn" style={{ borderColor: "rgba(255,255,255,.2)", color: "#fff" }}>
                  {s.id === "youtube" ? <YoutubeIcon width={20} /> : <FacebookIcon width={20} />}
                </a>
              ))}
            </div>
          )}
        </div>
        <Col title="গুরুত্বপূর্ণ লিংক" links={footerLinks.important} />
        <Col title="শিক্ষা" links={footerLinks.education} />
        <Col title="সংগঠনসমূহ" links={footerLinks.organizations} />
        <div className="site-footer__contact-col">
          <h3>যোগাযোগ</h3>
          <ul className="site-footer__contact">
            <li><MapPin aria-hidden />{site.address}</li>
            <li><Phone aria-hidden />{site.phone ? <a href={`tel:${site.phone}`}>{site.phone}</a> : "ফোন নম্বর শীঘ্রই যুক্ত হবে"}</li>
            <li><Mail aria-hidden />{site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : "ইমেইল শীঘ্রই যুক্ত হবে"}</li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>© {year} {site.name}। সর্বস্বত্ব সংরক্ষিত।</span>
        <span>পরিচালনায়: {site.mediaName}</span>
      </div>
    </footer>
  );
}
