"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Die } from "./die";
import { HomeIcon, MoreIcon } from "./icons";
import { Sheet } from "./sheet";

type Game = {
  href: string;
  label: string;
  /** Shorter label for the phone tab bar, where space is tight. */
  tabLabel?: string;
  blurb: string;
  icon: ReactNode;
  /** Gets its own phone tab. The rest live under "More". */
  phoneTab: boolean;
};

// Each game's icon is a tiny version of that game's piece.
const games: Game[] = [
  {
    href: "/letter",
    label: "Letter",
    blurb: "Name, Animal, Place, Thing",
    phoneTab: true,
    icon: (
      <span className="grid size-6 place-items-center rounded-md bg-butter font-display text-[0.8rem] text-ink">
        A
      </span>
    ),
  },
  {
    href: "/word",
    label: "Word",
    blurb: "Charades and Pictionary",
    phoneTab: true,
    icon: (
      <span className="grid h-5 w-8 place-items-center rounded-md bg-bubblegum font-display text-[0.55rem] text-ink">
        abc
      </span>
    ),
  },
  {
    href: "/truth-or-dare",
    label: "Truth or Dare",
    tabLabel: "Truth/Dare",
    blurb: "Mild, Spicy or 18+",
    phoneTab: true,
    icon: (
      <span className="relative block h-6 w-7">
        <span className="absolute top-0.5 left-0.5 h-5 w-3.5 -rotate-12 rounded-[3px] bg-lilac" />
        <span className="absolute top-0.5 right-0.5 h-5 w-3.5 rotate-12 rounded-[3px] bg-tangerine" />
      </span>
    ),
  },
  {
    href: "/concentration",
    label: "Concentration",
    blurb: "Clap the beat, name things in a category",
    phoneTab: false,
    icon: (
      <span className="grid size-6 place-items-center rounded-full bg-sky font-display text-[0.6rem] text-ink">
        64
      </span>
    ),
  },
  {
    href: "/number",
    label: "Number",
    blurb: "Any range you like",
    phoneTab: false,
    icon: (
      <span className="grid size-6 place-items-center rounded-full bg-mint font-display text-[0.7rem] text-ink">
        7
      </span>
    ),
  },
  {
    href: "/dice",
    label: "Dice",
    blurb: "Roll up to six",
    phoneTab: false,
    icon: <Die value={3} className="size-6 [--depth:0px]" />,
  },
  {
    href: "/teams",
    label: "Teams",
    blurb: "Split your group into random teams",
    phoneTab: false,
    icon: (
      <span className="flex">
        <span className="size-4 rounded-full bg-tangerine" />
        <span className="-ml-1.5 size-4 rounded-full bg-lilac" />
      </span>
    ),
  },
];

/**
 * App navigation, hidden on computers (they get the website header).
 * Phones: a bottom tab bar with Home, three games and "More" for the rest.
 * Tablets: a sidebar listing everything.
 */
export function AppNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreGames = games.filter((game) => !game.phoneTab);

  return (
    <nav
      aria-label="Games"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-paper/10 bg-table-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md tablet:top-0 tablet:right-auto tablet:w-64 tablet:overflow-y-auto tablet:border-t-0 tablet:border-r tablet:pt-[env(safe-area-inset-top)] tablet:pb-6 desktop:hidden"
    >
      <p className="hidden px-6 pt-7 pb-5 font-display text-2xl tablet:block">Randomz</p>
      <ul className="mx-auto grid h-18 max-w-md grid-cols-5 tablet:flex tablet:h-auto tablet:max-w-none tablet:flex-col tablet:gap-1 tablet:px-3">
        <li>
          <NavItem href="/" label="Home" current={pathname === "/"} icon={<HomeIcon />} />
        </li>
        {games.map((game) => (
          <li key={game.href} className={game.phoneTab ? "" : "hidden tablet:block"}>
            <NavItem
              href={game.href}
              label={game.label}
              tabLabel={game.tabLabel}
              current={pathname === game.href}
              icon={game.icon}
            />
          </li>
        ))}
        <li className="tablet:hidden">
          <NavItem
            label="More"
            current={moreGames.some((game) => game.href === pathname)}
            icon={<MoreIcon />}
            onClick={() => setMoreOpen(true)}
          />
        </li>
      </ul>

      <Sheet open={moreOpen} onClose={() => setMoreOpen(false)} title="More games">
        <ul className="divide-y divide-paper/10">
          {moreGames.map((game) => (
            <li key={game.href}>
              <Link
                href={game.href}
                onClick={() => setMoreOpen(false)}
                aria-current={pathname === game.href ? "page" : undefined}
                className="flex items-center gap-4 py-3.5"
              >
                <span className="grid w-9 shrink-0 place-items-center">{game.icon}</span>
                <span>
                  <span className="block font-semibold">{game.label}</span>
                  <span className="block text-sm text-paper/70">{game.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Sheet>
    </nav>
  );
}

type NavItemProps = {
  label: string;
  tabLabel?: string;
  current: boolean;
  icon: ReactNode;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

// Phone: icon above a small label, with a pill behind the current icon.
// Tablet: icon beside the label, with the whole current row highlighted.
function NavItem({ href, label, tabLabel, current, icon, onClick }: NavItemProps) {
  const className = `group flex h-full w-full flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold tablet:flex-row tablet:justify-start tablet:gap-3 tablet:rounded-2xl tablet:px-3 tablet:py-2.5 tablet:text-base tablet:active:bg-paper/10 ${
    current ? "text-paper tablet:bg-paper/15" : "text-paper/60"
  }`;
  const content = (
    <>
      <span
        className={`grid h-8 w-14 place-items-center rounded-full transition group-active:scale-90 tablet:w-9 ${
          current ? "bg-paper/15 opacity-100 tablet:bg-transparent" : "opacity-55"
        }`}
      >
        {icon}
      </span>
      {tabLabel ? (
        <>
          <span className="tablet:hidden">{tabLabel}</span>
          <span className="hidden tablet:inline">{label}</span>
        </>
      ) : (
        label
      )}
    </>
  );

  return href ? (
    <Link href={href} aria-current={current ? "page" : undefined} className={className}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

/** The website header, shown only on computers. */
export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="mx-auto hidden w-full max-w-5xl items-center justify-between gap-6 px-8 py-5 desktop:flex">
      <Link href="/" className="font-display text-xl">
        Randomz
      </Link>
      <nav aria-label="Games">
        <ul className="flex gap-1">
          {games.map((game) => (
            <li key={game.href}>
              <Link
                href={game.href}
                aria-current={pathname === game.href ? "page" : undefined}
                className="block rounded-full px-3.5 py-2 font-semibold whitespace-nowrap text-paper/85 hover:text-paper aria-[current=page]:bg-paper aria-[current=page]:text-ink"
              >
                {game.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
