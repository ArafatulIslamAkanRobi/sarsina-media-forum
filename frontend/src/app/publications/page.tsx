import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "প্রকাশনী", description: "দরবার শরীফের প্রকাশিত গ্রন্থ ও সাময়িকী।", alternates: { canonical: "/publications" } };

export default function Page() {
  return <ComingSoon title="প্রকাশনী" subtitle="দরবার শরীফের প্রকাশিত গ্রন্থ ও সাময়িকী।" />;
}
