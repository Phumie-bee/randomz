import type { Metadata } from "next";
import { Concentration } from "@/components/concentration";

export const metadata: Metadata = {
  title: "Concentration",
  description: "Random categories and a clap beat for the Concentration 64 game.",
};

export default function ConcentrationPage() {
  return <Concentration />;
}
