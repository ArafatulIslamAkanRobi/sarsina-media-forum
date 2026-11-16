import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export const metadata: Metadata = { title: "যোগাযোগ", description: "ছারছীনা দরবার শরীফ ও মিডিয়া ফোরামের সাথে যোগাযোগ।", alternates: { canonical: "/contact" } };

export default function Page() {
  return <ComingSoon title="যোগাযোগ" subtitle="ছারছীনা দরবার শরীফ ও মিডিয়া ফোরামের সাথে যোগাযোগ।" />;
}
