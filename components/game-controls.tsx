"use client";

import { useEffect, useId, useRef, type ComponentProps, type ReactNode } from "react";
import { SettingsIcon } from "./icons";

export function RollButton({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`press w-full rounded-full px-8 py-4 font-display text-xl tablet:mx-auto tablet:max-w-md desktop:w-auto desktop:min-w-60 desktop:px-10 ${className}`}
      {...props}
    />
  );
}

/** Small note under the roll button: a keyboard hint, or why the button is off. */
export function RollNote({ children, keyboardOnly = false }: { children: ReactNode; keyboardOnly?: boolean }) {
  return (
    <p
      className={`-mt-1 text-center text-sm text-paper/75 ${keyboardOnly ? "hidden pointer-fine:block" : ""}`}
    >
      {children}
    </p>
  );
}

export function SettingsButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" aria-label="Settings" onClick={onClick} className="icon-button">
      <SettingsIcon />
    </button>
  );
}

type RoundStripProps<T> = {
  history: readonly T[];
  emptyText: string;
  onReset: () => void;
  renderItem: (item: T) => ReactNode;
  /** Settings shown inside the panel on computers. */
  options?: ReactNode;
};

/**
 * This round's picks. Phones and tablets: a sideways-scrolling strip, newest
 * at the end. Computers: a panel where picks wrap, with settings underneath.
 */
export function RoundStrip<T>({ history, emptyText, onReset, renderItem, options }: RoundStripProps<T>) {
  const headingId = useId();
  const listRef = useRef<HTMLOListElement>(null);

  // Keep the newest pick in view.
  useEffect(() => {
    const list = listRef.current;
    list?.scrollTo({ left: list.scrollWidth, behavior: "smooth" });
  }, [history.length]);

  return (
    <section
      aria-labelledby={headingId}
      className="desktop:rounded-[1.75rem] desktop:bg-table-deep desktop:p-8"
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id={headingId}
          className="text-sm font-semibold text-paper/75 desktop:font-display desktop:text-lg desktop:text-paper"
        >
          This round ({history.length})
        </h2>
        <button
          type="button"
          onClick={onReset}
          disabled={history.length === 0}
          className="-mr-2 rounded-full px-2 py-1 text-sm font-semibold text-butter disabled:text-paper/35 desktop:mr-0 desktop:border-2 desktop:border-paper/40 desktop:px-4 desktop:py-1.5 desktop:text-paper desktop:hover:border-paper desktop:disabled:border-paper/20"
        >
          New round
        </button>
      </div>
      {history.length === 0 ? (
        <p className="flex h-12 items-center text-sm text-paper/60 desktop:mt-2 desktop:h-auto desktop:text-base">
          {emptyText}
        </p>
      ) : (
        <ol
          ref={listRef}
          className="-mx-4 flex h-12 items-center gap-2 overflow-x-auto px-4 scrollbar-none desktop:mx-0 desktop:mt-4 desktop:h-auto desktop:flex-wrap desktop:overflow-visible desktop:px-0"
        >
          {/* History only ever grows at the end, so index keys stay stable. */}
          {history.map((item, i) => (
            <li key={i} className="shrink-0">
              {renderItem(item)}
            </li>
          ))}
        </ol>
      )}
      {options && (
        <div className="mt-6 hidden border-t-2 border-paper/15 pt-2 desktop:block">{options}</div>
      )}
    </section>
  );
}

/** Numbered rules, folded away until someone opens them. */
export function HowToPlay({ steps }: { steps: readonly ReactNode[] }) {
  return (
    <details className="group border-t border-paper/10 py-3.5">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
        How to play
        <span aria-hidden className="text-paper/60 transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-paper/85 marker:text-paper/60">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </details>
  );
}

type PlayersFieldProps = {
  value: string;
  onChange: (value: string) => void;
  hint: string;
};

/** A box for player names, one per line or separated by commas. */
export function PlayersField({ value, onChange, hint }: PlayersFieldProps) {
  const id = useId();

  return (
    <div className="py-3.5">
      <label htmlFor={id} className="block font-semibold">
        Players <span className="font-normal text-paper/60">(optional)</span>
      </label>
      <p id={`${id}-hint`} className="mt-0.5 text-sm text-paper/70">
        {hint}
      </p>
      <textarea
        id={id}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={`${id}-hint`}
        placeholder={"Alex\nSam\nJordan"}
        className="mt-2 w-full resize-none rounded-2xl bg-paper p-3.5 text-base text-ink placeholder:text-ink/40"
      />
    </div>
  );
}

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

/** A settings row with an on/off switch. */
export function Toggle({ checked, onChange, children }: ToggleProps) {
  return (
    <label className="relative flex cursor-pointer items-center justify-between gap-4 py-3.5">
      <span className="text-[1.05rem]">{children}</span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="relative h-7 w-12 shrink-0 rounded-full bg-paper/25 transition-colors peer-checked:bg-butter peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-butter after:absolute after:top-1 after:left-1 after:size-5 after:rounded-full after:bg-paper after:shadow after:transition-transform peer-checked:after:translate-x-5"
      />
    </label>
  );
}
