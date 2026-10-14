import Link from "next/link";

const links = [
  { href: "/letter", label: "Letter" },
  { href: "/word", label: "Word" },
] as const;

type Props = {
  current?: (typeof links)[number]["href"];
};

export function SiteHeader({ current }: Props) {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-8">
      <Link href="/" className="font-display text-xl text-paper">
        Randomz
      </Link>
      <nav aria-label="Games">
        <ul className="flex gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current === link.href ? "page" : undefined}
                className="block rounded-full px-4 py-2 font-semibold text-paper/85 hover:text-paper aria-[current=page]:bg-paper aria-[current=page]:text-ink"
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
