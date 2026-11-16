import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  const all = [{ label: "হোম", href: "/" }, ...crumbs];
  return (
    <section className="page-hero">
      <div className="container">
        <nav aria-label="ব্রেডক্রাম্ব">
          <ol className="crumbs">
            {all.map((c, i) => (
              <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <ChevronRight aria-hidden />}
                {c.href && i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current={i === all.length - 1 ? "page" : undefined}>{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
