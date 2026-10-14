import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Schibsted_Grotesk } from "next/font/google";
import { TabBar } from "@/components/tab-bar";
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
  description: "Random letters, words, numbers, dice and teams for game night.",
  applicationName: "Randomz",
  // Lets iPhones open it full screen from the home screen, like an app.
  appleWebApp: {
    capable: true,
    title: "Randomz",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  // Matches --color-table so the phone's browser bar blends into the page.
  themeColor: "#4a1a63",
  // Draw under the notch and home indicator; safe-area padding keeps content clear.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dela.variable} ${schibsted.variable} antialiased`}>
      <body className="font-sans">
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-x-clip pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
          {children}
        </div>
        <TabBar />
      </body>
    </html>
  );
}
