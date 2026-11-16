import type { Metadata } from "next";
import { Dashboard } from "@/components/member/Dashboard";

export const metadata: Metadata = { title: "সদস্য ড্যাশবোর্ড" };

export default function DashboardPage() {
  return <Dashboard />;
}
