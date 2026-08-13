import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "bvb.lol — the BVB terminal you deserve",
  description: "A clean, open-source dashboard for the Bucharest Stock Exchange."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
