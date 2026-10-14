"use client";

import { useEffect, useRef, useState } from "react";
import { parseNames } from "@/lib/names";
import { shuffle } from "@/lib/random";
import { useRollAnimation } from "@/lib/use-roll";
import { ChoiceChips } from "./choice-chips";
import { RollButton, RollNote } from "./game-controls";
import { TopBar } from "./top-bar";

const teamCounts = [2, 3, 4, 5, 6].map((n) => ({ value: n, label: String(n) }));
const teamColors = ["bg-butter", "bg-bubblegum", "bg-mint", "bg-tangerine", "bg-lilac", "bg-paper"];

// Deal shuffled players out one at a time so team sizes differ by at most one.
function splitIntoTeams(names: string[], count: number) {
  const teams: string[][] = Array.from({ length: count }, () => []);
  shuffle(names).forEach((name, i) => teams[i % count].push(name));
  return teams;
}

export function TeamPicker() {
  const [text, setText] = useState("");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][] | null>(null);
  const [rolls, setRolls] = useState(0);
  const { flicker, rolling, animate } = useRollAnimation<string[][]>(() => makeTeams());

  const names = parseNames(text);
  const enough = names.length >= teamCount;

  function makeTeams() {
    if (rolling || !enough) return;
    const pick = splitIntoTeams(names, teamCount);
    animate(
      () => splitIntoTeams(names, teamCount),
      () => {
        setTeams(pick);
        setRolls((n) => n + 1);
      },
    );
  }

  const shown = flicker ?? teams;

  // Bring new teams into view; on a phone they're below the player list.
  const resultsRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (rolls > 0) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [rolls]);

  // Width of the form column on computers.
  const column = "desktop:mx-auto desktop:w-full desktop:max-w-xl";

  return (
    <>
      <TopBar title="Teams" />
      <main className="flex flex-1 flex-col gap-6 px-4 pt-1 tablet:mx-auto tablet:w-full tablet:max-w-2xl tablet:px-8 tablet:pt-4 desktop:mx-auto desktop:w-full desktop:max-w-5xl desktop:px-8 desktop:pt-6 desktop:pb-20">
        <h1 className="hidden text-center font-display text-4xl desktop:block">Team picker</h1>

        <div className={column}>
          <label htmlFor="players" className="block text-sm font-semibold text-paper/75 desktop:text-base">
            Players
          </label>
          <textarea
            id="players"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-describedby="players-hint"
            placeholder={"Alex\nSam\nJordan\nPriya"}
            className="mt-2 w-full resize-none rounded-2xl bg-paper p-4 text-lg text-ink placeholder:text-ink/40 desktop:resize-y"
          />
          <p id="players-hint" className="mt-1 flex justify-between gap-4 text-sm text-paper/75">
            <span>One name per line, or separate them with commas.</span>
            <span className="shrink-0">
              {names.length} {names.length === 1 ? "player" : "players"}
            </span>
          </p>
        </div>

        <div className={column}>
          <ChoiceChips
            legend="Number of teams"
            name="teams"
            options={teamCounts}
            value={teamCount}
            onChange={setTeamCount}
            variant="segmented"
          />
        </div>

        {shown && (
          // Phones and tablets: teams sit above the button. Computers: below it.
          <section
            ref={resultsRef}
            aria-labelledby="teams-heading"
            className="scroll-mt-20 desktop:order-last desktop:mt-6"
          >
            <h2 id="teams-heading" className="sr-only">
              Teams
            </h2>
            <ol className="grid grid-cols-2 gap-3 tablet:grid-cols-3 tablet:gap-4 desktop:grid-cols-3 desktop:gap-6">
              {shown.map((team, i) => (
                <li
                  key={`${rolls}-${i}`}
                  data-rolling={rolling}
                  className={`piece rounded-3xl p-4 [--depth:5px] desktop:p-6 ${teamColors[i]} ${rolling ? "" : "land"}`}
                >
                  <h3 className="font-display text-lg desktop:text-xl">Team {i + 1}</h3>
                  <ul className="mt-2 space-y-0.5 font-semibold wrap-break-word desktop:mt-3 desktop:space-y-1 desktop:text-lg">
                    {team.map((name, j) => (
                      <li key={j}>{name}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        )}
        <p aria-live="polite" className="sr-only">
          {teams ? teams.map((team, i) => `Team ${i + 1}: ${team.join(", ")}.`).join(" ") : ""}
        </p>

        {/* Phones and tablets: the button stays at the bottom, within thumb reach,
            while the page scrolls. Computers: a normal button under the form. */}
        <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] -mx-4 mt-auto flex flex-col gap-4 bg-linear-to-t from-table from-75% to-transparent px-4 pt-6 pb-4 tablet:bottom-0 tablet:-mx-8 tablet:px-8 tablet:pb-[calc(1.5rem+env(safe-area-inset-bottom))] desktop:static desktop:mx-0 desktop:mt-2 desktop:items-center desktop:bg-none desktop:p-0">
          <RollButton onClick={makeTeams} disabled={rolling || !enough}>
            {teams ? "Shuffle again" : "Make teams"}
          </RollButton>
          {enough ? (
            <RollNote keyboardOnly>Or press Space</RollNote>
          ) : (
            <RollNote>
              {names.length === 0
                ? "Add your players to make teams."
                : `Add at least ${teamCount} players to make ${teamCount} teams.`}
            </RollNote>
          )}
        </div>
      </main>
    </>
  );
}
