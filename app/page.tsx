import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { GameCard } from "@/components/GameCard";
import { MobileHome } from "@/components/MobileHome";
import { WorldSelector } from "@/components/WorldSelector";
import { featuredGames, games } from "@/content/games";
import { getSortedNews } from "@/content/news";

export default function Home() {
  const latestNews = getSortedNews().slice(0, 4);
  const featuredStory = latestNews[0];
  const secondaryStories = latestNews.slice(1);

  return (
    <>
      <style>{`
        @media (max-width: 760px) {
          .desktop-home-experience { display: none !important; }
        }
        @media (min-width: 761px) {
          .desktop-home-experience { display: block; }
        }
      `}</style>

      <MobileHome />

      <div className="desktop-home-experience">
        <HeroCarousel items={featuredGames} />

        <section className="section news-preview cinematic-news home-news-editorial" data-reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">NEWSWIRE</p>
              <h2>Latest</h2>
            </div>
            <Link className="text-link playful-link" href="/news">View all news <span>↗</span></Link>
          </div>

          {!featuredStory ? (
            <Link className="news-placeholder mission-card" href="/news">
              <span className="eyebrow">LOCKED FOR NOW</span>
              <strong>Development updates will appear here.</strong>
              <span className="news-arrow">↗</span>
            </Link>
          ) : (
            <div className="editorial-news-grid">
              <Link className="featured-news-story" href={`/news/${featuredStory.slug}`}>
                {featuredStory.heroImage && (
                  <div className="featured-news-media">
                    <Image
                      src={featuredStory.heroImage}
                      alt={featuredStory.heroAlt || featuredStory.title}
                      fill
                      sizes="(max-width: 1100px) 100vw, 66vw"
                    />
                  </div>
                )}
                <div className="featured-news-copy">
                  <span className="home-news-meta">{featuredStory.category} · {featuredStory.date}</span>
                  <strong>{featuredStory.title}</strong>
                  <p>{featuredStory.excerpt}</p>
                  <span className="news-read-more">Read story ↗</span>
                </div>
              </Link>

              {secondaryStories.length > 0 && (
                <div className="home-news-list compact-news-list">
                  {secondaryStories.map((post) => (
                    <Link className="home-news-link" href={`/news/${post.slug}`} key={post.slug}>
                      <span className="home-news-meta">{post.category} · {post.date}</span>
                      <strong>{post.title}</strong>
                      <span>↗</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        <WorldSelector games={games} />

        <section className="section games-section cinematic-section" data-reveal>
          <div className="section-head cinematic-head">
            <div>
              <p className="eyebrow">ALL PROJECTS</p>
              <h2>Games</h2>
            </div>
            <Link className="text-link playful-link" href="/games">View all <span>↗</span></Link>
          </div>
          <div className="games-grid cinematic-games">
            {games.map((game) => <GameCard key={game.slug} game={game} />)}
          </div>
        </section>

        <section className="social-callout studio-finale" data-reveal>
          <div>
            <p className="eyebrow">MALOUK&apos;S GAMES</p>
            <h2>See what comes next.</h2>
            <p className="finale-copy">Follow development, catch new screenshots, and be there when the next world opens.</p>
          </div>
          <div className="finale-actions">
            <Link className="button light-button" href="/community">Enter Community</Link>
            <Link className="finale-news-link" href="/news">Read the Newswire ↗</Link>
          </div>
        </section>
      </div>
    </>
  );
}
