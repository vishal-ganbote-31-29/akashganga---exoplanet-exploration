import React, { useState } from "react";
import { UserProfile } from "../types";
import { BottomStatus } from "../components/BottomStatus";
import { SpideyFullBodyIllustration } from "../components/SpiderManIllustrations";
import { sounds } from "../utils/audio";

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("cosmic.explorer@akashganga.space");
  const [password, setPassword] = useState("••••••••••••");
  const [name, setName] = useState("Peter Parker");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();

    if (!email || !email.includes("@")) {
      setError("Please provide a valid cosmic email address.");
      return;
    }
    if (!password || password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setError("");
    sounds.playSpiderSense();

    onLoginSuccess({
      name: name || "Cosmic Voyager",
      email: email,
      isLoggedIn: true,
      avatarSeed: "spidey-space",
    });
  };

  const handleQuickDemoLogin = () => {
    sounds.playClick();
    sounds.playSpiderSense();
    onLoginSuccess({
      name: "Peter Parker",
      email: "peter.parker@akashganga.space",
      isLoggedIn: true,
      avatarSeed: "spidey-space",
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#161338] text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background Starfield particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Main Login Content Canvas matching LOGIN_PAGE.png */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Card: Login Form matching LOGIN_PAGE.png */}
          <div className="md:col-span-7 bg-[#231d4d] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col justify-between">
            {/* Top Gradient Banner matching reference */}
            <div className="w-full bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] text-white text-center py-3 px-6 rounded-full font-black tracking-widest text-xs md:text-sm shadow-md mb-8">
              SPIDER-VERSE SECURE PORTAL
            </div>

            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase font-sans text-white/90">
                {isSignUp ? "CREATE NEW ACCOUNT" : "SIGN IN"}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ENTER YOUR NAME"
                    className="w-full bg-white text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg font-bold text-sm tracking-wider outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
                  />
                </div>
              )}

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL"
                  className="w-full bg-white text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg font-bold text-sm tracking-wider outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  className="w-full bg-white text-gray-900 placeholder-gray-500 px-4 py-3 rounded-lg font-bold text-sm tracking-wider outline-none focus:ring-2 focus:ring-pink-500 shadow-inner"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 font-mono text-center pt-1">{error}</p>
              )}

              {/* SUBMIT Button matching reference */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] hover:opacity-95 text-white font-extrabold py-3.5 px-6 rounded-full tracking-widest text-sm shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all cursor-pointer"
                >
                  {isSignUp ? "REGISTER PORTAL" : "SUBMIT"}
                </button>
              </div>

              {/* OR Divider matching reference */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-black/80" />
                <span className="absolute bg-[#231d4d] px-3 text-xs font-bold text-white/70 tracking-widest">
                  OR
                </span>
              </div>

              {/* SIGN UP / SIGN IN Toggle Button matching reference */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="w-full bg-gradient-to-r from-[#ff4b72] via-[#e84393] to-[#8e44ad] hover:opacity-95 text-white font-extrabold py-3.5 px-6 rounded-full tracking-widest text-sm shadow-lg shadow-purple-500/20 active:scale-[0.99] transition-all cursor-pointer"
                >
                  {isSignUp ? "SWITCH TO SIGN IN" : "SIGN UP"}
                </button>
              </div>

              {/* Quick Guest Explorer Access */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="text-xs text-white/50 hover:text-pink-300 underline tracking-wider font-mono transition"
                >
                  Skip & Enter as Guest Observer →
                </button>
              </div>
            </form>
          </div>

          {/* Right Card: Spider-Man & Brand Card matching LOGIN_PAGE.png */}
          <div className="md:col-span-5 bg-[#231d4d] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center justify-between text-center min-h-[380px]">
            {/* Top Illustration: Spider-Man White Line Art */}
            <div className="w-full flex items-center justify-center py-2">
              <SpideyFullBodyIllustration className="w-36 h-56 md:w-44 md:h-64 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
            </div>

            {/* Circular LOGO Badge matching header */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-white/40">
              <img src="/assets/logo.svg" alt="Akashganga logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            </div>

            {/* AKASHGANGA brand name */}
            <h1 className="mt-4 font-black text-lg md:text-xl text-white tracking-[0.25em] uppercase font-sans">
              AKASHGANGA
            </h1>
          </div>

        </div>
      </main>

      {/* Bottom Status bar matching LOGIN_PAGE.png */}
      <BottomStatus />
    </div>
  );
};
