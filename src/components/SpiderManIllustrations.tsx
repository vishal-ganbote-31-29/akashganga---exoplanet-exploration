import React from "react";

// Spider-Man Mask Vector matching the Trivia reference (image 4.jpeg)
export const SpideyMaskIcon: React.FC<{ className?: string }> = ({ className = "w-28 h-36" }) => {
  return (
    <svg viewBox="0 0 100 130" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Head Silhouette */}
      <path
        d="M50 5 C22 5 8 28 8 68 C8 98 28 124 50 126 C72 124 92 98 92 68 C92 28 78 5 50 5 Z"
        fill="#111118"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Web Pattern - Vertical Spoke Lines */}
      <path d="M50 5 L50 126" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.85" />
      <path d="M50 35 Q30 50 14 62" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
      <path d="M50 35 Q70 50 86 62" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
      <path d="M50 35 Q25 32 12 40" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
      <path d="M50 35 Q75 32 88 40" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
      <path d="M50 70 Q30 85 18 100" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
      <path d="M50 70 Q70 85 82 100" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
      <path d="M50 95 L50 126" stroke="#ffffff" strokeWidth="1.8" strokeOpacity="0.8" />
      
      {/* Web Pattern - Concentric Web Arcs */}
      <path d="M28 20 Q50 30 72 20" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeOpacity="0.75" />
      <path d="M18 35 Q50 48 82 35" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeOpacity="0.75" />
      <path d="M11 58 Q50 75 89 58" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeOpacity="0.75" />
      <path d="M18 90 Q50 108 82 90" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeOpacity="0.75" />
      <path d="M30 112 Q50 120 70 112" stroke="#ffffff" strokeWidth="1.8" fill="none" strokeOpacity="0.75" />

      {/* Spider-Man Stylized Angled Eyes with Bold Black Trim & Pure White Core */}
      {/* Left Eye */}
      <path
        d="M20 48 Q36 44 46 68 Q38 88 20 86 Q14 74 20 48 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M23 52 Q35 48 43 68 Q36 82 23 80 Q18 70 23 52 Z"
        fill="#ffffff"
      />
      {/* Right Eye */}
      <path
        d="M80 48 Q64 44 54 68 Q62 88 80 86 Q86 74 80 48 Z"
        fill="#ffffff"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M77 52 Q65 48 57 68 Q64 82 77 80 Q82 70 77 52 Z"
        fill="#ffffff"
      />
    </svg>
  );
};

// Full Body Spider-Man Vector Line Art matching image 5.jpeg & LOGIN_PAGE.png
export const SpideyFullBodyIllustration: React.FC<{ className?: string }> = ({ className = "w-44 h-72" }) => {
  const [useFallback, setUseFallback] = React.useState(false);
  const externalSrc = "/assets/spiderman_full.png";

  return (
    <>
      {!useFallback ? (
        <img
          src={externalSrc}
          alt="Spiderman full body"
          className={className + " object-contain"}
          onError={() => setUseFallback(true)}
        />
      ) : (
        <svg viewBox="0 0 160 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            {/* Head */}
            <ellipse cx="80" cy="36" rx="16" ry="20" fill="#0f0c29" />
            {/* Eyes */}
            <path d="M72 32 Q78 30 79 38 Q74 42 70 41 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M88 32 Q82 30 81 38 Q86 42 90 41 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" />
            {/* Head webbing */}
            <path d="M80 16 L80 56" strokeWidth="1" strokeOpacity="0.7" />
            <path d="M68 26 Q80 34 92 26" strokeWidth="1" strokeOpacity="0.7" />
            <path d="M66 44 Q80 50 94 44" strokeWidth="1" strokeOpacity="0.7" />

            {/* Neck */}
            <path d="M74 54 L74 62 M86 54 L86 62" />

            {/* Torso & Chest with Spider Emblem */}
            <path d="M62 62 C50 75 52 110 56 140 L104 140 C108 110 110 75 98 62 Z" fill="#0f0c29" />
            {/* Spider Chest Emblem */}
            <circle cx="80" cy="85" r="3.5" fill="#e74c3c" stroke="#ffffff" strokeWidth="1" />
            {/* Spider legs */}
            <path d="M78 83 Q68 76 66 68 M82 83 Q92 76 94 68" stroke="#ffffff" strokeWidth="1.8" />
            <path d="M77 85 Q65 85 64 78 M83 85 Q95 85 96 78" stroke="#ffffff" strokeWidth="1.8" />
            <path d="M77 87 Q65 92 66 100 M83 87 Q95 92 94 100" stroke="#ffffff" strokeWidth="1.8" />
            <path d="M78 88 Q70 102 68 112 M82 88 Q90 102 92 112" stroke="#ffffff" strokeWidth="1.8" />

            {/* Musculature & Suit Lines */}
            <path d="M80 62 L80 140" strokeWidth="1.2" strokeOpacity="0.6" />
            <path d="M66 95 Q80 102 94 95" strokeWidth="1" strokeOpacity="0.6" />
            <path d="M68 118 Q80 124 92 118" strokeWidth="1" strokeOpacity="0.6" />

            {/* Belt */}
            <path d="M56 140 L104 140 L100 152 L60 152 Z" fill="#e74c3c" fillOpacity="0.3" />
            <path d="M72 140 L72 152 M88 140 L88 152" strokeWidth="1.5" />

            {/* Left Arm */}
            <path d="M62 64 Q42 80 44 115 Q46 135 48 150 L56 148 Q54 130 52 110 Q50 85 66 74" fill="#0f0c29" />
            {/* Left Hand/Fist */}
            <ellipse cx="48" cy="156" rx="6" ry="8" fill="#e74c3c" fillOpacity="0.5" />

            {/* Right Arm */}
            <path d="M98 64 Q118 80 116 115 Q114 135 112 150 L104 148 Q106 130 108 110 Q110 85 94 74" fill="#0f0c29" />
            {/* Right Hand/Fist */}
            <ellipse cx="112" cy="156" rx="6" ry="8" fill="#e74c3c" fillOpacity="0.5" />

            {/* Left Leg */}
            <path d="M62 152 Q58 190 62 230 L56 268 L72 268 L76 230 Q74 190 78 152 Z" fill="#0f0c29" />
            {/* Left Boot */}
            <path d="M54 260 L74 260 L76 274 L48 274 Z" fill="#e74c3c" fillOpacity="0.4" />

            {/* Right Leg */}
            <path d="M98 152 Q102 190 98 230 L104 268 L88 268 L84 230 Q86 190 82 152 Z" fill="#0f0c29" />
            {/* Right Boot */}
            <path d="M106 260 L86 260 L84 274 L112 274 Z" fill="#e74c3c" fillOpacity="0.4" />
          </g>
        </svg>
      )}
    </>
  );
};

// Deep Space Radio Telescope Observatory (matching 1.png reference)
export const RadioTelescopeIllustration: React.FC<{ className?: string }> = ({ className = "w-64 h-64" }) => {
  return (
    <svg viewBox="0 0 240 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dishGrad" x1="40" y1="50" x2="200" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#85c1e9" />
          <stop offset="0.6" stopColor="#3498db" />
          <stop offset="1" stopColor="#1f4e79" />
        </linearGradient>
        <linearGradient id="standGrad" x1="100" y1="140" x2="190" y2="230" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f39c12" />
          <stop offset="1" stopColor="#d35400" />
        </linearGradient>
        <filter id="cosmicGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Signal Waves */}
      <path d="M60 40 Q40 20 20 10" stroke="#ff4b72" strokeWidth="2.5" strokeDasharray="4 4" opacity="0.7" />
      <path d="M75 28 Q50 10 30 0" stroke="#8e44ad" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
      <circle cx="165" cy="50" r="3" fill="#ffeaa7" />
      <circle cx="210" cy="80" r="2" fill="#74b9ff" />
      <circle cx="30" cy="120" r="2.5" fill="#55efc4" />

      {/* Main Parabolic Dish Oval */}
      <g transform="rotate(-25 125 95)">
        <ellipse cx="125" cy="95" rx="75" ry="48" fill="url(#dishGrad)" stroke="#111" strokeWidth="4" />
        {/* Parabolic Ribs / Grid Sections */}
        <ellipse cx="125" cy="95" rx="55" ry="34" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.6" />
        <ellipse cx="125" cy="95" rx="32" ry="18" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.6" />
        <line x1="50" y1="95" x2="200" y2="95" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="125" y1="47" x2="125" y2="143" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
        <line x1="72" y1="61" x2="178" y2="129" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="72" y1="129" x2="178" y2="61" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Central Receiver Sub-reflector Tripod */}
        <line x1="125" y1="95" x2="125" y2="28" stroke="#111" strokeWidth="4" />
        <line x1="70" y1="95" x2="125" y2="28" stroke="#111" strokeWidth="3" />
        <line x1="180" y1="95" x2="125" y2="28" stroke="#111" strokeWidth="3" />
        
        {/* Receiver Focus Cone */}
        <polygon points="118,32 132,32 125,18" fill="#e74c3c" stroke="#111" strokeWidth="2.5" />
        <circle cx="125" cy="18" r="5" fill="#f1c40f" stroke="#111" strokeWidth="2" />
        <circle cx="125" cy="18" r="1.5" fill="#ffffff" />
      </g>

      {/* Heavy Steel Articulated Mount & Gear Axis */}
      <circle cx="150" cy="155" r="14" fill="#34495e" stroke="#111" strokeWidth="4" />
      <circle cx="150" cy="155" r="6" fill="#ecf0f1" stroke="#111" strokeWidth="2" />

      {/* Hydraulic Support Struts */}
      <line x1="140" y1="165" x2="115" y2="205" stroke="#2c3e50" strokeWidth="8" strokeLinecap="round" />
      <line x1="140" y1="165" x2="115" y2="205" stroke="#7f8c8d" strokeWidth="4" strokeLinecap="round" />

      <line x1="160" y1="165" x2="185" y2="205" stroke="#2c3e50" strokeWidth="8" strokeLinecap="round" />
      <line x1="160" y1="165" x2="185" y2="205" stroke="#7f8c8d" strokeWidth="4" strokeLinecap="round" />

      {/* Base Foundation Platform */}
      <rect x="95" y="200" width="110" height="16" rx="4" fill="url(#standGrad)" stroke="#111" strokeWidth="4" />
      <rect x="105" y="216" width="90" height="8" rx="2" fill="#b9770e" stroke="#111" strokeWidth="3" />
      <circle cx="115" cy="208" r="3" fill="#2c3e50" />
      <circle cx="185" cy="208" r="3" fill="#2c3e50" />
    </svg>
  );
};

// Fun Astronaut Trivia Icons matching reference 4.jpeg
export const AstronautIcon: React.FC<{ type: "astronaut_surf" | "astronaut_rocket" | "astronaut_saturn" | "telescope" | "alien" | "galaxy"; className?: string }> = ({ type, className = "w-20 h-20" }) => {
  if (type === "astronaut_surf") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sky gradient badge */}
        <rect width="100" height="100" rx="18" fill="#a4b0be" />
        {/* Rocket Surfing */}
        <path d="M15 78 Q50 72 85 62 L80 50 Q45 60 18 64 Z" fill="#e74c3c" stroke="#2f3542" strokeWidth="2.5" />
        <ellipse cx="78" cy="56" rx="6" ry="10" fill="#ffffff" stroke="#2f3542" strokeWidth="2" />
        <polygon points="12,82 22,66 18,62 8,76" fill="#f1c40f" stroke="#2f3542" strokeWidth="1.5" />
        {/* Fire Thrust */}
        <path d="M12 80 Q2 86 6 92 Q15 88 18 84 Z" fill="#ff4757" />
        <path d="M10 82 Q4 86 7 89 Q13 86 15 84 Z" fill="#ffa502" />

        {/* Astronaut Standing */}
        {/* Legs */}
        <rect x="42" y="44" width="8" height="18" rx="4" fill="#ffffff" stroke="#2f3542" strokeWidth="2" />
        <rect x="54" y="42" width="8" height="16" rx="4" fill="#ffffff" stroke="#2f3542" strokeWidth="2" />
        {/* Body */}
        <ellipse cx="52" cy="36" rx="12" ry="14" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
        <rect x="47" y="32" width="10" height="8" rx="2" fill="#70a1ff" />
        {/* Helmet */}
        <circle cx="52" cy="18" r="11" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
        <ellipse cx="54" cy="18" rx="7" ry="6" fill="#2f3542" stroke="#ffa502" strokeWidth="1.5" />
        {/* Surfing Arm pose */}
        <path d="M40 34 Q30 30 25 36" stroke="#2f3542" strokeWidth="4" strokeLinecap="round" />
        <path d="M64 34 Q76 28 82 22" stroke="#2f3542" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "astronaut_rocket") {
    return (
      <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="18" fill="#747d8c" />
        {/* Rocket Riding */}
        <path d="M25 80 L75 35 Q85 22 75 18 Q62 18 50 30 L18 68 Z" fill="#ffffff" stroke="#2f3542" strokeWidth="3" />
        <polygon points="68,22 84,18 78,34" fill="#ff4757" stroke="#2f3542" strokeWidth="2" />
        <polygon points="20,72 10,88 28,84" fill="#ff4757" stroke="#2f3542" strokeWidth="2" />
        {/* Thruster Flame */}
        <path d="M12 85 Q-2 96 15 98 Q24 94 20 86 Z" fill="#ffa502" />
        <path d="M14 87 Q4 94 13 95 Q18 92 16 88 Z" fill="#ff4757" />

        {/* Astronaut on top */}
        <circle cx="50" cy="38" r="10" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
        <ellipse cx="52" cy="38" rx="6" ry="5" fill="#ffa502" stroke="#2f3542" strokeWidth="1.5" />
        <rect x="42" y="47" width="16" height="14" rx="5" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
      </svg>
    );
  }

  // Astronaut holding planet (Saturn)
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill="#f1f2f6" />
      {/* Saturn Planet held by astronaut */}
      <circle cx="36" cy="30" r="14" fill="#ffa502" stroke="#2f3542" strokeWidth="2.5" />
      {/* Saturn Ring */}
      <ellipse cx="36" cy="30" rx="24" ry="7" fill="none" stroke="#ff6348" strokeWidth="3.5" transform="rotate(-20 36 30)" />

      {/* Astronaut */}
      <circle cx="64" cy="34" r="11" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
      <ellipse cx="62" cy="34" rx="7" ry="6" fill="#2f3542" stroke="#ffa502" strokeWidth="1.5" />
      {/* Body & Arms hugging planet */}
      <rect x="56" y="45" width="18" height="22" rx="7" fill="#ffffff" stroke="#2f3542" strokeWidth="2.5" />
      <path d="M58 50 Q46 44 42 36" stroke="#2f3542" strokeWidth="4" strokeLinecap="round" />
      {/* Legs */}
      <rect x="58" y="67" width="6" height="18" rx="3" fill="#ffffff" stroke="#2f3542" strokeWidth="2" />
      <rect x="68" y="67" width="6" height="18" rx="3" fill="#ffffff" stroke="#2f3542" strokeWidth="2" />
    </svg>
  );
};

// Decorative Comic Asteroid / Exoplanet (from reference 5.jpeg)
export const CartoonAsteroid: React.FC<{ type: "green" | "orange"; className?: string }> = ({ type, className = "w-28 h-28" }) => {
  if (type === "green") {
    return (
      <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="16" fill="#0f0c29" />
        <circle cx="15" cy="20" r="1.5" fill="#70a1ff" />
        <circle cx="105" cy="25" r="2" fill="#70a1ff" />
        <circle cx="20" cy="95" r="2" fill="#70a1ff" />
        
        {/* Green Meteor with craters */}
        <path
          d="M60 18 C85 18 102 38 98 68 C95 92 78 105 52 102 C28 99 15 78 18 52 C21 28 38 18 60 18 Z"
          fill="#2ed573"
          stroke="#111"
          strokeWidth="3.5"
        />
        <ellipse cx="42" cy="42" rx="10" ry="12" fill="#1e90ff" stroke="#111" strokeWidth="2.5" />
        <ellipse cx="78" cy="48" rx="9" ry="10" fill="#1e90ff" stroke="#111" strokeWidth="2.5" />
        <ellipse cx="64" cy="74" rx="12" ry="14" fill="#1e90ff" stroke="#111" strokeWidth="2.5" />
        <ellipse cx="36" cy="78" rx="6" ry="7" fill="#1e90ff" stroke="#111" strokeWidth="2" />
        <ellipse cx="90" cy="76" rx="5" ry="6" fill="#1e90ff" stroke="#111" strokeWidth="2" />
      </svg>
    );
  }

  // Orange Planet with Orbiting Rings
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="16" fill="#0f0c29" />
      {/* Orbit Rings */}
      <ellipse cx="60" cy="60" rx="52" ry="18" fill="none" stroke="#ffa502" strokeWidth="2" strokeDasharray="3 3" transform="rotate(-25 60 60)" />
      <ellipse cx="60" cy="60" rx="46" ry="24" fill="none" stroke="#ff7f50" strokeWidth="1.5" transform="rotate(35 60 60)" />
      <circle cx="95" cy="40" r="3" fill="#ffeaa7" />
      <circle cx="24" cy="75" r="2.5" fill="#ffeaa7" />

      {/* Orange Gas Planet */}
      <circle cx="60" cy="60" r="38" fill="#ff7f50" stroke="#111" strokeWidth="3.5" />
      <ellipse cx="48" cy="48" rx="8" ry="10" fill="#d35400" stroke="#111" strokeWidth="2" />
      <ellipse cx="74" cy="54" rx="7" ry="8" fill="#d35400" stroke="#111" strokeWidth="2" />
      <ellipse cx="58" cy="76" rx="9" ry="11" fill="#d35400" stroke="#111" strokeWidth="2" />
      <ellipse cx="80" cy="72" rx="5" ry="6" fill="#d35400" stroke="#111" strokeWidth="1.5" />
    </svg>
  );
};
