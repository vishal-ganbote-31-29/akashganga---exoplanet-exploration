import React, { useState } from "react";
import { PageRoute, Planet } from "../types";
import { PLANETS_DATA } from "../data/planets";
import { BottomStatus } from "../components/BottomStatus";
import { sounds } from "../utils/audio";
import { Sparkles, ChevronLeft, ChevronRight, Compass } from "lucide-react";

interface ExplorationPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenDownload: () => void;
  onSelectPlanet?: (id: number) => void;
}

export const ExplorationPage: React.FC<ExplorationPageProps> = ({
  onNavigate,
  onOpenDownload,
  onSelectPlanet,
}) => {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(1); // Default to Kepler-186f (index 1)
  const planet = PLANETS_DATA[selectedPlanetIndex] || PLANETS_DATA[1];

  const handleNextPlanet = () => {
    sounds.playSwoosh();
    setSelectedPlanetIndex((prev) => (prev + 1) % PLANETS_DATA.length);
  };

  const handlePrevPlanet = () => {
    sounds.playSwoosh();
    setSelectedPlanetIndex((prev) => (prev - 1 + PLANETS_DATA.length) % PLANETS_DATA.length);
  };

  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden select-none bg-[#161338]">
      {/* Cosmic Starfield Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container matching 3.png */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 md:px-12 flex-1 flex flex-col justify-center">
        
        {/* Top Gradient Banner matching reference 3.png */}
        <div className="w-full flex justify-center mb-6 md:mb-10">
          <div className="bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] text-white text-center py-3 px-10 md:px-16 rounded-full font-black tracking-widest text-xs md:text-sm shadow-xl shadow-pink-500/25 border border-white/20">
            EXPLORE EXOPLANETS
          </div>
        </div>

        {/* 2-Card Layout matching reference 3.png */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch">
          
          {/* Left Card: PLANET IMAGE box matching reference 3.png */}
          <div className="md:col-span-6 bg-[#211b47] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center justify-between min-h-[380px] relative overflow-hidden group">
            {/* Subtle Star shimmer */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
            
            {/* Planet Navigation Arrows */}
            <div className="w-full flex items-center justify-between z-10">
              <button
                onClick={handlePrevPlanet}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95"
                title="Previous Planet"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-[11px] font-mono text-pink-300 font-bold uppercase tracking-widest">
                {planet.name} ({planet.type})
              </span>
              <button
                onClick={handleNextPlanet}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition active:scale-95"
                title="Next Planet"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Central Realistic Planet Graphic matching 3.png */}
            <div className="relative my-4 flex items-center justify-center">
              <div
                className="w-48 h-48 md:w-60 md:h-60 rounded-full shadow-[0_0_50px_rgba(232,67,147,0.35)] relative overflow-hidden transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${planet.visualConfig.atmosphereColor}, ${planet.visualConfig.primaryColor}, #090618)`
                }}
              >
                {/* Surface detail banding */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-white/20" />
                {planet.visualConfig.hasRings && (
                  <div className="absolute inset-0 border-8 border-pink-400/40 rounded-full transform rotate-45 scale-125 pointer-events-none" />
                )}
              </div>
            </div>

            {/* Label below matching 3.png */}
            <div className="z-10 text-center">
              <span className="text-xs font-mono font-bold tracking-[0.25em] text-white/70 uppercase">
                PLANET IMAGE
              </span>
            </div>
          </div>

          {/* Right Card: White Rounded Box matching reference 3.png */}
          <div className="md:col-span-6 bg-white text-gray-900 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[380px]">
            {/* Top INFO pill matching 3.png */}
            <div className="flex items-center justify-between">
              <div className="bg-[#1f1945] text-white text-xs font-black tracking-widest px-6 py-2 rounded-full uppercase shadow-md">
                INFO
              </div>
              <span className="text-xs font-mono text-gray-500 font-bold">
                TELEMETRY SPEC
              </span>
            </div>

            {/* Fields matching 3.png: VISIBLE; and DIST FROM EARTH: */}
            <div className="space-y-4 my-4 font-sans">
              <div>
                <span className="font-extrabold text-sm md:text-base text-gray-900 tracking-wider block uppercase">
                  VISIBLE;
                </span>
                <p className="text-xs md:text-sm text-gray-700 font-medium leading-relaxed mt-0.5">
                  Spectral Band: {planet.atmosphere}. {planet.description.slice(0, 110)}...
                </p>
              </div>

              <div>
                <span className="font-extrabold text-sm md:text-base text-gray-900 tracking-wider block uppercase">
                  DIST FROM EARTH:
                </span>
                <p className="text-sm md:text-base font-bold text-[#e84393] font-mono mt-0.5">
                  {planet.distance}
                </p>
              </div>

              {/* Extra telemetry info from reference */}
              <div className="p-3 bg-gray-100 rounded-2xl space-y-1 text-xs text-gray-800 font-sans border border-gray-200">
                <div className="flex justify-between">
                  <span className="font-bold">HOST STAR:</span>
                  <span className="font-mono text-gray-600">{planet.starInfo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">ORBITAL PERIOD:</span>
                  <span className="font-mono text-gray-600">{planet.orbitalDuration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">HABITABILITY:</span>
                  <span className="font-mono text-green-700 font-bold">{planet.potentialHabitability}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  if (onSelectPlanet) {
                    onSelectPlanet(planet.id);
                  } else {
                    onNavigate("planet");
                  }
                }}
                className="flex-1 bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] hover:opacity-95 text-white font-extrabold py-3.5 px-6 rounded-2xl tracking-[0.18em] text-xs shadow-md active:scale-95 transition-all text-center"
              >
                VIEW 3D MODEL
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onNavigate("exoplanets");
                }}
                className="px-4 py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold rounded-2xl text-xs tracking-wider transition"
              >
                CATALOG
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Bottom Status bar matching 3.png */}
      <BottomStatus />
    </div>
  );
};
