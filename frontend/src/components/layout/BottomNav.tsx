"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Ellipsis, House, Newspaper, PenLine } from "lucide-react";
import { OPEN_MENU_EVENT } from "./Header";

const items = [
  { href: "/", label: "হোম", Icon: House },
  { href: "/news", label: "সংবাদ", Icon: Newspaper },
  { href: "/mahfil", label: "মাহফিল", Icon: CalendarDays },
  { href: "/blog", label: "ব্লগ", Icon: PenLine },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav" aria-label="দ্রুত নেভিগেশন">
      <ul>
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link href={href} aria-current={active ? "page" : undefined}>
                <Icon aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
        <li>
          <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_MENU_EVENT))} aria-controls="site-drawer">
            <Ellipsis aria-hidden />
            আরও
          </button>
        </li>
      </ul>
    </nav>
  );
}
