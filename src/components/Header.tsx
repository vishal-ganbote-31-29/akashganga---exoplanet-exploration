import React from "react";
import { PageRoute } from "../types";
import { sounds } from "../utils/audio";

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onToggleMenu,
  isMenuOpen,
}) => {
  const steps: Array<{ id: PageRoute; label: string; num: string }> = [
    { id: "home", label: "Home", num: "1" },
    { id: "exoplanets", label: "Exoplanets", num: "2" },
    { id: "exploration", label: "Explore", num: "3" },
    { id: "trivia", label: "Trivia", num: "4" },
    { id: "news", label: "News", num: "5" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 sm:px-6 sm:py-4 md:px-10 lg:px-12 flex items-center justify-between gap-2 select-none bg-black/30 backdrop-blur-md">
      {/* Left Brand with Exact Task Bar Logos matching reference images */}
      <div
        onClick={() => {
          sounds.playClick();
          onNavigate("home");
        }}
        className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
        title="Akashganga Home"
      >
        {/* 1. Cosmic Planet / Planetary Orb Task Bar Logo (use provided logo image) */}
        <img src="/assets/logo.svg" alt="Akashganga" className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full object-cover shrink-0" />

        {/* 2. Web / Pointer image next to logo (use provided web image) */}
        <img src="/assets/web.svg" alt="Web" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl object-contain shrink-0" />

        {/* 3. AKASHGANGA Brand Text */}
        <span className="font-extrabold text-white tracking-[0.18em] sm:tracking-[0.22em] text-base sm:text-lg md:text-xl font-sans drop-shadow-md truncate">
          AKASHGANGA
        </span>
      </div>

      {/* Center navigation removed from header — navigation lives in the hamburger menu */}

      {/* Right Controls: Mobile Quick Step indicator + Hamburger Menu Button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile current active step pill */}
        <div className="sm:hidden flex items-center bg-black/50 border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-mono text-pink-300 font-bold">
          {steps.find((s) => s.id === currentPage)?.num || "1"}/5
        </div>

        {/* Hamburger Menu Toggle Button (3 horizontal bars) */}
        <button
          onClick={() => {
            sounds.playClick();
            onToggleMenu();
          }}
          aria-label="Toggle Navigation Menu"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex flex-col items-center justify-center gap-1.5 transition-all shadow-md group cursor-pointer shrink-0"
        >
          <span
            className={`w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2 bg-pink-400" : ""
            }`}
          />
          <span
            className={`w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 sm:w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2 bg-pink-400" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
};
