import Link from "next/link";
import { Die } from "./die";

/** The home page on computers: the website design with a big hero. */
export function WebHome() {
  return (
    <main className="mx-auto w-full max-w-5xl px-8 pb-20">
      <section className="pt-20">
        <h1 className="max-w-[11ch] font-display text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.95]">
          Random picks for game night
        </h1>
        <p className="mt-9 max-w-[44ch] text-xl text-paper/85">
          Letters, words, dares, categories, dice and teams, picked at random. Pass the phone
          around, play, then tap again.
        </p>
      </section>

      <div className="mt-20 grid grid-cols-[auto_1fr] gap-12">
        <Link href="/letter" className="group block rounded-3xl">
          <span className="piece grid size-44 place-items-center rounded-[18%] bg-butter font-display text-8xl transition-transform group-hover:-translate-y-1">
            K
          </span>
          <span className="mt-7 block font-display text-2xl">Random letter</span>
          <span className="mt-1 block max-w-[30ch] text-paper/85">
            For Name, Animal, Place, Thing, Scattergories and other letter games.
          </span>
        </Link>

        <Link href="/word" className="group block rounded-3xl">
          <span className="piece grid h-44 w-full max-w-120 place-items-center rounded-[1.75rem] bg-bubblegum font-display text-[3.25rem] transition-transform group-hover:-translate-y-1">
            kangaroo
          </span>
          <span className="mt-7 block font-display text-2xl">Random word</span>
          <span className="mt-1 block max-w-[34ch] text-paper/85">
            For charades, Pictionary and guessing games. Choose animals, food, actions and more.
          </span>
        </Link>
      </div>

      <section aria-labelledby="party-heading" className="mt-24">
        <h2 id="party-heading" className="font-display text-2xl">
          Party games
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-12">
          <Link href="/truth-or-dare" className="group block rounded-3xl">
            <span className="flex h-36 items-end transition-transform group-hover:-translate-y-1">
              <span className="piece grid h-32 w-28 -rotate-6 place-items-center rounded-2xl bg-lilac font-display text-xl [--depth:6px]">
                truth
              </span>
              <span className="piece -ml-3 grid h-32 w-28 rotate-6 place-items-center rounded-2xl bg-tangerine font-display text-xl [--depth:6px]">
                dare
              </span>
            </span>
            <span className="mt-7 block font-display text-2xl">Truth or Dare</span>
            <span className="mt-1 block max-w-[34ch] text-paper/85">
              Questions and dares at three levels: Mild, Spicy and 18+. Add names and it keeps
              track of whose turn it is.
            </span>
          </Link>

          <Link href="/concentration" className="group block rounded-3xl">
            <span className="flex h-36 items-end">
              <span className="piece grid h-32 w-full max-w-96 place-items-center rounded-[1.75rem] bg-sky font-display text-4xl transition-transform [--depth:6px] group-hover:-translate-y-1">
                Animals
              </span>
            </span>
            <span className="mt-7 block font-display text-2xl">Concentration</span>
            <span className="mt-1 block max-w-[34ch] text-paper/85">
              Random categories for Concentration 64, with a clap beat to keep everyone in time.
            </span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="more-heading" className="mt-24">
        <h2 id="more-heading" className="font-display text-2xl">
          More ways to pick
        </h2>
        <div className="mt-10 grid grid-cols-3 gap-8">
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
  );
}
