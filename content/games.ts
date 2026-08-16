export type Game = {
  slug: string; title: string; tagline: string; description: string; heroImage: string;
  heroPosition?: string; logoImage?: string; platform?: string; status?: string;
  robloxUrl?: string; discordUrl?: string; featured?: boolean; features?: string[];
  screenshots?: { src: string; alt: string }[]; developmentNote?: string;
};
export const games: Game[] = [{
  slug: "grand-chamak-auto-v",
  title: "Grand Chamak Auto V",
  tagline: "Experience Dubai in Roblox.",
  description: "",
  heroImage: "/games/grand-chamak-auto-v/hero.svg",
  heroPosition: "center 45%",
  logoImage: "",
  platform: "Roblox",
  status: "",
  robloxUrl: "",
  discordUrl: "",
  featured: true,
  features: [], screenshots: [], developmentNote: "",
}];
export const featuredGames = games.filter((game) => game.featured);
export const getGame = (slug: string) => games.find((game) => game.slug === slug);
