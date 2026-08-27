import { useMemo } from "react";

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  hue: string;
  drift: number;
  rotate: number;
};

const HUES = [
  "var(--petal-marigold)",
  "var(--petal-rose)",
  "var(--petal-leaf)",
  "var(--petal-gold)",
  "var(--petal-blush)",
];

/**
 * Decorative falling flower petals / leaves. Purely visual, non-interactive.
 */
export function PetalFall({ count = 26 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        delay: (i % 13) * 1.1,
        duration: 11 + ((i * 7) % 9),
        size: 9 + ((i * 5) % 10),
        hue: HUES[i % HUES.length],
        drift: ((i % 5) - 2) * 40,
        rotate: (i * 47) % 360,
      })),
    [count],
  );

  return (
    <div className="petal-field" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.5,
            background: p.hue,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}
