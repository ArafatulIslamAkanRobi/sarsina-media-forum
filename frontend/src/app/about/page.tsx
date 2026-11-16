import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "আমাদের সম্পর্কে", description: "ছারছীনা দরবার শরীফের পরিচিতি, ইতিহাস, লক্ষ্য ও উদ্দেশ্য।", alternates: { canonical: "/about" } };

export default function Page() {
  return <ComingSoon title="আমাদের সম্পর্কে" subtitle="ছারছীনা দরবার শরীফের পরিচিতি, ইতিহাস, লক্ষ্য ও উদ্দেশ্য।" />;
}
