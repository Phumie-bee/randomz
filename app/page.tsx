import Link from "next/link";
import { Die } from "@/components/die";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-20 sm:px-8">
        <section className="pt-10 sm:pt-20">
          <h1 className="max-w-[11ch] font-display text-[clamp(2.75rem,10vw,6.25rem)] leading-[0.95]">
            Random picks for game night
          </h1>
          <p className="mt-9 max-w-[44ch] text-lg text-paper/85 sm:text-xl">
            Letters, words, numbers, dice and teams, picked at random. Pass the phone around,
            play, then tap again.
          </p>
        </section>

        <div className="mt-16 grid gap-14 sm:mt-20 sm:grid-cols-[auto_1fr] sm:gap-12">
          <Link href="/letter" className="group block rounded-3xl">
            <span className="piece grid size-40 place-items-center rounded-[18%] bg-butter font-display text-8xl transition-transform group-hover:-translate-y-1 sm:size-44">
              K
            </span>
            <span className="mt-7 block font-display text-2xl">Random letter</span>
            <span className="mt-1 block max-w-[30ch] text-paper/85">
              For Name, Animal, Place, Thing, Scattergories and other letter games.
            </span>
          </Link>

          <Link href="/word" className="group block rounded-3xl">
            <span className="piece grid h-40 w-full max-w-120 place-items-center rounded-[1.75rem] bg-bubblegum font-display text-[clamp(2.25rem,8vw,3.25rem)] transition-transform group-hover:-translate-y-1 sm:h-44">
              kangaroo
            </span>
            <span className="mt-7 block font-display text-2xl">Random word</span>
            <span className="mt-1 block max-w-[34ch] text-paper/85">
              For charades, Pictionary and guessing games. Choose animals, food, actions and
              more.
            </span>
          </Link>
        </div>

        <section aria-labelledby="more-heading" className="mt-24">
          <h2 id="more-heading" className="font-display text-2xl">
            More ways to pick
          </h2>
          <div className="mt-10 grid gap-12 sm:grid-cols-3 sm:gap-8">
            <Link href="/number" className="group block rounded-3xl">
              <span className="flex h-28 items-end">
                <span className="piece grid size-28 place-items-center rounded-full bg-mint font-display text-5xl transition-transform [--depth:6px] group-hover:-translate-y-1">
                  42
                </span>
              </span>
              <span className="mt-6 block font-display text-xl">Random number</span>
              <span className="mt-1 block max-w-[28ch] text-paper/85">
                Pick from any range, like 1 to 10 or 1 to 100.
              </span>
            </Link>

            <Link href="/dice" className="group block rounded-3xl">
              <span className="flex h-28 items-end gap-3 transition-transform group-hover:-translate-y-1">
                <Die value={5} className="size-24 -rotate-6" />
                <Die value={3} className="size-20 rotate-[8deg]" />
              </span>
              <span className="mt-6 block font-display text-xl">Dice</span>
              <span className="mt-1 block max-w-[28ch] text-paper/85">
                Roll one to six dice for board games.
              </span>
            </Link>

            <Link href="/teams" className="group block rounded-3xl">
              <span className="flex h-28 items-end">
                <span className="piece grid h-28 w-full max-w-60 place-items-center rounded-3xl bg-tangerine font-display text-3xl transition-transform [--depth:6px] group-hover:-translate-y-1">
                  us vs them
                </span>
              </span>
              <span className="mt-6 block font-display text-xl">Team picker</span>
              <span className="mt-1 block max-w-[28ch] text-paper/85">
                Split your group into random teams.
              </span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
