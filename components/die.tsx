// Pip positions on a 3×3 grid, numbered left to right, top to bottom.
const PIPS: Record<number, number[]> = {
  1: [4],
  2: [2, 6],
  3: [2, 4, 6],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

type Props = {
  value: number | null;
  rolling?: boolean;
  className?: string;
};

export function Die({ value, rolling = false, className = "" }: Props) {
  return (
    <span
      data-rolling={rolling}
      className={`piece @container grid aspect-square rounded-[22%] bg-paper [--depth:6px] ${className}`}
    >
      {value === null ? (
        <span className="place-self-center font-display text-[50cqw] leading-none">?</span>
      ) : (
        <span className="grid grid-cols-3 grid-rows-3 p-[16%] pb-[20%]">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className={`m-auto size-[68%] rounded-full ${PIPS[value].includes(i) ? "bg-ink" : ""}`}
            />
          ))}
        </span>
      )}
    </span>
  );
}
