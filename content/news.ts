export type NewsCategory =
  | "Development Update"
  | "Announcement"
  | "Screenshot"
  | "Release Notes"
  | "Studio Update";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  category: NewsCategory;
  excerpt: string;
  heroImage?: string;
  heroAlt?: string;
  featured?: boolean;
  body: NewsBlock[];
};

export const news: NewsPost[] = [
  {
    slug: "welcome",
    title: "Welcome to our News Page!",
    date: "2026-08-17",
    author: "WebDev1",
    category: "Development Update",
    excerpt: "In this article, we tell you all about updates related to our games!",
    heroImage: "https://malouksgames.com/games/grand-chamak-auto-v/COVER.webp",
    heroAlt: "Grand Chamak Auto's logo, one of the games being developed here at Malouk's Games!",
    featured: true,
    body: [
      {
        type: "heading",
        text: "Welcome!",
      },
      {
        type: "paragraph",
        text: "I'm unrealdrop, and this is the Malouk's Games News page! We will post updates regarding our games, developer positions, and so much more! This is so you can get the latest scoop, on what's going on :) If you want the latest scoop, join the Discord and follow us!",
      },
      {
        type: "heading",
        text: "Sneak peek on our game!",
      },
      {
        type: "image",
        src: "https://malouksgames.com/games/grand-chamak-auto-v/AERO_HORIZON_2.webp",
        alt: "AHFS27",
        caption: "A preview of our Flight Simulator, Aero Horizon Flight Simulator 2027, aka AHFS27 for short!",
      },
    ],
  },
];

export function getNewsPost(slug: string) {
  return news.find((post) => post.slug === slug);
}

export function getSortedNews() {
  return [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
