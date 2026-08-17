import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { GameCard } from "@/components/GameCard";
import { featuredGames, games } from "@/content/games";
import { news } from "@/content/news";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <HeroCarousel items={featuredGames} />

      <section className="studio-strip" aria-label="Studio overview">
        <div>
          <span>Independent</span>
          <b>Game Studio</b>
        </div>
        <div>
          <span>Current Projects</span>
          <b>{games.length}</b>
        </div>
        <div>
          <span>Built Around</span>
          <b>Players & Worlds</b>
        </div>
      </section>

      <section className="section games-section">
        <div className="section-head">
          <div>
            <p className="eyebrow">THE LINEUP</p>
            <h2>Our Games</h2>
          </div>
          <Link className="text-link" href="/games">View all <span>↗</span></Link>
        </div>
        <div className="games-grid">
          {games.map((game) => <GameCard key={game.slug} game={game} />)}
        </div>
      </section>

      <section className="section statement-section">
        <p className="eyebrow">WHAT WE MAKE</p>
        <div className="statement-grid">
          <h2>Places you can get lost in.</h2>
          <div>
            <p>We build game experiences around exploration, vehicles, memorable locations and the freedom to make your own fun.</p>
            <Link className="text-link" href="/developer">About the studio <span>↗</span></Link>
          </div>
        </div>
      </section>

      <section className="section news-preview">
        <div className="section-head">
          <div>
            <p className="eyebrow">FROM THE STUDIO</p>
            <h2>Latest Updates</h2>
          </div>
          <Link className="text-link" href="/newswire">Newswire <span>↗</span></Link>
        </div>
        {news.length === 0 ? (
          <div className="empty compact-empty">
            <span>NO TRANSMISSIONS YET</span>
            <h3>Development updates are on the way.</h3>
            <p>Official announcements and progress notes will appear here.</p>
          </div>
        ) : null}
      </section>

      <section className="about section">
        <div>
          <p className="eyebrow">ABOUT THE STUDIO</p>
          <h2>A home for<br />new worlds.</h2>
        </div>
        <div className="about-copy">
          <p>{site.description}</p>
          <Link className="text-link" href="/developer">Meet the studio <span>↗</span></Link>
        </div>
        <div className="signal" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      </section>

      <section className="community-banner section">
        <div>
          <p className="eyebrow">FOLLOW THE STUDIO</p>
          <h2>See what we&apos;re building.</h2>
          <p>Find every official Malouks Games community and social channel in one place.</p>
        </div>
        <Link className="button primary" href="/community">Community & Socials</Link>
      </section>
    </>
  );
}
