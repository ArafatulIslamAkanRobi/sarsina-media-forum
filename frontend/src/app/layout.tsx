import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { JsonLd } from "@/components/ui/JsonLd";
import { organizationSchema } from "@/lib/seo";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.mediaName}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.mediaName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [{ url: site.logo, width: 512, height: 512, alt: site.mediaName }],
  },
  twitter: { card: "summary", title: site.name, description: site.description },
  icons: { icon: site.logo, apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#124734",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn" className={`${hind.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">মূল কনটেন্টে যান</a>
        {site.previewMode && (
          <p className="preview-notice">
            প্রিভিউ সংস্করণ — সংবাদ, প্রবন্ধ ও তারিখগুলো নমুনা কনটেন্ট; অ্যাডমিন প্যানেল থেকে প্রকৃত তথ্য যুক্ত হবে।
          </p>
        )}
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BottomNav />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
