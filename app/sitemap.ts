import type { MetadataRoute } from "next"; import { site } from "@/content/site"; import { games } from "@/content/games";
export const dynamic = "force-static";
export default function sitemap():MetadataRoute.Sitemap{return ["","/games","/newswire","/developer","/community",...games.map(g=>`/games/${g.slug}`)].map(path=>({url:`${site.siteUrl}${path}`,changeFrequency:"monthly"}))}
