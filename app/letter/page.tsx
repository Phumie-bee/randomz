import type { Metadata } from "next";
import { LetterPicker } from "@/components/letter-picker";

export const metadata: Metadata = {
  title: "Random letter",
  description: "Roll a random letter for Name, Animal, Place, Thing and other letter games.",
};

export default function LetterPage() {
  return <LetterPicker />;
}
