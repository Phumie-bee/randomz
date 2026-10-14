"use client";

import { useMemo, useState } from "react";
import { categories, type Difficulty } from "@/lib/concentration";
import { tempos, useBeat, type Tempo } from "@/lib/use-beat";
import { useRoll } from "@/lib/use-roll";
import { ChoiceChips } from "./choice-chips";
import { HowToPlay, RollButton, RollNote, RoundStrip, Toggle } from "./game-controls";
import { GameScreen } from "./game-screen";

type Choice = Difficulty | "any";

const difficulties: { value: Choice; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const tempoOptions: { value: Tempo; label: string }[] = [
  { value: "slow", label: "Slow" },
  { value: "normal", label: "Normal" },
  { value: "fast", label: "Fast" },
];

const steps = [
  "Sit in a circle and clap a steady beat together. Tap Start beat if you want help keeping time.",
  <>
    Chant together: <em>“Concentration, sixty-four. No repeats or hesitation. I’ll go first, you
    go second. Category is…”</em> and read out the category.
  </>,
  "Go round the circle, each naming something in the category on the beat.",
  "Repeat an answer, hesitate or miss the beat and you're out. The last player left wins.",
];

export function Concentration() {
  const [difficulty, setDifficulty] = useState<Choice>("any");
  const [noRepeats, setNoRepeats] = useState(true);
  const [tempo, setTempo] = useState<Tempo>("normal");
  const [sound, setSound] = useState(true);

  const pool = useMemo<string[]>(
    () =>
      difficulty === "any" ? Object.values(categories).flat() : [...categories[difficulty]],
    [difficulty],
  );
  const { shown, result, rolling, rolls, history, available, roll, reset } = useRoll(pool, {
    noRepeats,
  });
  const { beat, running, start, stop } = useBeat({ bpm: tempos[tempo], sound });
  const usedUp = available.length === 0;

  const settings = (
    <>
      <div className="divide-y divide-paper/10">
        <Toggle checked={noRepeats} onChange={setNoRepeats}>
          No repeat categories this round
        </Toggle>
        <Toggle checked={sound} onChange={setSound}>
          Clap sound
        </Toggle>
      </div>
      <div className="border-t border-paper/10 py-3.5">
        <ChoiceChips
          legend="Beat speed"
          name="tempo"
          options={tempoOptions}
          value={tempo}
          onChange={setTempo}
          variant="segmented"
        />
      </div>
      <HowToPlay steps={steps} />
    </>
  );

  return (
    <GameScreen
      title="Concentration"
      appTitle="Concentration"
      controls={
        <ChoiceChips
          legend="Difficulty"
          name="difficulty"
          options={difficulties}
          value={difficulty}
          onChange={setDifficulty}
        />
      }
      options={settings}
      round={(panelOptions) => (
        <RoundStrip
          history={history}
          emptyText="Categories you play show up here."
          onReset={reset}
          options={panelOptions}
          renderItem={(category) => (
            <span className="block rounded-full bg-sky px-3 py-1.5 font-semibold whitespace-nowrap text-ink">
              {category}
            </span>
          )}
        />
      )}
      action={
        <>
          <RollButton onClick={roll} disabled={rolling || usedUp}>
            New category
          </RollButton>
          {usedUp ? (
            <RollNote>
              Every category here has been played. Pick another difficulty or start a new round.
            </RollNote>
          ) : (
            <RollNote keyboardOnly>Or press Space</RollNote>
          )}
        </>
      }
    >
      <div className="flex w-full flex-col items-center">
        <div
          data-rolling={rolling}
          className="piece relative grid min-h-[min(30dvh,13rem)] w-full place-items-center rounded-[1.75rem] bg-sky px-5 pt-12 pb-10 text-center tablet:min-h-[min(34dvh,18rem)] desktop:min-h-56 desktop:max-w-136"
        >
          <span className="absolute top-4 left-5 text-sm font-semibold text-ink/70">
            Category is…
          </span>
          <span
            key={rolls}
            aria-hidden
            className={`font-display text-[clamp(1.75rem,9vw,2.75rem)] leading-[1.05] text-balance tablet:text-5xl desktop:text-5xl ${rolling ? "" : "land"}`}
          >
            {shown ?? "?"}
          </span>
        </div>
        <p aria-live="polite" className="sr-only">
          {result ? `Category ${rolls}: ${result}` : ""}
        </p>

        {/* The beat: four lights that step along in time, with an optional clap. */}
        <div className="mt-8 flex items-center gap-5">
          <div aria-hidden className="flex gap-2.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`size-3.5 rounded-full transition-transform duration-75 ${
                  beat === i ? "scale-150 bg-butter" : "bg-paper/25"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={running ? stop : start}
            aria-pressed={running}
            className="rounded-full border-2 border-paper/40 px-4 py-1.5 font-semibold hover:border-paper aria-pressed:border-butter aria-pressed:text-butter"
          >
            {running ? "Stop beat" : "Start beat"}
          </button>
        </div>
      </div>
    </GameScreen>
  );
}
