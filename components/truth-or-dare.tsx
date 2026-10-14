"use client";

import { useState } from "react";
import { parseNames } from "@/lib/names";
import { randomItem } from "@/lib/random";
import { prompts, type Level, type PromptType } from "@/lib/truth-or-dare";
import { ChoiceChips } from "./choice-chips";
import { HowToPlay, PlayersField, RollButton } from "./game-controls";
import { GameScreen } from "./game-screen";
import { Sheet } from "./sheet";

const levels: { value: Level; label: string }[] = [
  { value: "mild", label: "Mild" },
  { value: "spicy", label: "Spicy" },
  { value: "adult", label: "18+" },
];

const steps = [
  "Sit in a circle. Add your names under Players if you want help keeping track of turns.",
  "On your turn, pick Truth or Dare. Answer the truth honestly, or do the dare.",
  "Anyone can pass. Tap Swap for a different one.",
  "When you're done, tap Next to pass the turn on.",
];

const textButton =
  "mx-auto -mt-1 rounded-full px-3 py-1 text-sm font-semibold text-butter hover:underline";

type Card = { type: PromptType; text: string };

export function TruthOrDare() {
  const [level, setLevel] = useState<Level>("mild");
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [playersText, setPlayersText] = useState("");
  const [turn, setTurn] = useState(0);
  const [card, setCard] = useState<Card | null>(null);
  const [draws, setDraws] = useState(0);
  const [seen, setSeen] = useState<ReadonlySet<string>>(() => new Set());

  const players = parseNames(playersText);
  const player = players.length > 0 ? players[turn % players.length] : null;
  const nextPlayer = players.length > 0 ? players[(turn + 1) % players.length] : null;

  // 18+ needs everyone to confirm their age first.
  function changeLevel(next: Level) {
    if (next === "adult" && !adultConfirmed) {
      setConfirmOpen(true);
      return;
    }
    setLevel(next);
  }

  function confirmAdult() {
    setAdultConfirmed(true);
    setLevel("adult");
    setConfirmOpen(false);
  }

  // Draws one this group hasn't seen yet; once all are seen, they come round again.
  function draw(type: PromptType) {
    const pool = prompts[level][type];
    let unseen = pool.filter((p) => !seen.has(p) && p !== card?.text);
    let nextSeen = new Set(seen);
    if (unseen.length === 0) {
      pool.forEach((p) => nextSeen.delete(p));
      unseen = pool.filter((p) => p !== card?.text);
    }
    const text = randomItem(unseen);
    nextSeen = nextSeen.add(text);
    setSeen(nextSeen);
    setCard({ type, text });
    setDraws((n) => n + 1);
    navigator.vibrate?.(15);
  }

  function next() {
    setCard(null);
    setDraws((n) => n + 1);
    setTurn((t) => t + 1);
  }

  const settings = (
    <>
      <PlayersField
        value={playersText}
        onChange={setPlayersText}
        hint="Add names to keep track of whose turn it is."
      />
      <HowToPlay steps={steps} />
    </>
  );

  const cardColor = card ? (card.type === "truth" ? "bg-lilac" : "bg-tangerine") : "bg-paper";
  const cardLabel = card
    ? `${card.type === "truth" ? "Truth" : "Dare"}${player ? ` for ${player}` : ""}`
    : player
      ? `${player}'s turn`
      : null;

  return (
    <>
      <GameScreen
        title="Truth or Dare"
        appTitle="Truth or Dare"
        controls={
          <ChoiceChips
            legend="Level"
            name="level"
            options={levels}
            value={level}
            onChange={changeLevel}
            variant="segmented"
          />
        }
        options={settings}
        action={
          card === null ? (
            <>
              <div className="grid grid-cols-2 gap-3 tablet:mx-auto tablet:w-full tablet:max-w-md desktop:flex desktop:justify-center desktop:gap-4">
                <RollButton
                  onClick={() => draw("truth")}
                  className="[--press-bg:var(--color-lilac)] desktop:min-w-44"
                >
                  Truth
                </RollButton>
                <RollButton
                  onClick={() => draw("dare")}
                  className="[--press-bg:var(--color-tangerine)] desktop:min-w-44"
                >
                  Dare
                </RollButton>
              </div>
              <button
                type="button"
                onClick={() => draw(randomItem(["truth", "dare"] as const))}
                className={textButton}
              >
                Pick for me
              </button>
            </>
          ) : (
            <>
              <RollButton onClick={next}>
                {nextPlayer ? `Next: ${nextPlayer}` : "Next turn"}
              </RollButton>
              <button type="button" onClick={() => draw(card.type)} className={textButton}>
                Swap for another {card.type}
              </button>
            </>
          )
        }
      >
        <div
          key={draws}
          className={`piece land relative grid min-h-[min(40dvh,17rem)] w-full place-items-center rounded-[1.75rem] px-6 pt-14 pb-12 text-center tablet:min-h-[min(40dvh,22rem)] tablet:px-10 desktop:min-h-64 desktop:max-w-136 desktop:px-10 ${cardColor}`}
        >
          {cardLabel && (
            <span className="absolute top-4 left-5 text-sm font-semibold text-ink/70">
              {cardLabel}
            </span>
          )}
          {card ? (
            <p className="text-[clamp(1.35rem,5.5vw,1.9rem)] leading-snug font-bold text-balance tablet:text-3xl desktop:text-3xl">
              {card.text}
            </p>
          ) : (
            <p className="font-display text-[clamp(2rem,9vw,3rem)] leading-[1.05] text-balance tablet:text-5xl desktop:text-5xl">
              {player ? `${player}, truth or dare?` : "Truth or dare?"}
            </p>
          )}
        </div>
        <p aria-live="polite" className="sr-only">
          {card ? `${cardLabel}: ${card.text}` : ""}
        </p>
      </GameScreen>

      <Sheet
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Adults only"
        closeLabel="Cancel"
      >
        <p className="text-paper/85">
          The 18+ level has flirty questions and dares about dating and relationships. Only turn it
          on if everyone playing is 18 or older.
        </p>
        <button
          type="button"
          onClick={confirmAdult}
          className="press mt-5 w-full rounded-full px-6 py-3.5 font-display text-lg"
        >
          Everyone here is 18+
        </button>
      </Sheet>
    </>
  );
}
