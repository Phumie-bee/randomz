import type { ComponentProps, ReactNode } from "react";

export function RollButton({ className = "", ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`press min-w-60 rounded-full px-10 py-4 font-display text-xl ${className}`}
      {...props}
    />
  );
}

export function KeyHint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 hidden text-sm text-paper/70 pointer-fine:block">
      {children}
    </p>
  );
}

type RoundPanelProps<T> = {
  history: readonly T[];
  emptyText: string;
  onReset: () => void;
  renderItem: (item: T) => ReactNode;
  children?: ReactNode;
};

/** History for the current round, plus the page's options underneath. */
export function RoundPanel<T>({ history, emptyText, onReset, renderItem, children }: RoundPanelProps<T>) {
  return (
    <section
      aria-labelledby="round-heading"
      className="mt-14 w-full max-w-xl rounded-[1.75rem] bg-table-deep p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="round-heading" className="font-display text-lg">
          This round{" "}
          <span className="font-sans text-base font-medium text-paper/70">
            ({history.length})
          </span>
        </h2>
        <button
          type="button"
          onClick={onReset}
          disabled={history.length === 0}
          className="rounded-full border-2 border-paper/40 px-4 py-1.5 text-sm font-semibold hover:border-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start new round
        </button>
      </div>

      {history.length === 0 ? (
        <p className="mt-4 text-paper/70">{emptyText}</p>
      ) : (
        <ol className="mt-4 flex flex-wrap gap-2">
          {/* History only ever grows at the end, so index keys stay stable. */}
          {history.map((item, i) => (
            <li key={i}>{renderItem(item)}</li>
          ))}
        </ol>
      )}

      {children && (
        <div className="mt-6 flex flex-col gap-3 border-t-2 border-paper/15 pt-6">{children}</div>
      )}
    </section>
  );
}

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

export function Toggle({ checked, onChange, children }: ToggleProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-butter"
      />
      <span>{children}</span>
    </label>
  );
}
