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

/*
  HOW TO ADD AN ARTICLE

  1. Copy the example object below into the `news` array.
  2. Give it a unique `slug`, for example: "grand-chamak-auto-v-update".
  3. Put images in /public/news and reference them like: "/news/my-image.jpg".
  4. Build the article using paragraph, heading and image blocks.

  Example:

  {
    slug: "example-update",
    title: "Example update",
    date: "2026-08-17",
    author: "Unrealdrop Games",
    category: "Development Update",
    excerpt: "A short description shown on the news page.",
    heroImage: "/news/example-hero.jpg",
    heroAlt: "Example screenshot",
    featured: true,
    body: [
      { type: "paragraph", text: "Your first paragraph goes here." },
      { type: "heading", text: "A section heading" },
      { type: "paragraph", text: "More article text goes here." },
      {
        type: "image",
        src: "/news/example-screenshot.jpg",
        alt: "Description of the screenshot",
        caption: "Optional caption shown under the image."
      }
    ]
  }
*/

export const news: NewsPost[] = [];

export function getNewsPost(slug: string) {
  return news.find((post) => post.slug === slug);
}

export function getSortedNews() {
  return [...news].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
