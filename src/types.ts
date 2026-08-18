export interface Planet {
  id: number;
  name: string;
  subtitle: string;
  tagline: string;
  distance: string; // e.g. "4.24 light-years"
  distanceFromEarthNum: number; // for sorting/meters
  starInfo: string; // e.g. "Proxima Centauri (M-type red dwarf)"
  mass: string; // e.g. "1.17 Earth masses"
  radius: string; // e.g. "1.08 Earth radii"
  orbitalDuration: string; // e.g. "11.2 Earth days"
  surfaceTemp: string; // e.g. "-39°C to 0°C"
  potentialHabitability: string; // e.g. "High (Habitable Zone candidate)"
  atmosphere: string; // e.g. "Nitrogen, Carbon Dioxide trace"
  discoveryYear: number;
  type: "Terrestrial" | "Super-Earth" | "Gas Giant" | "Hot Jupiter" | "Ice Giant" | "Lava World";
  description: string;
  visualConfig: {
    primaryColor: string;
    secondaryColor: string;
    atmosphereColor: string;
    hasRings?: boolean;
    ringColor?: string;
    ringInnerRadius?: number;
    ringOuterRadius?: number;
    surfacePattern: "terrestrial" | "gas_stripes" | "lava_cracks" | "ice_crystals" | "cloudy_ocean" | "toxic_swirls";
    roughness: number;
    cloudLayer?: boolean;
    emissiveColor?: string;
    emissiveIntensity?: number;
  };
}

export interface TriviaQuestion {
  id: number;
  question: string;
  answer: string;
  details: string;
  category: string;
  iconType: "astronaut_surf" | "astronaut_rocket" | "astronaut_saturn" | "telescope" | "alien" | "galaxy";
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
  avatarSeed: string;
}

export type PageRoute = "login" | "home" | "exoplanets" | "planet" | "exploration" | "trivia" | "news";
