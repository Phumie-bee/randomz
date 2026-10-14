import type { Metadata } from "next";
import { WordPicker } from "@/components/word-picker";

export const metadata: Metadata = {
  title: "Random word",
  description: "Draw a random word for charades, Pictionary and guessing games.",
};

export default function WordPage() {
  return <WordPicker />;
}
