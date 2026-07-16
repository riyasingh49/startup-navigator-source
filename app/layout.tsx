import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startup Navigator - Comprehensive Guide to Startups",
  description:
    "A modern AI-powered startup guide with RAG-style search, founder resources, admin tools, and dashboard insights.",
  openGraph: {
    title: "Startup Navigator",
    description:
      "Explore registration, funding, compliance, hiring, marketing, taxation, AI tools, and growth guidance.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
