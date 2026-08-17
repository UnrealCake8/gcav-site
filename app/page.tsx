import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { GameCard } from "@/components/GameCard";
import { featuredGames, games } from "@/content/games";
import { news } from "@/content/news";

export default function Home() {
  return (
    <>
      <HeroCarousel items={featuredGames} />

      <section className="section games-section cinematic-section" data-reveal>
        <div className="section-head cinematic-head">
          <div>
            <p className="eyebrow">SELECT YOUR WORLD</p>
            <h2>Games</h2>
          </div>
          <Link className="text-link playful-link" href="/games">View all <span>↗</span></Link>
        </div>
        <div className="games-grid cinematic-games">
          {games.map((game) => <GameCard key={game.slug} game={game} />)}
        </div>
      </section>

      <section className="section news-preview cinematic-news" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">MISSION FEED</p>
            <h2>Latest</h2>
          </div>
          <Link className="text-link playful-link" href="/newswire">View news <span>↗</span></Link>
        </div>
        {news.length === 0 ? (
          <Link className="news-placeholder mission-card" href="/newswire">
            <span className="eyebrow">LOCKED FOR NOW</span>
            <strong>Development updates will appear here.</strong>
            <span className="news-arrow">↗</span>
          </Link>
        ) : null}
      </section>

      <section className="social-callout" data-reveal>
        <div>
          <p className="eyebrow">JOIN THE LOBBY</p>
          <h2>Follow the studio.</h2>
        </div>
        <Link className="button light-button pulse-button" href="/community">Community</Link>
      </section>
    </>
  );
}
