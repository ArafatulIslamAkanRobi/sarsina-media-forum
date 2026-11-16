import type { Metadata } from "next";
import { LoginForm } from "@/components/member/LoginForm";

export const metadata: Metadata = { title: "সদস্য লগইন" };

export default function LoginPage() {
  return (
    <div className="auth-wrap pattern-bg">
      <LoginForm />
    </div>
  );
}
