import React from "react";
import { PageRoute } from "../types";
import { X, Compass, Globe, Sparkles, Newspaper, LogOut, Radio } from "lucide-react";
import { sounds } from "../utils/audio";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onLogout?: () => void;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  onLogout,
}) => {
  if (!isOpen) return null;

  const menuItems: Array<{
    id: PageRoute;
    step: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: "home", step: "1", label: "HOME", icon: Compass },
    { id: "exoplanets", step: "2", label: "EXOPLANETS", icon: Globe },
    { id: "exploration", step: "3", label: "EXPLORE", icon: Radio },
    { id: "trivia", step: "4", label: "TRIVIA / FACTS", icon: Sparkles },
    { id: "news", step: "5", label: "LATEST NEWS", icon: Newspaper },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div
        onClick={() => {
          sounds.playClick();
          onClose();
        }}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs"
      />

      {/* Navigation Box matching reference (1.png top-right box with white frame and bold red X) */}
      <div className="relative z-10 w-full max-w-[300px] md:max-w-[340px] bg-[#120d2c] border-4 border-white rounded-3xl shadow-2xl p-6 overflow-hidden animate-in slide-in-from-top-6 duration-300">
        {/* Big Bold Red X Close Button matching the reference */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-red-600 hover:text-red-400 hover:scale-110 active:scale-95 transition-all p-1 cursor-pointer"
          aria-label="Close Menu"
        >
          <X className="w-8 h-8 stroke-[3.5]" />
        </button>

        {/* Menu Title / Header with Exact Task Bar Logos */}
        <div className="mb-6 pt-1 flex items-center gap-2.5">
          <img src="/assets/logo.svg" alt="Akashganga" className="w-8 h-8 rounded-full object-cover shrink-0" />

          <img src="/assets/web.svg" alt="Web" className="w-7 h-7 rounded-lg object-contain shrink-0" />

          <div>
            <h3 className="text-white font-black text-base tracking-[0.18em]">AKASHGANGA</h3>
            <span className="text-[10px] uppercase tracking-[0.2em] text-pink-400 font-mono block">
              COSMIC SEQUENCE 1-5
            </span>
          </div>
        </div>

        {/* Navigation links matching the exact sequence 1 to 5 */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                    key={item.id}
                    onClick={() => {
                      sounds.playClick();
                      // onNavigate now expected to scroll to the section when provided by App
                      onNavigate(item.id);
                      onClose();
                    }}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold tracking-[0.15em] transition-all cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] text-white shadow-lg shadow-pink-500/20 scale-[1.02]"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-pink-400"}`} />
                  <span className="text-xs md:text-sm font-sans">{item.label}</span>
                </div>
                <span className="text-[10px] font-mono opacity-70 bg-black/40 px-2 py-0.5 rounded-md text-pink-200">
                  IMG {item.step}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Divider and Session Info */}
        <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/70">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-mono">Radar Sync OK</span>
          </div>

          {onLogout && (
            <button
              onClick={() => {
                sounds.playClick();
                onLogout();
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs text-pink-300 hover:text-pink-100 font-mono transition cursor-pointer font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
