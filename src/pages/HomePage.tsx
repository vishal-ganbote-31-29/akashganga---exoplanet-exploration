import React from "react";
import { PageRoute } from "../types";
import { RadioTelescopeIllustration } from "../components/SpiderManIllustrations";
import { BottomStatus } from "../components/BottomStatus";
import { sounds } from "../utils/audio";
import { Globe, Sparkles, ArrowRight, Compass } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenDownload: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenDownload }) => {
  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Starfield particles & subtle cosmic nebula */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 md:px-12 flex-1 flex flex-col justify-center">
        
        {/* Top Gradient Banner matching reference 1.png */}
        <div className="w-full flex justify-center mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] text-white text-center py-3.5 px-8 md:px-16 rounded-full font-black tracking-widest text-xs md:text-base shadow-xl shadow-pink-500/25 border border-white/20">
            CONNECTING THE DOTS OF THE UNIVERSE
          </div>
        </div>

        {/* Content Section: Left Description + Right Astronomy Telescope Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wider uppercase font-sans">
              AKASHGANGA
            </h1>

            <p className="text-white/85 text-base md:text-xl font-normal leading-relaxed tracking-wide max-w-2xl">
              A platform that offers a unique journey through the cosmos, allowing user to explore the night sky from distant exoplanets. Create and name exoplanets.
            </p>

            {/* Quick Feature Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigate("exoplanets");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wider transition border border-white/10"
              >
                <Globe className="w-4 h-4 text-pink-400" />
                <span>10 EXOPLANETS READY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigate("trivia");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wider transition border border-white/10"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>COSMIC TRIVIA</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigate("exploration");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold tracking-wider transition border border-white/10"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>RADIO OBSERVATORY</span>
              </button>
            </div>
          </div>

          {/* Right Column: Radio Telescope Illustration matching 1.png */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative group">
              {/* Soft pulsing glow behind telescope */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              
              <div className="relative bg-[#ffffff] p-6 rounded-3xl shadow-2xl border-4 border-white/80">
                <RadioTelescopeIllustration className="w-56 h-56 md:w-72 md:h-72 object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Big Rounded Gradient DOWNLOAD APP Button matching reference 1.png */}
        <div className="w-full flex justify-center mt-10 md:mt-14">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenDownload();
            }}
            className="group relative bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] hover:opacity-95 text-white font-extrabold py-4 px-12 md:px-20 rounded-full tracking-[0.2em] text-sm md:text-base shadow-2xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/30"
          >
            <span className="flex items-center gap-3">
              DOWNLOAD APP
            </span>
          </button>
        </div>

      </main>

      {/* Bottom Status Indicators */}
      <BottomStatus />
    </div>
  );
};
