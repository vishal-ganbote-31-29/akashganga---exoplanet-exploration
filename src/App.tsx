import React, { useState } from "react";
import { PageRoute, UserProfile, Planet } from "./types";
import { Header } from "./components/Header";
import { NavigationMenu } from "./components/NavigationMenu";
import { SpiderCursor } from "./components/SpiderCursor";
import { DownloadModal } from "./components/DownloadModal";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ExoplanetsPage } from "./pages/ExoplanetsPage";
import { PlanetDetailPage } from "./pages/PlanetDetailPage";
import { ExplorationPage } from "./pages/ExplorationPage";
import { TriviaPage } from "./pages/TriviaPage";
import { NewsPage } from "./pages/NewsPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState<PageRoute>("login");
  const [selectedPlanetId, setSelectedPlanetId] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [downloadModal, setDownloadModal] = useState<{
    isOpen: boolean;
    type: "app" | "asset";
    planet?: Planet;
  }>({
    isOpen: false,
    type: "app",
  });

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("login");
  };

  const handleSelectPlanet = (planetId: number) => {
    setSelectedPlanetId(planetId);
    setCurrentPage("planet");
  };

  const handleOpenDownloadApp = () => {
    setDownloadModal({
      isOpen: true,
      type: "app",
    });
  };

  const handleOpenDownloadAsset = (planet: Planet) => {
    setDownloadModal({
      isOpen: true,
      type: "asset",
      planet,
    });
  };

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    // try to scroll if the corresponding section exists in the stitched layout
    setTimeout(() => {
      const el = document.getElementById(`section-${page}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <div className="min-h-screen w-full bg-[#161338] text-white flex flex-col font-sans relative selection:bg-pink-500 selection:text-white">
      {/* Interactive Spider-Web Cursor & Click Shooting Effect */}
      <SpiderCursor />

      {/* Download Modal Dialog */}
      <DownloadModal
        isOpen={downloadModal.isOpen}
        onClose={() => setDownloadModal((prev) => ({ ...prev, isOpen: false }))}
        type={downloadModal.type}
        planet={downloadModal.planet}
      />

      {/* Global Header (shown on all authenticated / explore pages) */}
      {currentPage !== "login" && (
        <Header
          currentPage={currentPage}
          onNavigate={(page) => navigateTo(page)}
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
        />
      )}

      {/* Global Slide-In Navigation Menu */}
      <NavigationMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => navigateTo(page)}
        onLogout={handleLogout}
      />

      {/* Page content: if on login, show login; otherwise render a single scrollable page with all sections */}
      {currentPage === "login" ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : currentPage === "planet" ? (
        <PlanetDetailPage
          planetId={selectedPlanetId}
          onNavigate={(page) => navigateTo(page)}
          onSelectPlanet={(id) => handleSelectPlanet(id)}
          onOpenDownload={(planet) => handleOpenDownloadAsset(planet)}
        />
      ) : (
        <div className="flex-1 overflow-y-auto" id="site-scroll-container">
          <section id="section-home" className="min-h-screen">
            <HomePage
              onNavigate={(page) => navigateTo(page)}
              onOpenDownload={handleOpenDownloadApp}
            />
          </section>

          <section id="section-exoplanets" className="min-h-screen">
            <ExoplanetsPage onSelectPlanet={handleSelectPlanet} />
          </section>

          <section id="section-exploration" className="min-h-screen">
            <ExplorationPage onNavigate={(page) => navigateTo(page)} onOpenDownload={handleOpenDownloadApp} />
          </section>

          <section id="section-trivia" className="min-h-screen">
            <TriviaPage onNavigate={(page) => navigateTo(page)} />
          </section>

          <section id="section-news" className="min-h-screen">
            <NewsPage onNavigate={(page) => navigateTo(page)} />
          </section>
        </div>
      )}
    </div>
  );
}

// Helper that scrolls to a section by page id. Defined after component to keep top-level minimal.
function scrollToSection(page: PageRoute) {
  const el = document.getElementById(`section-${page}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
