import React, { useState, useEffect } from "react";
import { Planet, PageRoute } from "../types";
import { PLANETS_DATA } from "../data/planets";
import { Planet3DViewer } from "../components/Planet3DViewer";
import { BottomStatus } from "../components/BottomStatus";
import { sounds } from "../utils/audio";
import { ArrowRight, ArrowLeft, ChevronLeft, Sparkles, Download, Layers, ShieldCheck, Thermometer } from "lucide-react";

interface PlanetDetailPageProps {
  planetId: number;
  onNavigate: (page: PageRoute) => void;
  onSelectPlanet: (id: number) => void;
  onOpenDownload: (planet: Planet) => void;
}

export const PlanetDetailPage: React.FC<PlanetDetailPageProps> = ({
  planetId,
  onNavigate,
  onSelectPlanet,
  onOpenDownload,
}) => {
  const [isInfoOpen, setIsInfoOpen] = useState(true);

  const currentPlanetIndex = PLANETS_DATA.findIndex((p) => p.id === planetId);
  const planet = PLANETS_DATA[currentPlanetIndex] || PLANETS_DATA[0];

  const handleNextPlanet = () => {
    sounds.playSwoosh();
    const nextIndex = (currentPlanetIndex + 1) % PLANETS_DATA.length;
    onSelectPlanet(PLANETS_DATA[nextIndex].id);
  };

  const handlePrevPlanet = () => {
    sounds.playSwoosh();
    const prevIndex = (currentPlanetIndex - 1 + PLANETS_DATA.length) % PLANETS_DATA.length;
    onSelectPlanet(PLANETS_DATA[prevIndex].id);
  };

  // Keyboard controls for next/prev planet
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNextPlanet();
      } else if (e.key === "ArrowLeft") {
        handlePrevPlanet();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPlanetIndex]);

  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden select-none">
      {/* High-Contrast Starfield Background matching VIEW_PLANET_ONCLICK.png */}
      <div className="absolute inset-0 bg-[#0c0a1f] pointer-events-none">
        {/* Star speckles */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(#a29bfe_2px,transparent_2px)] [background-size:60px_60px] opacity-40" />
        {/* Cosmic nebula flares */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-900/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      {/* Top Breadcrumb / Return to Exoplanets */}
      <div className="relative z-20 px-6 md:px-12 pt-2 flex items-center justify-between">
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate("exoplanets");
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-bold tracking-widest transition border border-white/15"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK TO EXOPLANETS</span>
        </button>

        {/* Planet Index Indicator */}
        <div className="text-white/60 text-xs font-mono tracking-widest">
          PLANET {planet.id} / {PLANETS_DATA.length}
        </div>
      </div>

      {/* Main Viewport: Central 3D Planet + Right Side Info Card */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 py-4">
        
        {/* Previous Planet Navigation Button (Left) */}
        <button
          onClick={handlePrevPlanet}
          aria-label="Previous Planet"
          className="hidden lg:flex w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all z-20"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Center: Real 3D Planet Model Viewport matching circular model area */}
        <div className="flex-1 w-full max-w-2xl flex items-center justify-center relative min-h-[340px] md:min-h-[460px]">
          <Planet3DViewer planet={planet} className="w-full h-full" />
        </div>

        {/* Right: Info Card & Navigation Control matching VIEW_PLANET_ONCLICK.png */}
        <div className="flex items-center gap-4 w-full lg:w-auto justify-center">
          
          {/* Transition Arrow Button matching the circular white arrow in VIEW_PLANET_ONCLICK.png */}
          <button
            onClick={handleNextPlanet}
            aria-label="Next Planet"
            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 hover:bg-white text-gray-900 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all cursor-pointer z-20 shrink-0"
          >
            <ArrowRight className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" />
          </button>

          {/* Planet Information Card matching VIEW_PLANET_ONCLICK.png */}
          {isInfoOpen && (
            <div className="w-full max-w-md lg:w-96 bg-[#2d2757]/95 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl space-y-5 animate-in slide-in-from-right-4 duration-300">
              
              {/* PLANET NAME Heading */}
              <div className="border-b border-white/15 pb-3">
                <span className="text-[11px] font-mono text-pink-400 font-bold uppercase tracking-widest block">
                  {planet.type} EXOPLANET
                </span>
                <h1 className="text-xl md:text-2xl font-black text-white tracking-wider uppercase font-sans">
                  {planet.name}
                </h1>
                <p className="text-white/70 text-xs italic mt-1 font-sans">"{planet.tagline}"</p>
              </div>

              {/* Data Specifications List matching VIEW_PLANET_ONCLICK.png */}
              <div className="space-y-2.5 text-xs md:text-sm font-sans tracking-wide">
                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-white/90 tracking-wider">DIST:</span>
                  <span className="text-pink-300 font-mono font-bold">{planet.distance}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-white/90 tracking-wider">STAR INFO:</span>
                  <span className="text-white/80 font-mono text-right text-[11px] max-w-[200px] truncate" title={planet.starInfo}>
                    {planet.starInfo}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-white/90 tracking-wider">MASS:</span>
                  <span className="text-white/80 font-mono">{planet.mass}</span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="font-extrabold text-white/90 tracking-wider">ORBIT DUR:</span>
                  <span className="text-white/80 font-mono">{planet.orbitalDuration}</span>
                </div>

                <div className="flex flex-col gap-1 pt-1">
                  <span className="font-extrabold text-white/90 tracking-wider">POTENTIAL HABITABILITY:</span>
                  <span className="text-green-300 font-mono font-bold text-xs bg-green-950/40 border border-green-500/30 px-2.5 py-1 rounded-lg">
                    {planet.potentialHabitability}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-1 border-t border-white/10 text-white/60 text-[11px]">
                  <span>SURFACE TEMP:</span>
                  <span className="font-mono text-white/80">{planet.surfaceTemp}</span>
                </div>
              </div>

              {/* DOWNLOAD ASSET Button matching VIEW_PLANET_ONCLICK.png */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onOpenDownload(planet);
                  }}
                  className="w-full bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] hover:opacity-95 text-white font-extrabold py-3.5 px-6 rounded-2xl tracking-[0.2em] text-xs md:text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer border border-white/20 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD ASSET</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </main>

      {/* Bottom Status bar with INFO Toggle button */}
      <BottomStatus
        showInfoButton={true}
        onToggleInfo={() => setIsInfoOpen(!isInfoOpen)}
        isInfoOpen={isInfoOpen}
      />
    </div>
  );
};
