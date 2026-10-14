import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const dela = Dela_Gothic_One({
  variable: "--font-dela",
  weight: "400",
  subsets: ["latin"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Randomz",
    template: "%s | Randomz",
  },
  description:
    "Random letters and words for game night. Tap once and play.",
};

// Matches --color-table so the phone's browser bar blends into the page.
export const viewport: Viewport = {
  themeColor: "#4a1a63",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dela.variable} ${schibsted.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
