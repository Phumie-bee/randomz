type Option<T> = { value: T; label: string };

type Props<T extends string | number> = {
  legend: string;
  name: string;
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/** A row of pill-shaped radio buttons. */
export function ChoiceChips<T extends string | number>({
  legend,
  name,
  options,
  value,
  onChange,
  className = "",
}: Props<T>) {
  return (
    <fieldset className={`w-full max-w-xl ${className}`}>
      <legend className="mb-3 w-full text-center font-semibold text-paper/85">{legend}</legend>
      <div className="flex flex-wrap justify-center gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="min-w-11 cursor-pointer rounded-full border-2 border-paper/40 px-4 py-1.5 text-center font-semibold hover:border-paper has-checked:border-paper has-checked:bg-paper has-checked:text-ink has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-butter"
          >
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
