import type { Metadata } from "next";
import { DicePicker } from "@/components/dice-picker";

export const metadata: Metadata = {
  title: "Dice",
  description: "Roll one to six dice for board games.",
};

export default function DicePage() {
  return <DicePicker />;
}
