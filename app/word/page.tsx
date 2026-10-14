import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { WordPicker } from "@/components/word-picker";

export const metadata: Metadata = {
  title: "Random word",
  description: "Draw a random word for charades, Pictionary and guessing games.",
};

export default function WordPage() {
  return (
    <>
      <SiteHeader current="/word" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-20 sm:px-8">
        <h1 className="mb-8 text-center font-display text-3xl sm:text-4xl">Random word</h1>
        <WordPicker />
      </main>
    </>
  );
}
