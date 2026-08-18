import React, { useState, useEffect } from "react";
import { Planet } from "../types";
import { PLANETS_DATA } from "../data/planets";
import { BottomStatus } from "../components/BottomStatus";
import { sounds } from "../utils/audio";
import { ChevronLeft, ChevronRight, Sparkles, Orbit } from "lucide-react";

interface ExoplanetsPageProps {
  onSelectPlanet: (planetId: number) => void;
}

export const ExoplanetsPage: React.FC<ExoplanetsPageProps> = ({ onSelectPlanet }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = 6; // Matching the 6 pagination dots in 2.png

  // Keyboard arrow keys for slide navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const nextPage = () => {
    sounds.playSwoosh();
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    sounds.playSwoosh();
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (pageIndex: number) => {
    sounds.playClick();
    setCurrentPage(pageIndex);
  };

  // Get current 3 planets (looping circularly over the 10 catalog items)
  const startIndex = (currentPage * itemsPerPage) % PLANETS_DATA.length;
  const currentPlanets = [
    PLANETS_DATA[startIndex % PLANETS_DATA.length],
    PLANETS_DATA[(startIndex + 1) % PLANETS_DATA.length],
    PLANETS_DATA[(startIndex + 2) % PLANETS_DATA.length],
  ];

  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden select-none bg-[#161338]">
      {/* Background Cosmic Starfield */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container matching 2.png */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-4 md:px-12 flex-1 flex flex-col justify-center">
        
        {/* Header Title Section matching 2.png */}
        <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-widest uppercase font-sans mb-3 drop-shadow-md">
            EXOPLANETS
          </h1>
          <p className="text-white/85 text-sm md:text-lg font-normal leading-relaxed tracking-wide">
            Discover the hidden worlds beyond our solar system, where every exoplanet tells a story of mystery and wonder.
          </p>
        </div>

        {/* Carousel / Grid of 3 Planet Cards matching 2.png */}
        <div className="relative w-full">
          {/* Navigation Arrows for accessibility & precision */}
          <button
            onClick={prevPage}
            aria-label="Previous Slide"
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPage}
            aria-label="Next Slide"
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Grid of 3 matching 2.png */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 items-stretch transition-all duration-500 pt-6">
            {currentPlanets.map((planet, idx) => (
              <PlanetCard key={`${planet.id}-${idx}`} planet={planet} onSelectPlanet={onSelectPlanet} />
            ))}
          </div>
        </div>

        {/* Bottom Pagination Dots matching reference 2.png (Exactly 6 dots: ● ● ● ● ● ●) */}
        <div className="w-full flex items-center justify-center gap-3.5 mt-8 md:mt-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === idx
                  ? "w-3.5 h-3.5 bg-white shadow-[0_0_10px_#ffffff] scale-125"
                  : "w-3 h-3 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

      </main>

      {/* Bottom Status Indicators matching 2.png */}
      <BottomStatus />
    </div>
  );
};

// Reusable Planet Card matching reference 2.png
const PlanetCard: React.FC<{ planet: Planet; onSelectPlanet: (id: number) => void }> = ({
  planet,
  onSelectPlanet,
}) => {
  return (
    <div className="group relative bg-[#26204d] border border-white/15 rounded-3xl p-6 pt-14 flex flex-col items-center justify-between text-center min-h-[380px] shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Floating Red / Textured Planet Sphere on Top matching 2.png */}
      <div className="absolute -top-12 flex items-center justify-center">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(255,75,114,0.4)] border-2 border-white/40 group-hover:scale-110 transition-transform duration-500 overflow-hidden"
          style={{
            background: `radial-gradient(circle at 35% 35%, ${planet.visualConfig.atmosphereColor || "#ff7675"}, ${planet.visualConfig.primaryColor || "#d63031"}, #160a22)`
          }}
        >
          {/* Surface texture overlay matching planet image */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:12px_12px] opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/30" />
          
          {/* Planet Label Overlay */}
          <div className="relative z-10 p-2 text-center">
            <span className="text-[10px] font-black uppercase text-white tracking-wider leading-tight drop-shadow-md block">
              {planet.type}
            </span>
          </div>
        </div>
      </div>

      {/* Center Details matching 2.png (planet name, distance:) */}
      <div className="mt-14 space-y-2.5 w-full">
        <h2 className="text-white font-extrabold text-lg md:text-xl tracking-wider uppercase font-sans">
          {planet.name}
        </h2>
        <p className="text-white/80 text-xs md:text-sm font-sans tracking-wide">
          distance: <span className="text-pink-300 font-bold">{planet.distance}</span>
        </p>
        <p className="text-white/50 text-[11px] font-mono tracking-wider">
          Star: {planet.starInfo.split("(")[0]}
        </p>
      </div>

      {/* VIEW PLANET Gradient Rounded Button matching 2.png */}
      <div className="w-full pt-4">
        <button
          onClick={() => {
            sounds.playClick();
            onSelectPlanet(planet.id);
          }}
          className="w-full bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] hover:opacity-95 text-white font-extrabold py-3.5 px-6 rounded-2xl tracking-[0.18em] text-xs md:text-sm shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer border border-white/20"
        >
          VIEW PLANET
        </button>
      </div>
    </div>
  );
};
