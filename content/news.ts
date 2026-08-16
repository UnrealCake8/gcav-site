export type NewsPost = { slug: string; title: string; date: string; category: "Development Update"|"Announcement"|"Screenshot"|"Release Notes"|"Studio Update"; excerpt: string; heroImage?: string; body: string[] };
// Add verified studio posts here. The site provides a polished empty state meanwhile.
export const news: NewsPost[] = [];
