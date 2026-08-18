import React, { useEffect, useRef, useState } from "react";
import { sounds } from "../utils/audio";

interface WebShot {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  branches: Array<{
    midX: number;
    midY: number;
    endX: number;
    endY: number;
    subBranches?: Array<{ x: number; y: number }>;
  }>;
  createdAt: number;
  opacity: number;
}

export const SpiderCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [webShots, setWebShots] = useState<WebShot[]>([]);
  const shotCounter = useRef(0);

  useEffect(() => {
    // Detect touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }

    // Use provided web image as the native cursor when available
      try {
      (document.body.style as any).cursor = "url('/assets/webpointer.svg') 16 16, auto";
    } catch (e) {
      // ignore if browser blocks
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      
      setTrail((prev) => {
        const next = [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, 5)];
        return next;
      });

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest("button, a, input, select, textarea, [role='button'], .clickable");
        setIsPointer(!!clickable);
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Trigger Web Shoot effect
      sounds.playThwip();

      const startX = e.clientX;
      const startY = e.clientY;
      
      // Random direction and distance for a single web line
      const angle = Math.random() * Math.PI * 2;
      const distance = 160 + Math.random() * 220;
      const targetX = startX + Math.cos(angle) * distance;
      const targetY = startY + Math.sin(angle) * distance;

      // Single organic curved line
      const branchAngle = angle + (Math.random() - 0.5) * 0.6;
      const branchDist = distance * (0.75 + Math.random() * 0.25);
      const endX = startX + Math.cos(branchAngle) * branchDist;
      const endY = startY + Math.sin(branchAngle) * branchDist;
      const midDist = branchDist * 0.45;
      const curveOffset = (Math.random() - 0.5) * 30;
      const midX = startX + Math.cos(branchAngle) * midDist - Math.sin(branchAngle) * curveOffset;
      const midY = startY + Math.sin(branchAngle) * midDist + Math.cos(branchAngle) * curveOffset;

      const branches = [{ midX, midY, endX, endY, subBranches: [] }];

      shotCounter.current += 1;
      const newShot: WebShot = {
        id: shotCounter.current,
        startX,
        startY,
        targetX,
        targetY,
        branches,
        createdAt: Date.now(),
        opacity: 1
      };

      setWebShots((prev) => [...prev.slice(-3), newShot]);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      try {
        (document.body.style as any).cursor = "";
      } catch (e) {}
    };
  }, []);

  // Web shot fade & cleanup tick
  useEffect(() => {
    if (webShots.length === 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setWebShots((prev) =>
        prev
          .map((shot) => {
            const age = now - shot.createdAt;
            const lifespan = 650; // ms
            if (age > lifespan) return null;
            return {
              ...shot,
              opacity: Math.max(0, 1 - age / lifespan)
            };
          })
          .filter(Boolean) as WebShot[]
      );
    }, 30);

    return () => clearInterval(interval);
  }, [webShots.length]);

  if (isTouchDevice) {
    // Only render canvas web shots on touch, hide custom cursor
    return (
      <svg className="fixed inset-0 pointer-events-none z-50 w-full h-full">
        {webShots.map((shot) => (
          <g key={shot.id} opacity={shot.opacity}>
            {shot.branches.map((b, i) => (
              <React.Fragment key={i}>
                <path
                  d={`M${shot.startX} ${shot.startY} Q${b.midX} ${b.midY} ${b.endX} ${b.endY}`}
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 4px rgba(255,255,255,0.8))"
                />
              </React.Fragment>
            ))}
          </g>
        ))}
      </svg>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* SVG Canvas for Organic Web Shoots & Connecting Trailing Web */}
      <svg className="w-full h-full absolute inset-0">
        <defs>
          <filter id="webGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Trailing Web Thread */}
        {trail.length > 1 && (
          <path
            d={`M${trail[0].x} ${trail[0].y} ` + trail.slice(1).map((p) => `L${p.x} ${p.y}`).join(" ")}
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            fill="none"
          />
        )}

        {/* Animated Click Web-Shooter Strands */}
        {webShots.map((shot) => (
          <g key={shot.id} opacity={shot.opacity} filter="url(#webGlow)">
            {/* Core Web Burst Center */}
            <circle cx={shot.startX} cy={shot.startY} r="3" fill="#ffffff" />
            
            {shot.branches.map((b, i) => (
              <React.Fragment key={i}>
                {/* Main Curved Web Spoke */}
                <path
                  d={`M${shot.startX} ${shot.startY} Q${b.midX} ${b.midY} ${b.endX} ${b.endY}`}
                  stroke="#ffffff"
                  strokeWidth={i === 0 ? "2.6" : "1.8"}
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Lateral Sub-threads / Web Mesh */}
                {b.subBranches?.map((sub, j) => (
                  <line
                    key={j}
                    x1={b.midX}
                    y1={b.midY}
                    x2={sub.x}
                    y2={sub.y}
                    stroke="rgba(255, 255, 255, 0.75)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                ))}
              </React.Fragment>
            ))}
          </g>
        ))}
      </svg>

      {/* Spider-Web Reticle Mouse Pointer */}
      <div
        className="absolute top-0 left-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 16}px, ${pos.y - 16}px, 0)`,
          willChange: "transform"
        }}
      >
        <div className={`relative flex items-center justify-center transition-all duration-150 ${isPointer ? "scale-125" : "scale-100"}`}>
          {/* Subtle Outer Glow */}
          <div className="w-8 h-8 rounded-full bg-white/20 blur-xs absolute" />

          {/* Spider Web Reticle */}
          <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" fill="none">
            {/* Radial Web spokes */}
            <line x1="16" y1="2" x2="16" y2="30" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="16" x2="30" y2="16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="6" y1="6" x2="26" y2="26" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6" y1="26" x2="26" y2="6" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

            {/* Concentric Web Rings */}
            <circle cx="16" cy="16" r="6" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.85" />
            <circle cx="16" cy="16" r="11" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="3 2" />

            {/* Center Red Dot / Web Shooter Core */}
            <circle cx="16" cy="16" r="2.5" fill="#ff4757" />
          </svg>
        </div>
      </div>
    </div>
  );
};
