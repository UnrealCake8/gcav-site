export type SocialLink = { label: string; url: string };
// Add real URLs here. Empty URLs are never rendered as links.
export const socialLinks: SocialLink[] = [
  { label: "Discord", url: "" },
  { label: "Roblox", url: "" },
  { label: "YouTube", url: "" },
  { label: "X / Twitter", url: "" },
  { label: "TikTok", url: "" },
];
export const activeSocialLinks = socialLinks.filter((item) => item.url);
