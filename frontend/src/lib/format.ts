const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

const BN_MONTHS = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];
const BN_DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

/** "2026-11-16" → "১৬ নভেম্বর ২০২৬" (parsed as a calendar date, no TZ shift) */
export function formatDateBn(iso: string, withDay = false): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  const base = `${toBnDigits(d)} ${BN_MONTHS[m - 1]} ${toBnDigits(y)}`;
  return withDay ? `${base} (${BN_DAYS[date.getUTCDay()]})` : base;
}

/** Indian/Bangladeshi digit grouping: 1250000 → "১২,৫০,০০০" */
export function formatTaka(amount: number): string {
  const s = Math.round(amount).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `৳ ${toBnDigits(rest ? `${rest},${last3}` : last3)}`;
}

export function readingTimeBn(min: number): string {
  return `${toBnDigits(min)} মিনিট পড়া`;
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
