import { useEffect, useRef, useState } from "react";

/**
 * Scratch-off card: guests rub (mouse or finger) to uncover the wedding date.
 * A visible "Reveal it for me" button keeps it accessible for everyone.
 */
export function ScratchReveal({
  label = "Scratch here",
  value,
  caption,
}: {
  label?: string;
  value: string;
  caption?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#b8912f");
    grad.addColorStop(0.45, "#f0d68b");
    grad.addColorStop(0.7, "#c39c3c");
    grad.addColorStop(1, "#8f6a1c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.font = "500 14px Jost, system-ui, sans-serif";
    ctx.fillStyle = "rgba(90,55,10,0.75)";
    ctx.textAlign = "center";
    ctx.fillText(label.toUpperCase(), rect.width / 2, rect.height / 2 + 5);
  }, [label, revealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 22, 0, Math.PI * 2);
    ctx.fill();

    // Reveal fully once enough has been cleared.
    const dpr = window.devicePixelRatio || 1;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 4 * 40) {
      if (data[i] === 0) clear++;
    }
    const total = data.length / (4 * 40);
    if (clear / total > 0.42) setRevealed(true);
    void dpr;
  };

  return (
    <div className="mx-auto w-full max-w-sm text-center">
      <div className="scratch-frame">
        <div className="scratch-value">
          <span className="block font-display text-3xl text-primary sm:text-4xl">{value}</span>
          {caption ? (
            <span className="mt-1 block text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {caption}
            </span>
          ) : null}
        </div>
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas"
            onMouseDown={(e) => {
              drawing.current = true;
              scratch(e.clientX, e.clientY);
            }}
            onMouseMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
            onMouseUp={() => (drawing.current = false)}
            onMouseLeave={() => (drawing.current = false)}
            onTouchStart={(e) => {
              const t = e.touches[0];
              if (t) scratch(t.clientX, t.clientY);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              const t = e.touches[0];
              if (t) scratch(t.clientX, t.clientY);
            }}
          />
        )}
      </div>
      {!revealed ? (
        <button type="button" className="btn-ghost-gold mt-4" onClick={() => setRevealed(true)}>
          Reveal it for me
        </button>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">Save the date — we can’t wait!</p>
      )}
    </div>
  );
}
