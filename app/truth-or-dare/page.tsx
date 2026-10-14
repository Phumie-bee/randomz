import type { Metadata } from "next";
import { TruthOrDare } from "@/components/truth-or-dare";

export const metadata: Metadata = {
  title: "Truth or Dare",
  description: "Truth or Dare questions and dares at three levels: Mild, Spicy and 18+.",
};

export default function TruthOrDarePage() {
  return <TruthOrDare />;
}
