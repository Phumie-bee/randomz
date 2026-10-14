"use client";

import { useState } from "react";
import { shuffle } from "@/lib/random";
import { useRollAnimation } from "@/lib/use-roll";
import { ChoiceChips } from "./choice-chips";
import { KeyHint, RollButton } from "./game-controls";

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

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xl">
        <label htmlFor="players" className="block font-semibold">
          Players
        </label>
        <p id="players-hint" className="mt-1 text-paper/75">
          One name per line, or separate them with commas.
        </p>
        <textarea
          id="players"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-describedby="players-hint players-count"
          placeholder={"Alex\nSam\nJordan\nPriya"}
          className="mt-3 w-full resize-y rounded-2xl bg-paper p-4 text-lg text-ink placeholder:text-ink/40"
        />
        <p id="players-count" className="mt-1 text-sm text-paper/75">
          {names.length} {names.length === 1 ? "player" : "players"}
        </p>
      </div>

      <ChoiceChips
        legend="Number of teams"
        name="teams"
        options={teamCounts}
        value={teamCount}
        onChange={setTeamCount}
        className="mt-8"
      />

      <RollButton onClick={makeTeams} disabled={rolling || !enough} className="mt-10">
        Make teams
      </RollButton>
      {enough ? (
        <KeyHint>Or press Space</KeyHint>
      ) : (
        <p className="mt-5 max-w-sm text-center text-paper/85">
          {names.length === 0
            ? "Add your players above to make teams."
            : `Add at least ${teamCount} players to make ${teamCount} teams.`}
        </p>
      )}
      <p aria-live="polite" className="sr-only">
        {teams
          ? teams.map((team, i) => `Team ${i + 1}: ${team.join(", ")}.`).join(" ")
          : ""}
      </p>

      {shown && (
        <section aria-labelledby="teams-heading" className="mt-14 w-full">
          <h2 id="teams-heading" className="sr-only">
            Teams
          </h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((team, i) => (
              <li
                key={`${rolls}-${i}`}
                data-rolling={rolling}
                className={`piece rounded-3xl p-6 [--depth:6px] ${teamColors[i]} ${rolling ? "" : "land"}`}
              >
                <h3 className="font-display text-xl">Team {i + 1}</h3>
                <ul className="mt-3 space-y-1 text-lg font-semibold">
                  {team.map((name, j) => (
                    <li key={j}>{name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
