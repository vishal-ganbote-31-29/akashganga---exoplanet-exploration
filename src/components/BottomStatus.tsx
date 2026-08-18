import React, { useEffect, useState } from "react";
import { sounds } from "../utils/audio";

interface BottomStatusProps {
  showInfoButton?: boolean;
  onToggleInfo?: () => void;
  isInfoOpen?: boolean;
}

export const BottomStatus: React.FC<BottomStatusProps> = ({
  showInfoButton = false,
  onToggleInfo,
  isInfoOpen = true,
}) => {
  const [spiderSensePulsing, setSpiderSensePulsing] = useState(false);
  const [thwipActive, setThwipActive] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const onMove = () => {
      setSpiderSensePulsing(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setSpiderSensePulsing(false);
      }, 800);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(timeout);
    };
  }, []);

  const handleSpiderSenseClick = () => {
    sounds.playSpiderSense();
    setSpiderSensePulsing(true);
    setTimeout(() => setSpiderSensePulsing(false), 1200);
  };

  const handleThwipClick = () => {
    sounds.playThwip();
    setThwipActive(!thwipActive);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 px-3 py-2 flex items-center gap-3 select-none">
      {/* Left/Center Status Pills matching reference designs */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
        {/* SPIDER SENSE ENGAGED Pill */}
        <button
          onClick={handleSpiderSenseClick}
          className="group relative flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#18143a]/90 border-2 border-[#f1c40f] hover:border-[#ffeaa7] shadow-[0_0_15px_rgba(241,196,15,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          {/* Green Glowing Animated Radar Indicator */}
          <div className="relative flex items-center justify-center shrink-0">
            <span
              className={`w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-[#2ecc71] to-[#00cec9] shadow-[0_0_12px_#2ecc71] transition-transform duration-300 ${
                spiderSensePulsing ? "scale-125 animate-ping" : "scale-100"
              }`}
            />
            <span className="absolute w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full bg-[#2ed573] shadow-[0_0_8px_#2ed573]" />
          </div>

          {/* Yellow Bold Text */}
          <span className="font-extrabold text-[#f5cd2f] tracking-wider text-[10px] sm:text-xs md:text-sm font-sans drop-shadow-sm whitespace-nowrap">
            SPIDER SENSE ENGAGED
          </span>
        </button>

        {/* THWIP: ON Pill */}
        <button
          onClick={handleThwipClick}
          className="group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] hover:opacity-95 shadow-[0_0_18px_rgba(232,67,147,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          {/* Dark Metallic / Bronze Circular Badge */}
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-[#4a341b] via-[#2c1f10] to-[#120b05] border border-white/20 shadow-inner flex items-center justify-center shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e67e22]/80" />
          </div>

          {/* THWIP: ON Text */}
          <span className="font-black text-white tracking-widest text-[10px] sm:text-xs md:text-sm font-sans whitespace-nowrap">
            THWIP: {thwipActive ? "ON" : "OFF"}
          </span>
        </button>
      </div>

      {/* Right Side Optional INFO button matching VIEW_PLANET_ONCLICK.png */}
      {showInfoButton && onToggleInfo && (
        <button
          onClick={() => {
            sounds.playClick();
            onToggleInfo();
          }}
          className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-bold text-xs tracking-wider transition-all shadow-lg shrink-0 cursor-pointer ${
            isInfoOpen
              ? "bg-gradient-to-r from-[#ff4b72] to-[#7928ca] text-white shadow-pink-500/30 scale-105"
              : "bg-[#27214e]/90 text-white/80 hover:text-white hover:bg-[#342c68]"
          }`}
        >
          INFO
        </button>
      )}
    </div>
  );
};
