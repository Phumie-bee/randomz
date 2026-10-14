import Link from "next/link";
import type { ReactNode } from "react";
import { Die } from "@/components/die";
import { TopBar } from "@/components/top-bar";

type Game = {
  href: string;
  name: string;
  blurb: string;
  color: string;
  art: ReactNode;
  wide?: boolean;
};

const games: Game[] = [
  {
    href: "/letter",
    name: "Letter",
    blurb: "Name, Animal, Place, Thing",
    color: "bg-butter",
    art: <span className="font-display text-6xl leading-none">K</span>,
  },
  {
    href: "/word",
    name: "Word",
    blurb: "Charades and Pictionary",
    color: "bg-bubblegum",
    art: <span className="font-display text-xl leading-none">kangaroo</span>,
  },
  {
    href: "/number",
    name: "Number",
    blurb: "Any range you like",
    color: "bg-mint",
    art: <span className="font-display text-5xl leading-none">42</span>,
  },
  {
    href: "/dice",
    name: "Dice",
    blurb: "Roll up to six",
    color: "bg-lilac",
    art: (
      <span className="flex items-end gap-2">
        <Die value={5} className="size-12 -rotate-6 [--depth:3px]" />
        <Die value={3} className="size-10 rotate-[8deg] [--depth:3px]" />
      </span>
    ),
  },
  {
    href: "/teams",
    name: "Teams",
    blurb: "Split your group into random teams",
    color: "bg-tangerine",
    art: <span className="font-display text-3xl leading-none">us vs them</span>,
    wide: true,
  },
];

export default function Home() {
  return (
    <>
      <TopBar title="Randomz" showHome={false} />
      <main className="flex-1 px-4 pt-2 pb-6">
        <h2 className="font-display text-[2rem] leading-tight">What are we playing?</h2>
        <p className="mt-2 text-paper/80">Pick a game, tap the button, pass the phone.</p>

        <ul className="mt-6 grid grid-cols-2 gap-3">
          {games.map((game) => (
            <li key={game.href} className={game.wide ? "col-span-2" : ""}>
              <Link
                href={game.href}
                className={`piece flex h-full flex-col justify-between gap-3 rounded-3xl p-4 transition-transform [--depth:6px] active:translate-y-1 ${game.color} ${game.wide ? "min-h-32" : "aspect-square"}`}
              >
                <span className="flex flex-1 items-center">{game.art}</span>
                <span>
                  <span className="block font-display text-xl">{game.name}</span>
                  <span className="block text-sm leading-snug font-medium text-ink/75">
                    {game.blurb}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
