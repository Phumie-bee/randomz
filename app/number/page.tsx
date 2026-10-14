import type { Metadata } from "next";
import { NumberPicker } from "@/components/number-picker";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Random number",
  description: "Pick a random number from any range, like 1 to 10 or 1 to 100.",
};

export default function NumberPage() {
  return (
    <>
      <SiteHeader current="/number" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-20 sm:px-8">
        <h1 className="mb-8 text-center font-display text-3xl sm:text-4xl">Random number</h1>
        <NumberPicker />
      </main>
    </>
  );
}
