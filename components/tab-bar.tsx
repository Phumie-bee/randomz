"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Die } from "./die";

// Each tab's icon is a tiny version of that game's piece.
const tabs: { href: string; label: string; icon: ReactNode }[] = [
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

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Games"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-paper/10 bg-table-deep/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <ul className="mx-auto grid h-18 max-w-md grid-cols-5">
        {tabs.map((tab) => (
          <li key={tab.href}>
            <Link
              href={tab.href}
              aria-current={pathname === tab.href ? "page" : undefined}
              className="group flex h-full flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold text-paper/60 aria-[current=page]:text-paper"
            >
              <span className="grid h-8 w-14 place-items-center rounded-full opacity-55 transition group-active:scale-90 group-aria-[current=page]:bg-paper/15 group-aria-[current=page]:opacity-100">
                {tab.icon}
              </span>
              {tab.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
