import React, { useState } from "react";
import { X, Download, FileCode, Image, Smartphone, CheckCircle, Sparkles } from "lucide-react";
import { Planet } from "../types";
import { sounds } from "../utils/audio";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  planet?: Planet;
  type: "app" | "asset";
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  planet,
  type,
}) => {
  const [downloadingItem, setDownloadingItem] = useState<string | null>(null);
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerFakeDownload = (name: string, fileType: string) => {
    sounds.playClick();
    setDownloadingItem(name);

    setTimeout(() => {
      // Create and trigger actual file download
      const content =
        type === "asset" && planet
          ? JSON.stringify(
              {
                exoplanet: planet.name,
                subtitle: planet.subtitle,
                coordinates: { distance: planet.distance, star: planet.starInfo },
                physics: { mass: planet.mass, radius: planet.radius, orbit: planet.orbitalDuration },
                habitabilityIndex: planet.potentialHabitability,
                atmosphericSpectrum: planet.atmosphere,
                telemetryTimestamp: new Date().toISOString(),
                akashgangaModelRef: `models/${planet.name.toLowerCase().replace(/\s+/g, "_")}.glb`
              },
              null,
              2
            )
          : `AKASHGANGA - Universal Exoplanet Explorer & Spider-Sense Observatory\nVersion: 2.4.0\nStatus: Verified\nTimestamp: ${new Date().toISOString()}`;

      const blob = new Blob([content], { type: fileType === "json" ? "application/json" : "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.toLowerCase().replace(/\s+/g, "_")}.${fileType}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloadingItem(null);
      setDownloadedItem(name);
      setTimeout(() => setDownloadedItem(null), 3000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-xs" />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg bg-[#191438] border-2 border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              {type === "app" ? "Download AKASHGANGA App" : `Download ${planet?.name || "Exoplanet"} Asset`}
            </h3>
            <p className="text-xs text-white/60">Select your package format below</p>
          </div>
        </div>

        {/* Content list */}
        <div className="space-y-3 mt-6">
          {type === "app" ? (
            <>
              <div
                onClick={() => triggerFakeDownload("Akashganga-Space-OS-Mobile", "apk")}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <Smartphone className="w-6 h-6 text-pink-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Akashganga Mobile (Android APK)</h4>
                    <p className="text-xs text-white/50">Full AR Sky Stargazing & 3D Exoplanet Catalog</p>
                  </div>
                </div>
                {downloadingItem === "Akashganga-Space-OS-Mobile" ? (
                  <Sparkles className="w-5 h-5 text-pink-400 animate-spin" />
                ) : downloadedItem === "Akashganga-Space-OS-Mobile" ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Download className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
                )}
              </div>

              <div
                onClick={() => triggerFakeDownload("Akashganga-Desktop-Observatory", "dmg")}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <FileCode className="w-6 h-6 text-purple-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Desktop Telescope Suite (macOS / Windows)</h4>
                    <p className="text-xs text-white/50">Ultra-HD Three.js GPU Visualizer & Spectral Simulator</p>
                  </div>
                </div>
                {downloadingItem === "Akashganga-Desktop-Observatory" ? (
                  <Sparkles className="w-5 h-5 text-pink-400 animate-spin" />
                ) : downloadedItem === "Akashganga-Desktop-Observatory" ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Download className="w-5 h-5 text-white/60 group-hover:text-white group-hover:translate-y-0.5 transition-all" />
                )}
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => triggerFakeDownload(`${planet?.name || "Planet"}-Telemetry-Specs`, "json")}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <FileCode className="w-6 h-6 text-pink-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Astrophysical Data Manifest (.json)</h4>
                    <p className="text-xs text-white/50">Complete spectroscopic, orbital & habitability telemetry</p>
                  </div>
                </div>
                {downloadingItem === `${planet?.name || "Planet"}-Telemetry-Specs` ? (
                  <Sparkles className="w-5 h-5 text-pink-400 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 text-white/60 group-hover:text-white transition-all" />
                )}
              </div>

              <div
                onClick={() => triggerFakeDownload(`${planet?.name || "Planet"}-Holo-Poster`, "png")}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <Image className="w-6 h-6 text-purple-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">4K High-Res Planet Poster (.png)</h4>
                    <p className="text-xs text-white/50">Ultra-resolution rendered render with star background</p>
                  </div>
                </div>
                {downloadingItem === `${planet?.name || "Planet"}-Holo-Poster` ? (
                  <Sparkles className="w-5 h-5 text-pink-400 animate-spin" />
                ) : (
                  <Download className="w-5 h-5 text-white/60 group-hover:text-white transition-all" />
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
