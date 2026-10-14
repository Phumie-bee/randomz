"use client";

import { useEffect, useId, useRef, type ComponentProps, type ReactNode } from "react";
import { SettingsIcon } from "./icons";

export function RollButton({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`press w-full rounded-full px-8 py-4 font-display text-xl ${className}`}
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
};

/** This round's picks as a sideways-scrolling strip, newest at the end. */
export function RoundStrip<T>({ history, emptyText, onReset, renderItem }: RoundStripProps<T>) {
  const headingId = useId();
  const listRef = useRef<HTMLOListElement>(null);

  // Keep the newest pick in view.
  useEffect(() => {
    const list = listRef.current;
    list?.scrollTo({ left: list.scrollWidth, behavior: "smooth" });
  }, [history.length]);

  return (
    <section aria-labelledby={headingId}>
      <div className="flex items-center justify-between">
        <h2 id={headingId} className="text-sm font-semibold text-paper/75">
          This round ({history.length})
        </h2>
        <button
          type="button"
          onClick={onReset}
          disabled={history.length === 0}
          className="-mr-2 rounded-full px-2 py-1 text-sm font-semibold text-butter disabled:text-paper/35"
        >
          New round
        </button>
      </div>
      {history.length === 0 ? (
        <p className="flex h-12 items-center text-sm text-paper/60">{emptyText}</p>
      ) : (
        <ol
          ref={listRef}
          className="-mx-4 flex h-12 items-center gap-2 overflow-x-auto px-4 scrollbar-none"
        >
          {/* History only ever grows at the end, so index keys stay stable. */}
          {history.map((item, i) => (
            <li key={i} className="shrink-0">
              {renderItem(item)}
            </li>
          ))}
        </ol>
      )}
    </section>
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
