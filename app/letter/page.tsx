import type { Metadata } from "next";
import { LetterPicker } from "@/components/letter-picker";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Random letter",
  description: "Roll a random letter for Name, Animal, Place, Thing and other letter games.",
};

export default function LetterPage() {
  return (
    <>
      <SiteHeader current="/letter" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-20 sm:px-8">
        <h1 className="mb-10 text-center font-display text-3xl sm:text-4xl">Random letter</h1>
        <LetterPicker />
      </main>
    </>
  );
}
