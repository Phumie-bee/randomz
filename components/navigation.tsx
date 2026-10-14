"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Die } from "./die";
import { HomeIcon } from "./icons";

// Each game's icon is a tiny version of that game's piece.
const games: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "/letter",
    label: "Letter",
    icon: (
      <span className="grid size-6 place-items-center rounded-md bg-butter font-display text-[0.8rem] text-ink">
        A
      </span>
    ),
  },
  {
    href: "/word",
    label: "Word",
    icon: (
      <span className="grid h-5 w-8 place-items-center rounded-md bg-bubblegum font-display text-[0.55rem] text-ink">
        abc
      </span>
    ),
  },
  {
    href: "/number",
    label: "Number",
    icon: (
      <span className="grid size-6 place-items-center rounded-full bg-mint font-display text-[0.7rem] text-ink">
        7
      </span>
    ),
  },
  {
    href: "/dice",
    label: "Dice",
    icon: <Die value={3} className="size-6 [--depth:0px]" />,
  },
  {
    href: "/teams",
    label: "Teams",
    icon: (
      <span className="flex">
        <span className="size-4 rounded-full bg-tangerine" />
        <span className="-ml-1.5 size-4 rounded-full bg-lilac" />
      </span>
    ),
  },
];

/**
 * App navigation: a bottom tab bar on phones, a sidebar on tablets.
 * Hidden on computers, which get the website header instead.
 */
export function AppNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Games"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-paper/10 bg-table-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md tablet:top-0 tablet:right-auto tablet:w-64 tablet:border-t-0 tablet:border-r tablet:pt-[env(safe-area-inset-top)] tablet:pb-6 desktop:hidden"
    >
      <p className="hidden px-6 pt-7 pb-5 font-display text-2xl tablet:block">Randomz</p>
      <ul className="mx-auto grid h-18 max-w-md grid-cols-5 tablet:flex tablet:h-auto tablet:max-w-none tablet:flex-col tablet:gap-1 tablet:px-3">
        <li className="hidden tablet:block">
          <NavRow href="/" label="Home" current={pathname === "/"} icon={<HomeIcon />} />
        </li>
        {games.map((game) => (
          <li key={game.href}>
            <NavRow
              href={game.href}
              label={game.label}
              current={pathname === game.href}
              icon={game.icon}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

type NavRowProps = { href: string; label: string; current: boolean; icon: ReactNode };

// Phone: icon above a small label, with a pill behind the current icon.
// Tablet: icon beside the label, with the whole current row highlighted.
function NavRow({ href, label, current, icon }: NavRowProps) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className="group flex h-full flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold text-paper/60 aria-[current=page]:text-paper tablet:flex-row tablet:justify-start tablet:gap-3 tablet:rounded-2xl tablet:px-3 tablet:py-2.5 tablet:text-base tablet:active:bg-paper/10 tablet:aria-[current=page]:bg-paper/15"
    >
      <span className="grid h-8 w-14 place-items-center rounded-full opacity-55 transition group-active:scale-90 group-aria-[current=page]:bg-paper/15 group-aria-[current=page]:opacity-100 tablet:w-9 tablet:group-aria-[current=page]:bg-transparent">
        {icon}
      </span>
      {label}
    </Link>
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
                className="block rounded-full px-4 py-2 font-semibold text-paper/85 hover:text-paper aria-[current=page]:bg-paper aria-[current=page]:text-ink"
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
