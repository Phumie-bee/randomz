import Link from "next/link";
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
            Tap once for a fresh letter or word. Pass the phone around, play, then tap
            again.
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
            <span className="piece grid h-40 w-full max-w-[30rem] place-items-center rounded-[1.75rem] bg-bubblegum font-display text-[clamp(2.25rem,8vw,3.25rem)] transition-transform group-hover:-translate-y-1 sm:h-44">
              kangaroo
            </span>
            <span className="mt-7 block font-display text-2xl">Random word</span>
            <span className="mt-1 block max-w-[34ch] text-paper/85">
              For charades, Pictionary and guessing games. Choose animals, food,
              actions and more.
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}
