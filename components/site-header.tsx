import Link from "next/link";

const links = [
  { href: "/letter", label: "Letter" },
  { href: "/word", label: "Word" },
  { href: "/number", label: "Number" },
  { href: "/dice", label: "Dice" },
  { href: "/teams", label: "Teams" },
] as const;

type Props = {
  current?: (typeof links)[number]["href"];
};

export function SiteHeader({ current }: Props) {
  return (
    <header className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 sm:px-8">
      <Link href="/" className="font-display text-xl text-paper">
        Randomz
      </Link>
      <nav aria-label="Games" className="-mx-2 sm:mx-0">
        <ul className="flex flex-wrap gap-0.5 sm:gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current === link.href ? "page" : undefined}
                className="block rounded-full px-2.5 py-1.5 text-[0.9375rem] font-semibold whitespace-nowrap text-paper/85 hover:text-paper aria-[current=page]:bg-paper aria-[current=page]:text-ink sm:px-4 sm:py-2 sm:text-base"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
