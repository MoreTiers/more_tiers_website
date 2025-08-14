'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  value?: number;           // default score
  onChange?: (v: number) => void;
  step?: number;            // default 10
  min?: number;             // default 800
  max?: number;             // default 1600
  label?: string;           // accessible label
  className?: string;
};

export default function SatGoalDial({
  value = 1300,
  onChange,
  step = 10,
  min = 800,
  max = 1600,
  label = 'Desired SAT score',
  className = '',
}: Props) {
  const [score, setScore] = useState<number>(snap(value));
  const knobRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  function snap(v: number) {
    // snap to nearest `step`, clamp to [min,max]
    const clamped = Math.max(min, Math.min(max, v));
    return Math.round(clamped / step) * step;
  }

  // Angle mapping: -135° .. +135° maps to min..max (270° sweep)
  const angleFromValue = (v: number) => {
    const pct = (v - min) / (max - min); // 0..1
    return -135 + pct * 270;             // deg
  };
  const valueFromAngle = (deg: number) => {
    const clampedDeg = Math.max(-135, Math.min(135, deg));
    const pct = (clampedDeg + 135) / 270;           // 0..1
    const raw = min + pct * (max - min);
    return snap(raw);
  };

  const setScoreAndEmit = (v: number) => {
    const s = snap(v);
    setScore(s);
    onChange?.(s);
  };

  const handlePointer = useCallback((clientX: number, clientY: number) => {
    const el = knobRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    // We want -135..135; calculate shortest equivalent
    let snapped = deg;
    // Normalize to -180..180
    if (snapped > 180) snapped -= 360;
    if (snapped < -180) snapped += 360;
    // Clamp to usable arc
    const usable = Math.max(-135, Math.min(135, snapped));
    const v = valueFromAngle(usable);
    setScoreAndEmit(v);
  }, []);

  useEffect(() => {
    const up = () => (draggingRef.current = false);
    const move = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      handlePointer(e.clientX, e.clientY);
    };
    window.addEventListener('pointerup', up);
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointermove', move as any);
    };
  }, [handlePointer]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    draggingRef.current = true;
    handlePointer(e.clientX, e.clientY);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const big = e.shiftKey ? 50 : 10;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setScoreAndEmit(score + (step || 10));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setScoreAndEmit(score - (step || 10));
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      setScoreAndEmit(score + big);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      setScoreAndEmit(score - big);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setScoreAndEmit(min);
    } else if (e.key === 'End') {
      e.preventDefault();
      setScoreAndEmit(max);
    }
  };

  const angle = angleFromValue(score);
  const size = 230;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const center = size / 2;

  // Arc for the full track (270°) and the progress arc up to current value
  const toPolar = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [center + r * Math.cos(rad), center + r * Math.sin(rad)];
  };
  const arcPath = (startDeg: number, endDeg: number) => {
    const [sx, sy] = toPolar(startDeg);
    const [ex, ey] = toPolar(endDeg);
    const large = endDeg - startDeg <= 180 ? 0 : 1;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };
  const startDeg = -135;
  const endDeg = 135;
  const progressDeg = Math.max(startDeg, Math.min(endDeg, angle));
  // add near the other helpers
  const endPoint = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [center + r * Math.cos(rad), center + r * Math.sin(rad)] as const;
};

  return (
    <div className={`w-full max-w-sm ${className}`}>
      <div
        ref={knobRef}
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={score}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="relative select-none outline-none"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }} className="block">
          {/* Track */}
          <path
            d={arcPath(startDeg, endDeg)}
            stroke="rgba(10,77,140,0.20)" /* brand-600 at 20% */
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />
          {/* Progress */}
          <path
            d={arcPath(startDeg, progressDeg)}
            stroke="#0E6BA8" /* brand-500 */
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />
          {/* Knob */}
        
            {/* Knob centered exactly where blue meets gray */}
            {(() => {
            const [kx, ky] = endPoint(progressDeg);   // use the progress arc endpoint
            const outer = stroke;                      // gold ring size
            const inner = Math.max(6, stroke - 6);     // white center

            return (
                <>
                <circle cx={kx} cy={ky} r={outer} fill="#F5B700" />
                <circle cx={kx} cy={ky} r={inner} fill="white" />
                {/* optional subtle outline for crispness on any bg */}
                <circle cx={kx} cy={ky} r={inner} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
                </>
            );
            })()}

        </svg>

        {/* Readout */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-sm text-slate-600">Desired SAT</div>
            <div className="text-4xl font-semibold text-slate-900">{score}</div>
            <div className="mt-2 text-xs text-slate-500">
              Use drag, touch, or <span className="font-medium">↑/↓</span> keys 
            </div>
          </div>
        </div>
      </div>

      {/* Accessible fallback control for screen readers & precision entry */}
      <label className="mt-4 block text-sm text-slate-700">
        {label}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={score}
          onChange={(e) => setScoreAndEmit(Number(e.target.value))}
          className="mt-2 w-full accent-brand-600"
        />
      </label>
    </div>
  );
}
