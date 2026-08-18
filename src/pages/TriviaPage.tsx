import React, { useState } from "react";
import { TRIVIA_DATA } from "../data/trivia";
import { TriviaQuestion, PageRoute } from "../types";
import { SpideyMaskIcon, AstronautIcon } from "../components/SpiderManIllustrations";
import { BottomStatus } from "../components/BottomStatus";
import { sounds } from "../utils/audio";
import { Sparkles, CheckCircle2, HelpCircle, RotateCcw } from "lucide-react";

interface TriviaPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const TriviaPage: React.FC<TriviaPageProps> = ({ onNavigate }) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const toggleAnswer = (id: number) => {
    sounds.playClick();
    if (!revealedAnswers[id]) {
      sounds.playSpiderSense();
    }
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetAll = () => {
    sounds.playClick();
    setRevealedAnswers({});
  };

  const filteredTrivia =
    selectedCategory === "all"
      ? TRIVIA_DATA
      : TRIVIA_DATA.filter((t) => t.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Starfield and Atmospheric Glow */}
      <div className="absolute inset-0 bg-[#161338] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-15" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 md:px-12 flex-1 flex flex-col justify-center">
        
        {/* Top Header matching reference 4.jpeg */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-widest uppercase font-sans">
            EXPLORE
          </h1>
          <h2 className="text-xl md:text-3xl font-extrabold text-[#ff4757] tracking-widest uppercase font-sans mt-1 drop-shadow-sm">
            TRIVIA
          </h2>
        </div>

        {/* Center Section with Spidey Mask and Left/Right Planet Globes matching 4.jpeg */}
        <div className="relative flex items-center justify-between my-2 md:my-6">
          
          {/* Left Planet Photo (use provided planet image) */}
          <div className="w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 -translate-x-4 md:translate-x-0">
            <img src="/assets/planet1.svg" alt="Planet 1" className="w-full h-full object-cover" />
          </div>

          {/* Center Spider-Man Mask Icon matching 4.jpeg */}
          <div className="flex flex-col items-center justify-center p-2 group cursor-pointer" onClick={() => sounds.playSpiderSense()}>
            <div className="p-4 rounded-3xl bg-white/5 border border-white/20 shadow-2xl backdrop-blur-xs group-hover:scale-105 group-active:scale-95 transition-transform duration-300">
              <SpideyMaskIcon className="w-24 h-32 md:w-32 md:h-44 object-contain filter drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
            </div>
            <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase mt-2">
              Spider-Sense Trivia Vault
            </span>
          </div>

          {/* Right Planet Photo (use provided planet image) */}
          <div className="w-28 h-28 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 translate-x-4 md:translate-x-0">
            <img src="/assets/planet2.svg" alt="Planet 2" className="w-full h-full object-cover" />
          </div>

        </div>

        {/* Bottom Trivia Cards Grid matching 4.jpeg */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-4">
          {filteredTrivia.slice(0, 3).map((item) => {
            const isRevealed = revealedAnswers[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleAnswer(item.id)}
                className={`group relative bg-[#747d8c]/60 hover:bg-[#747d8c]/80 border-2 rounded-3xl p-5 md:p-6 cursor-pointer shadow-2xl transition-all duration-300 min-h-[220px] flex flex-col items-center justify-between text-center ${
                  isRevealed
                    ? "border-pink-400 bg-[#2d2350] scale-[1.02]"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                {/* Top Astronaut Icon Illustration matching 4.jpeg */}
                <div className="w-full flex justify-center -mt-1">
                  <div className="p-1 rounded-2xl bg-white shadow-md group-hover:scale-105 transition-transform">
                    <AstronautIcon type={item.iconType} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                  </div>
                </div>

                {/* Content: Question or Revealed Answer */}
                <div className="my-3 w-full">
                  {!isRevealed ? (
                    <p className="text-white font-bold text-sm md:text-base leading-snug font-sans tracking-wide">
                      {item.question}
                    </p>
                  ) : (
                    <div className="space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
                      <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-widest block">
                        ANSWER REVEALED
                      </span>
                      <p className="text-yellow-300 font-black text-sm md:text-base">{item.answer}</p>
                      <p className="text-white/80 text-xs font-sans leading-relaxed">{item.details}</p>
                    </div>
                  )}
                </div>

                {/* Card Footer status */}
                <div className="w-full pt-1 flex items-center justify-center">
                  <span className="text-[11px] font-mono text-white/70 bg-black/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                    {isRevealed ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        <span>Tap to Hide</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-3 h-3 text-pink-300" />
                        <span>Tap to Reveal Answer</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Trivia Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-white/70 font-mono">
              Score: {Object.values(revealedAnswers).filter(Boolean).length} / {TRIVIA_DATA.length} explored
            </span>
          </div>

          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition font-mono"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Cards</span>
          </button>
        </div>

      </main>

      <BottomStatus />
    </div>
  );
};
