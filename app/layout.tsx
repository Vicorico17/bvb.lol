import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bvb.lol — the BVB terminal you deserve",
  description: "Explore Romanian companies with clear charts, financials, and a paper-market sandbox. Free, open-source tools for the Bucharest Stock Exchange.",
  applicationName: "bvb.lol",
  openGraph: { title: "bvb.lol — Local market. Bigger picture.", description: "A clearer view of the Bucharest Stock Exchange. Free, open source, and built for curious investors.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body>
    </html>
  );
}
