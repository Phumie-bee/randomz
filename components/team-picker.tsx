"use client";

import { useEffect, useRef, useState } from "react";
import { shuffle } from "@/lib/random";
import { useRollAnimation } from "@/lib/use-roll";
import { ChoiceChips } from "./choice-chips";
import { RollButton, RollNote } from "./game-controls";
import { TopBar } from "./top-bar";

const teamCounts = [2, 3, 4, 5, 6].map((n) => ({ value: n, label: String(n) }));
const teamColors = ["bg-butter", "bg-bubblegum", "bg-mint", "bg-tangerine", "bg-lilac", "bg-paper"];

function parseNames(text: string) {
  return text
    .split(/[\n,]/)
    .map((name) => name.trim())
    .filter(Boolean);
}

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

  return (
    <>
      <TopBar title="Teams" />
      <main className="flex flex-1 flex-col px-4">
        <div className="flex-1 space-y-6 pt-1 pb-6">
          <div>
            <label htmlFor="players" className="block text-sm font-semibold text-paper/75">
              Players
            </label>
            <textarea
              id="players"
              rows={5}
              value={text}
              onChange={(e) => setText(e.target.value)}
              aria-describedby="players-hint"
              placeholder={"Alex\nSam\nJordan\nPriya"}
              className="mt-2 w-full resize-none rounded-2xl bg-paper p-4 text-lg text-ink placeholder:text-ink/40"
            />
            <p id="players-hint" className="mt-1 flex justify-between gap-4 text-sm text-paper/75">
              <span>One name per line, or separate them with commas.</span>
              <span className="shrink-0">
                {names.length} {names.length === 1 ? "player" : "players"}
              </span>
            </p>
          </div>

          <ChoiceChips
            legend="Number of teams"
            name="teams"
            options={teamCounts}
            value={teamCount}
            onChange={setTeamCount}
            variant="segmented"
          />

          {shown && (
            <section ref={resultsRef} aria-labelledby="teams-heading" className="scroll-mt-20">
              <h2 id="teams-heading" className="sr-only">
                Teams
              </h2>
              <ol className="grid grid-cols-2 gap-3">
                {shown.map((team, i) => (
                  <li
                    key={`${rolls}-${i}`}
                    data-rolling={rolling}
                    className={`piece rounded-3xl p-4 [--depth:5px] ${teamColors[i]} ${rolling ? "" : "land"}`}
                  >
                    <h3 className="font-display text-lg">Team {i + 1}</h3>
                    <ul className="mt-2 space-y-0.5 font-semibold wrap-break-word">
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
            {teams
              ? teams.map((team, i) => `Team ${i + 1}: ${team.join(", ")}.`).join(" ")
              : ""}
          </p>
        </div>

        {/* The main button stays within thumb reach while the page scrolls. */}
        <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] -mx-4 flex flex-col gap-4 bg-linear-to-t from-table from-75% to-transparent px-4 pt-6 pb-4">
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
