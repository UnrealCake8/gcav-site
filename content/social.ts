export type SocialLink = { label: string; url: string };

export const socialLinks: SocialLink[] = [
  { label: "Discord", url: "https://discord.gg/mfhH6ZrTpX" },
  { label: "YouTube", url: "https://youtube.com/@MalouksGames" },
  { label: "Instagram", url: "https://instagram.com/malouksgames" },
  { label: "X / Twitter", url: "https://x.com/malouksgames" },
  { label: "TikTok", url: "https://www.tiktok.com/@hackedgameslol" },
  { label: "Roblox", url: "" },
];

export const activeSocialLinks = socialLinks.filter((item) => item.url);
