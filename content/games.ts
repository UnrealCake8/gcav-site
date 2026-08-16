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

export const games: Game[] = [
  {
    slug: "grand-chamak-auto-v",

    title: "Grand Chamak Auto V",

    tagline: "Experience Dubai in Roblox.",

    description:
      "Explore a Roblox experience inspired by Dubai and the UAE. Drive across the city, discover new locations, meet other players, and experience an open world built around cars, exploration, and life in the Emirates.",

    heroImage: "https://i.postimg.cc/HWrz2Sdw/Chat-GPT-Image-Aug-16-2026-03-41-54-PM.png",

    heroPosition: "center 45%",

    logoImage:
      "https://unrealcake8.site/cdn-hls/222dac3ce3967790b23084c7e001da3d%7Etplv-tiktokx-cropcenter_1080_1080.jpg",

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

    screenshots: [],

    developmentNote:
      "Grand Chamak Auto V is currently in development. Features, locations, vehicles, and gameplay may change as development continues."
  }
];

export const featuredGames = games.filter((game) => game.featured);

export const getGame = (slug: string) =>
  games.find((game) => game.slug === slug);
