import type { Metadata } from "next";
import { TeamPicker } from "@/components/team-picker";

export const metadata: Metadata = {
  title: "Team picker",
  description: "Split your group into random teams.",
};

export default function TeamsPage() {
  return <TeamPicker />;
}
