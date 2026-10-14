import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Schibsted_Grotesk } from "next/font/google";
import { AppNav, SiteHeader } from "@/components/navigation";
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
    "Random letters, words, numbers, dice and teams, plus Truth or Dare and Concentration, for game night.",
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
        <SiteHeader />
        {/* Phone: a phone-width column above the tab bar. Tablet: everything right
            of the sidebar. Desktop: full width; each page sets its own container. */}
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-x-clip pb-[calc(4.5rem+env(safe-area-inset-bottom))] tablet:max-w-none tablet:pb-0 tablet:pl-64 desktop:min-h-0 desktop:max-w-none desktop:pb-0">
          {children}
        </div>
        <AppNav />
      </body>
    </html>
  );
}
