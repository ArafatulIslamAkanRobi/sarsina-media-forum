import {
  BookOpen,
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  MonitorPlay,
  Newspaper,
  Phone,
  Users,
  type LucideProps,
} from "lucide-react";

const map = {
  "heart-handshake": HeartHandshake,
  newspaper: Newspaper,
  calendar: CalendarDays,
  graduation: GraduationCap,
  users: Users,
  book: BookOpen,
  video: MonitorPlay,
  phone: Phone,
} as const;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as keyof typeof map] ?? BookOpen;
  return <Cmp aria-hidden {...props} />;
}

/** Brand glyphs (not shipped by lucide). */
export function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  );
}
export function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}
