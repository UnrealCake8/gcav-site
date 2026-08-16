export type SocialLink = { label: string; url: string };
// Add real URLs here. Empty URLs are never rendered as links.
export const socialLinks: SocialLink[] = [
  { label: "Discord", url: "https://discord.gg/mfhH6ZrTpX" },
  { label: "Roblox", url: "" },
  { label: "YouTube", url: "" },
  { label: "X / Twitter", url: "https://x.com/malouksgames" },
  { label: "TikTok", url: "https://www.tiktok.com/@hackedgameslol" },
];
export const activeSocialLinks = socialLinks.filter((item) => item.url);
