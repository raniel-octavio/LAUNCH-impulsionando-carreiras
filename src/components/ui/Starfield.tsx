const STARS = [
  { x: 8, y: 12, s: 1.5, d: 0 }, { x: 15, y: 28, s: 1, d: 0.4 },
  { x: 22, y: 8, s: 2, d: 1.1 }, { x: 30, y: 40, s: 1, d: 0.2 },
  { x: 38, y: 18, s: 1.5, d: 1.6 }, { x: 45, y: 32, s: 1, d: 0.8 },
  { x: 52, y: 10, s: 2, d: 0.3 }, { x: 60, y: 24, s: 1, d: 1.4 },
  { x: 68, y: 6, s: 1.5, d: 0.6 }, { x: 75, y: 36, s: 1, d: 1.9 },
  { x: 82, y: 14, s: 2, d: 0.1 }, { x: 90, y: 30, s: 1, d: 1.2 },
  { x: 5, y: 55, s: 1, d: 0.9 }, { x: 18, y: 62, s: 1.5, d: 0.5 },
  { x: 33, y: 70, s: 1, d: 1.7 }, { x: 48, y: 58, s: 2, d: 0.2 },
  { x: 63, y: 66, s: 1, d: 1.3 }, { x: 78, y: 52, s: 1.5, d: 0.7 },
  { x: 92, y: 64, s: 1, d: 1.5 }, { x: 12, y: 82, s: 1.5, d: 0.4 },
  { x: 27, y: 88, s: 1, d: 1.0 }, { x: 42, y: 80, s: 2, d: 1.8 },
  { x: 57, y: 90, s: 1, d: 0.3 }, { x: 72, y: 78, s: 1.5, d: 1.1 },
  { x: 87, y: 86, s: 1, d: 0.6 }, { x: 95, y: 45, s: 1, d: 1.4 },
];

export function Starfield({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white lp-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.s}px`,
            height: `${star.s}px`,
            animationDelay: `${star.d}s`,
            boxShadow: `0 0 ${star.s * 2}px rgba(255,255,255,0.8)`,
          }}
        />
      ))}
    </div>
  );
}
