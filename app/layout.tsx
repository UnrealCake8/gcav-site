import type { Metadata } from "next";
import "./globals.css";
import "./refresh.css";
import "./interactive.css";
import "./cinematic.css";
import "./pages.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InteractiveFX } from "@/components/InteractiveFX";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: site.studioName, template: `%s | ${site.studioName}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: site.studioName, description: site.description, url: "/" },
  twitter: { card: "summary_large_image", title: site.studioName, description: site.description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ "--accent": site.accentColor } as React.CSSProperties}>
        <a className="skip" href="#content">Skip to content</a>
        <InteractiveFX />
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
