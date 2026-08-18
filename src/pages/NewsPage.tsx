import React, { useState } from "react";
import { PageRoute } from "../types";
import { SpideyFullBodyIllustration, CartoonAsteroid } from "../components/SpiderManIllustrations";
import { BottomStatus } from "../components/BottomStatus";
import { sounds } from "../utils/audio";
import { CheckCircle2, Send, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface NewsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();

    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please provide a valid cosmic email address.");
      return;
    }

    setError("");
    setIsSubscribed(true);
    sounds.playSpiderSense();

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff4b72", "#7928ca", "#00cec9", "#f1c40f"]
    });
  };

  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Dark site background to match other tabs */}
      <div className="absolute inset-0 bg-[#161338] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-10" />
      </div>

      {/* Main Container matching reference 5.jpeg */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-6 md:px-12 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Top Center Heading matching 5.jpeg */}
        <div className="mb-4">
          <span className="text-xl md:text-2xl font-black text-white tracking-wider block font-sans">
            GET OUR
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-wider font-sans">
            LATEST NEWS
          </h1>
        </div>

        {/* Central Section with Left Asteroid, Center Spider-Man, and Right Orange Planet matching 5.jpeg */}
        <div className="w-full flex items-center justify-between my-2 md:my-4 max-w-4xl">
          
          {/* Left Decorative Comic Planet (Green Craters) matching 5.jpeg */}
          <div className="hidden sm:block p-2 transform -rotate-6 hover:scale-105 transition-transform">
            <CartoonAsteroid type="green" className="w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-xl" />
          </div>

          {/* Center Spider-Man Vector Character matching 5.jpeg */}
          <div className="flex-1 flex justify-center py-2">
            <div className="p-2 group cursor-pointer" onClick={() => sounds.playThwip()}>
              <SpideyFullBodyIllustration className="w-36 h-60 md:w-48 md:h-72 object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
            </div>
          </div>

          {/* Right Decorative Comic Planet (Orange Orbit Rings) matching 5.jpeg */}
          <div className="hidden sm:block p-2 transform rotate-6 hover:scale-105 transition-transform">
            <CartoonAsteroid type="orange" className="w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-xl" />
          </div>

        </div>

        {/* Email Input & Subscribe Button matching reference 5.jpeg */}
          <div className="w-full max-w-lg mx-auto my-4">
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="relative flex items-stretch border-2 border-white/10 rounded-xl bg-[#0b0a17]">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 px-4 py-3 text-sm md:text-base text-white placeholder-white/60 font-sans outline-none font-medium bg-transparent"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] text-white font-bold px-6 py-3 text-xs md:text-sm tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Email Address</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div className="p-4 bg-green-50 border-2 border-green-600 rounded-xl flex items-center justify-center gap-3 text-green-900 shadow-md animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
              <div className="text-left">
                <h4 className="text-sm font-bold">Subscribed to Akashganga Dispatch!</h4>
                <p className="text-xs text-green-700">Cosmic bulletins will be delivered to {email}</p>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-600 font-mono mt-2">{error}</p>}
        </div>

        {/* Navigation Links matching reference 5.jpeg (Home, Exoplanets, Facts) */}
        <div className="flex items-center justify-center gap-8 md:gap-12 my-4">
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("home");
            }}
            className="text-gray-900 hover:text-pink-600 font-bold text-sm md:text-base font-sans tracking-wide transition"
          >
            Home
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("exoplanets");
            }}
            className="text-gray-900 hover:text-pink-600 font-bold text-sm md:text-base font-sans tracking-wide transition"
          >
            Exoplanets
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate("trivia");
            }}
            className="text-gray-900 hover:text-pink-600 font-bold text-sm md:text-base font-sans tracking-wide transition"
          >
            Facts
          </button>
        </div>

        {/* Social Media Circular Buttons matching 5.jpeg (in, WA, GH) */}
        <div className="flex items-center justify-center gap-4 my-3">
          <button
            onClick={() => {
              sounds.playClick();
              window.open("https://linkedin.com", "_blank");
            }}
            title="LinkedIn Galactic Network"
            className="w-10 h-10 rounded-full border-2 border-black bg-white hover:bg-black hover:text-white font-bold text-xs flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
          >
            in
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              window.open("https://whatsapp.com", "_blank");
            }}
            title="WhatsApp Alien Transmission"
            className="w-10 h-10 rounded-full border-2 border-black bg-white hover:bg-black hover:text-white font-bold text-xs flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
          >
            WA
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              window.open("https://github.com", "_blank");
            }}
            title="GitHub Planetary Repo"
            className="w-10 h-10 rounded-full border-2 border-black bg-white hover:bg-black hover:text-white font-bold text-xs flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
          >
            GH
          </button>
        </div>

      </main>

      {/* Dark Theme Bottom Status bar container */}
      <div className="bg-[#161338] pt-2">
        <BottomStatus />
      </div>
    </div>
  );
};
