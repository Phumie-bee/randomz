import Link from "next/link";
import type { ReactNode } from "react";
import { Die } from "@/components/die";
import { TopBar } from "@/components/top-bar";
import { WebHome } from "@/components/web-home";

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
    art: <span className="font-display text-6xl leading-none tablet:text-8xl">K</span>,
  },
  {
    href: "/word",
    name: "Word",
    blurb: "Charades and Pictionary",
    color: "bg-bubblegum",
    art: <span className="font-display text-xl leading-none tablet:text-3xl">kangaroo</span>,
  },
  {
    href: "/truth-or-dare",
    name: "Truth or Dare",
    blurb: "Mild, Spicy or 18+",
    color: "bg-paper",
    art: (
      <span className="flex items-end">
        <span className="grid h-14 w-10 -rotate-12 place-items-center rounded-lg bg-lilac font-display text-xl tablet:h-20 tablet:w-14 tablet:text-3xl">
          T
        </span>
        <span className="-ml-2 grid h-14 w-10 rotate-12 place-items-center rounded-lg bg-tangerine font-display text-xl tablet:h-20 tablet:w-14 tablet:text-3xl">
          D
        </span>
      </span>
    ),
  },
  {
    href: "/concentration",
    // Soft hyphen: on narrow phones the name breaks as "Concen-tration".
    name: "Concen­tration",
    blurb: "Name it on the beat",
    color: "bg-sky",
    art: <span className="font-display text-5xl leading-none tablet:text-7xl">64</span>,
  },
  {
    href: "/number",
    name: "Number",
    blurb: "Any range you like",
    color: "bg-mint",
    art: <span className="font-display text-5xl leading-none tablet:text-7xl">42</span>,
  },
  {
    href: "/dice",
    name: "Dice",
    blurb: "Roll up to six",
    color: "bg-lilac",
    art: (
      <span className="flex items-end gap-2">
        <Die value={5} className="size-12 -rotate-6 [--depth:3px] tablet:size-16" />
        <Die value={3} className="size-10 rotate-[8deg] [--depth:3px] tablet:size-14" />
      </span>
    ),
  },
  {
    href: "/teams",
    name: "Teams",
    blurb: "Split your group into random teams",
    color: "bg-tangerine",
    art: <span className="font-display text-3xl leading-none tablet:text-4xl">us vs them</span>,
    wide: true,
  },
];

export default function Home() {
  return (
    <>
      <div className="contents desktop:hidden">
        <AppHome />
      </div>
      <div className="hidden desktop:block">
        <WebHome />
      </div>
    </>
  );
}

/** The home screen on phones and tablets: a launcher with a tile per game. */
function AppHome() {
  return (
    <>
      <TopBar
        title={
          <>
            <span className="tablet:hidden">Randomz</span>
            {/* Tablets already show "Randomz" at the top of the sidebar. */}
            <span className="hidden tablet:inline">Home</span>
          </>
        }
        centered={false}
      />
      <main className="@container flex-1 px-4 pt-2 pb-6 tablet:mx-auto tablet:w-full tablet:max-w-3xl tablet:px-8 tablet:pt-6">
        <h2 className="font-display text-[2rem] leading-tight tablet:text-5xl">
          What are we playing?
        </h2>
        <p className="mt-2 text-paper/80 tablet:mt-3 tablet:text-lg">
          Pick a game, tap the button, pass the phone.
        </p>

        {/* Two columns, or three when the screen is wide enough (iPad landscape). */}
        <ul className="mt-6 grid grid-cols-2 gap-3 tablet:mt-8 tablet:gap-4 @xl:grid-cols-3">
          {games.map((game) => (
            <li key={game.href} className={game.wide ? "col-span-2 @xl:col-span-3" : ""}>
              <Link
                href={game.href}
                // Roughly square, but free to grow when a long name wraps.
                className={`piece flex h-full flex-col justify-between gap-3 rounded-3xl p-4 transition-transform [--depth:6px] active:translate-y-1 ${game.color} ${game.wide ? "min-h-32" : "min-h-44 tablet:min-h-0 tablet:aspect-square"}`}
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
