type Option<T> = { value: T; label: string };

type Props<T extends string | number> = {
  legend: string;
  name: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  /** "scroll" for a sideways-scrolling row of pills, "segmented" for equal-width segments. */
  variant?: "scroll" | "segmented";
};

// `relative` keeps each visually hidden radio inside its chip, so focusing it
// can't push the page sideways.
export const chipClass =
  "relative shrink-0 cursor-pointer rounded-full border-2 border-paper/30 px-4 py-1.5 font-semibold whitespace-nowrap active:scale-95 has-checked:border-paper has-checked:bg-paper has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-butter aria-pressed:border-paper aria-pressed:bg-paper aria-pressed:text-ink";

const segmentClass =
  "relative cursor-pointer rounded-full py-2 text-center font-semibold text-paper/75 has-checked:bg-paper has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-butter";

/** A set of radio buttons styled as pills or a segmented control. */
export function ChoiceChips<T extends string | number>({
  legend,
  name,
  options,
  value,
  onChange,
  variant = "scroll",
}: Props<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-semibold text-paper/75">{legend}</legend>
      <div
        className={
          variant === "scroll"
            ? "-mx-4 flex gap-2 overflow-x-auto px-4 py-1 scrollbar-none"
            : "grid auto-cols-fr grid-flow-col rounded-full bg-table-deep p-1"
        }
      >
        {options.map((option) => (
          <label key={option.value} className={variant === "scroll" ? chipClass : segmentClass}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
