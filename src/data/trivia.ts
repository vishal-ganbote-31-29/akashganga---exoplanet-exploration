import { TriviaQuestion } from "../types";

export const TRIVIA_DATA: TriviaQuestion[] = [
  {
    id: 1,
    question: "What planet has a day longer than its year?",
    answer: "Venus",
    details: "Venus rotates extremely slowly on its axis once every 243 Earth days, but takes only 225 Earth days to complete an orbit around the Sun. Thus, one Venusian sidereal day is longer than its entire year!",
    category: "Planetary Science",
    iconType: "astronaut_surf"
  },
  {
    id: 2,
    question: "What is hiding beneath the thick clouds of Venus?",
    answer: "Thousands of volcanoes and molten basalt plains",
    details: "Underneath Venus's crushing sulfuric acid atmosphere lies a hellish landscape of over 1,600 major volcanoes, vast lava channels extending thousands of kilometers, and surface pressures 90 times that of Earth.",
    category: "Atmosphere & Geology",
    iconType: "astronaut_rocket"
  },
  {
    id: 3,
    question: "Why does Uranus rotate on its side?",
    answer: "Cataclysmic ancient giant collision",
    details: "Uranus has an extreme axial tilt of 97.77 degrees! Astronomers deduce that billions of years ago, a proto-planet roughly twice Earth's mass struck Uranus, knocking its axis completely on its side.",
    category: "Cosmic Collisions",
    iconType: "astronaut_saturn"
  },
  {
    id: 4,
    question: "What was the very first exoplanet ever discovered orbiting a Sun-like star?",
    answer: "51 Pegasi b (Dimidium)",
    details: "Discovered in 1995 by Michel Mayor and Didier Queloz (awarded the 2019 Nobel Prize in Physics), this 'Hot Jupiter' orbits its star in just 4.2 Earth days, forever changing humanity's understanding of planetary systems.",
    category: "Exoplanet History",
    iconType: "telescope"
  },
  {
    id: 5,
    question: "What unusual substance rains down from the skies of HD 189733b?",
    answer: "Sideways molten glass (silicates)",
    details: "Driven by blistering 8,700 km/h equatorial jet streams and blistering 900°C temperatures, condensed silicate particles condense in the atmosphere to unleash sideways torrents of molten glass rain.",
    category: "Extreme Exoplanets",
    iconType: "galaxy"
  },
  {
    id: 6,
    question: "Which exoplanet is nicknamed the 'Diamond Planet'?",
    answer: "55 Cancri e (Janssen)",
    details: "Due to high carbon abundance and immense internal heat and pressure, astrophysicists model that up to one-third of 55 Cancri e's mass could be comprised of pure diamond and graphite layers.",
    category: "Exotic Materials",
    iconType: "alien"
  }
];
