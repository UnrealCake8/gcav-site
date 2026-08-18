import Image from "next/image";
import Link from "next/link";
import { featuredGames, games } from "@/content/games";
import { getSortedNews } from "@/content/news";
import styles from "./MobileHome.module.css";

export function MobileHome() {
  const featured = featuredGames[0] ?? games[0];
  const latestNews = getSortedNews().slice(0, 3);

  if (!featured) return null;

  return (
    <div className={styles.mobileExperience}>
      <section className={styles.hero}>
        <Image
          src={featured.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
          style={{ objectPosition: featured.heroPosition }}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroGrid} />
        <div className={styles.heroContent}>
          <div className={styles.heroMeta}>
            <span>{featured.status ?? "Featured"}</span>
            <span>{featured.platform ?? "Game"}</span>
          </div>
          {featured.logoImage ? (
            <Image
              src={featured.logoImage}
              alt={`${featured.title} logo`}
              width={620}
              height={300}
              className={styles.gameLogo}
            />
          ) : (
            <h1>{featured.title}</h1>
          )}
          <p>{featured.tagline}</p>
          <div className={styles.heroActions}>
            <Link href={`/games/${featured.slug}`} className={styles.primaryButton}>ENTER WORLD <b>↗</b></Link>
            <Link href="/games" className={styles.secondaryButton}>ALL GAMES</Link>
          </div>
        </div>
        <div className={styles.scrollCue}>SWIPE UP <span>↓</span></div>
      </section>

      <main className={styles.feed}>
        <section className={styles.worlds}>
          <div className={styles.sectionTitle}>
            <div>
              <span>01 | WORLDS</span>
              <h2>Choose where to go next.</h2>
            </div>
          </div>

          <div className={styles.gameRail}>
            {games.map((game, index) => (
              <Link href={`/games/${game.slug}`} className={styles.gameTile} key={game.slug}>
                <div className={styles.gameArt}>
                  <Image src={game.heroImage} alt="" fill sizes="88vw" style={{ objectPosition: game.heroPosition }} />
                  <div className={styles.gameArtShade} />
                  <span className={styles.gameNumber}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.gamePlatform}>{game.platform ?? "Game"}</span>
                </div>
                <div className={styles.gameInfo}>
                  <div>
                    <strong>{game.title}</strong>
                    <span>{game.tagline}</span>
                  </div>
                  <b>↗</b>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.newsSection}>
          <div className={styles.sectionTitle}>
            <div>
              <span>02 | NEWSWIRE</span>
              <h2>Latest transmissions.</h2>
            </div>
            <Link href="/news">VIEW ALL ↗</Link>
          </div>

          <div className={styles.newsStack}>
            {latestNews.length ? latestNews.map((post, index) => (
              <Link href={`/news/${post.slug}`} className={styles.newsCard} key={post.slug}>
                <span className={styles.newsNumber}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <span className={styles.newsMeta}>{post.category} | {post.date}</span>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </div>
                <b>↗</b>
              </Link>
            )) : (
              <Link href="/news" className={styles.emptyNews}>
                <span>NO TRANSMISSIONS YET</span>
                <strong>Development updates will land here.</strong>
                <b>↗</b>
              </Link>
            )}
          </div>
        </section>

        <section className={styles.communityCard}>
          <span>03 | COMMUNITY</span>
          <h2>Get closer to what we build.</h2>
          <p>Follow development, see screenshots early, and jump into the official community.</p>
          <Link href="/community">OPEN COMMUNITY <b>↗</b></Link>
        </section>

        <div className={styles.mobileFooter}>
          <strong>Malouk&apos;s Games</strong>
          <span>Independent worlds, built differently.</span>
        </div>
      </main>
    </div>
  );
}
