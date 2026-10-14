import type { Metadata } from "next";
import { DicePicker } from "@/components/dice-picker";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Dice",
  description: "Roll one to six dice for board games.",
};

export default function DicePage() {
  return (
    <>
      <SiteHeader current="/dice" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-20 sm:px-8">
        <h1 className="mb-8 text-center font-display text-3xl sm:text-4xl">Dice</h1>
        <DicePicker />
      </main>
    </>
  );
}
