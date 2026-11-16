import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "গ্যালারি", description: "দরবার শরীফ ও মাহফিলের ছবি ও ভিডিও।", alternates: { canonical: "/gallery" } };

export default function Page() {
  return <ComingSoon title="গ্যালারি" subtitle="দরবার শরীফ ও মাহফিলের ছবি ও ভিডিও।" />;
}
