import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { TeamPicker } from "@/components/team-picker";

export const metadata: Metadata = {
  title: "Team picker",
  description: "Split your group into random teams.",
};

export default function TeamsPage() {
  return (
    <>
      <SiteHeader current="/teams" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-20 sm:px-8">
        <h1 className="mb-8 text-center font-display text-3xl sm:text-4xl">Team picker</h1>
        <TeamPicker />
      </main>
    </>
  );
}
