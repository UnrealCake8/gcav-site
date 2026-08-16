import type { Metadata } from "next"; import { PageHero } from "@/components/PageHero"; import { GameCard } from "@/components/GameCard"; import { games } from "@/content/games";
export const metadata:Metadata={title:"Games",description:"Explore the studio's current games."};
export default function Games(){return <><PageHero kicker="OUR WORK" title="Games" description="Explore the worlds currently listed by the studio."/><section className="section"><div className="games-grid">{games.map(g=><GameCard key={g.slug} game={g}/>)}</div></section></>}
