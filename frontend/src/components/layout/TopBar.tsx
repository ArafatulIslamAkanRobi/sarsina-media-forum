import Link from "next/link";
import { Bell, CalendarDays, LogIn, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { TodayDate } from "./TodayDate";

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="topbar__group">
          <span className="topbar__item"><CalendarDays aria-hidden />আজ: <TodayDate /></span>
          <span className="topbar__item"><MapPin aria-hidden />{site.address}</span>
        </div>
        <div className="topbar__group">
          <Link href="/mahfil#today" className="topbar__item"><CalendarDays aria-hidden />আজকের মাহফিল</Link>
          <Link href="/news" className="topbar__item"><Bell aria-hidden />নোটিশ</Link>
          <Link href="/member/login" className="topbar__item"><LogIn aria-hidden />সদস্য লগইন</Link>
        </div>
      </div>
    </div>
  );
}
