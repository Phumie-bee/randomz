import { ImageResponse } from "next/og";

// Same values as --color-table, --color-butter and --color-ink in globals.css.
const TABLE = "#4a1a63";
const BUTTER = "#ffd447";
const INK = "#2a0e38";

// The five on a die, row by row.
const PIPS = [
  [true, false, true],
  [false, true, false],
  [true, false, true],
];

/** The Randomz app icon: a yellow game tile showing five pips, on plum. */
export function appIcon(size: number, { tileScale = 0.58 } = {}) {
  const tile = Math.round(size * tileScale);
  const pip = Math.round(tile * 0.17);
  const edge = Math.max(1, Math.round(tile * 0.07));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: TABLE,
        }}
      >
        <div
          style={{
            width: tile,
            height: tile,
            marginTop: -edge,
            borderRadius: tile * 0.22,
            background: BUTTER,
            boxShadow: `0 ${edge}px 0 ${INK}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: tile * 0.16,
          }}
        >
          {PIPS.map((row, r) => (
            <div key={r} style={{ display: "flex", justifyContent: "space-between" }}>
              {row.map((on, c) => (
                <div
                  key={c}
                  style={{
                    width: pip,
                    height: pip,
                    borderRadius: pip,
                    background: on ? INK : "transparent",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
