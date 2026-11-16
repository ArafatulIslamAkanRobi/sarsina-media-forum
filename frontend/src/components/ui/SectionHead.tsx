import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/format";

export function SectionHead({
  id,
  title,
  subtitle,
  icon,
  link,
  center,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  link?: { href: string; label: string };
  center?: boolean;
}) {
  return (
    <div className={cx("section-head", center && "section-head--center")}>
      <div>
        <h2 id={id} className="section-head__title">
          {icon}
          {title}
        </h2>
        {subtitle && <p className="section-head__sub">{subtitle}</p>}
      </div>
      {link && (
        <Link href={link.href} className="section-head__link">
          {link.label}
          <ArrowRight size={16} aria-hidden />
        </Link>
      )}
    </div>
  );
}
