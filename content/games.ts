export type Game = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroPosition?: string;
  logoImage?: string;
  platform?: string;
  status?: string;
  robloxUrl?: string;
  discordUrl?: string;
  featured?: boolean;
  features?: string[];
  screenshots?: { src: string; alt: string }[];
  developmentNote?: string;
};

const gcavBase = "/games/grand-chamak-auto-v";

export const games: Game[] = [
  {
    slug: "grand-chamak-auto-v",
    title: "Grand Chamak Auto V",
    tagline: "Experience Dubai in Roblox.",
    description:
      "Explore a Roblox experience inspired by Dubai and the UAE. Drive across the city, discover new locations, meet other players, and experience an open world built around cars, exploration, and life in the Emirates.",
    heroImage: `${gcavBase}/COVER.webp`,
    heroPosition: "center 48%",
    logoImage: `${gcavBase}/grandchamakautoV.webp`,
    platform: "Roblox",
    status: "In Development",
    robloxUrl: "",
    discordUrl: "https://discord.gg/mfhH6ZrTpX",
    featured: true,
    features: [
      "Explore an open world inspired by Dubai",
      "Drive a variety of vehicles",
      "Discover locations across the city",
      "Explore with friends and other players",
      "Earn money through activities and jobs"
    ],
    screenshots: [
      { src: `${gcavBase}/Picture1.webp`, alt: "Grand Chamak Auto V rider performing a wheelie by the beach" },
      { src: `${gcavBase}/Picture2.webp`, alt: "Grand Chamak Auto V jet ski scene near Burj Al Arab" },
      { src: `${gcavBase}/Picture3.webp`, alt: "Grand Chamak Auto V character looking across the Dubai skyline" },
      { src: `${gcavBase}/Picture5.webp`, alt: "Grand Chamak Auto V bike scene at Dubai Marina" },
      { src: `${gcavBase}/Picture6.webp`, alt: "Grand Chamak Auto V dirham artwork" },
      { src: `${gcavBase}/Picture7.webp`, alt: "Grand Chamak Auto V Jumeirah beach scene" }
    ],
    developmentNote:
      "Grand Chamak Auto V is currently in development. Features, locations, vehicles, and gameplay may change as development continues."
  },
  {
    slug: "aero-horizon",
    title: "Aero Horizon: Flight Simulator 27",
    tagline: "Take to the skies.",
    description:
      "A flight simulation project from Malouks Games focused on the experience of aviation, aircraft and long-haul flying. More details will be revealed as development continues.",
    heroImage: `${gcavBase}/AERO_HORIZON_2.webp`,
    heroPosition: "center 48%",
    logoImage: `${gcavBase}/AERO_HORIZON_1.webp`,
    platform: "Roblox",
    status: "In Development",
    robloxUrl: "",
    discordUrl: "https://discord.gg/mfhH6ZrTpX",
    featured: true,
    features: [
      "Aviation-focused gameplay",
      "Large commercial aircraft",
      "Scenic high-altitude flying",
      "A growing flight simulator experience"
    ],
    screenshots: [
      { src: `${gcavBase}/AERO_HORIZON_2.webp`, alt: "Aero Horizon aircraft flying above the clouds" }
    ],
    developmentNote:
      "Aero Horizon: Flight Simulator 27 is currently in development. Aircraft, environments and gameplay details may change before release."
  }
];

export const featuredGames = games.filter((game) => game.featured);

export const getGame = (slug: string) =>
  games.find((game) => game.slug === slug);
