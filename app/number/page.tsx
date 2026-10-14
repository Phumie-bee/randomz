import type { Metadata } from "next";
import { NumberPicker } from "@/components/number-picker";

export const metadata: Metadata = {
  title: "Random number",
  description: "Pick a random number from any range, like 1 to 10 or 1 to 100.",
};

export default function NumberPage() {
  return <NumberPicker />;
}
