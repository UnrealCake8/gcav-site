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
      <header className={styles.topbar}>
        <Link href="/" className={styles.brand} aria-label="Unrealdrop Games home">
          <span className={styles.brandMark}>U</span>
          <span>UNREALDROP</span>
        </Link>
        <Link href="/news" className={styles.topAction}>NEWS</Link>
      </header>

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
        <div className={styles.heroContent}>
          <span className={styles.status}>{featured.status ?? "Featured"}</span>
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
            <Link href={`/games/${featured.slug}`} className={styles.primaryButton}>EXPLORE</Link>
            {featured.robloxUrl ? (
              <a href={featured.robloxUrl} className={styles.iconButton} aria-label="Play on Roblox">↗</a>
            ) : (
              <Link href="/games" className={styles.iconButton} aria-label="View all games">→</Link>
            )}
          </div>
        </div>
        <div className={styles.swipeHint}>SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <main className={styles.feed}>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <div>
              <span>01 / GAMES</span>
              <h2>Pick a world.</h2>
            </div>
            <Link href="/games">ALL ↗</Link>
          </div>

          <div className={styles.gameRail}>
            {games.map((game) => (
              <Link href={`/games/${game.slug}`} className={styles.gameTile} key={game.slug}>
                <div className={styles.gameArt}>
                  <Image src={game.heroImage} alt="" fill sizes="82vw" style={{ objectPosition: game.heroPosition }} />
                  <div className={styles.gameArtShade} />
                  <span className={styles.gamePlatform}>{game.platform ?? "Game"}</span>
                </div>
                <div className={styles.gameInfo}>
                  <div>
                    <strong>{game.title}</strong>
                    <span>{game.status ?? "In Development"}</span>
                  </div>
                  <b>↗</b>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <div>
              <span>02 / NEWSWIRE</span>
              <h2>What&apos;s happening.</h2>
            </div>
            <Link href="/news">ALL ↗</Link>
          </div>

          <div className={styles.newsStack}>
            {latestNews.length ? latestNews.map((post, index) => (
              <Link href={`/news/${post.slug}`} className={styles.newsCard} key={post.slug}>
                <span className={styles.newsNumber}>0{index + 1}</span>
                <div>
                  <span className={styles.newsMeta}>{post.category} · {post.date}</span>
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
          <span>03 / COMMUNITY</span>
          <h2>Don&apos;t just watch.</h2>
          <p>Follow development, see what we&apos;re building and jump into the community.</p>
          <Link href="/community">ENTER COMMUNITY <b>↗</b></Link>
        </section>

        <div className={styles.mobileFooter}>
          <strong>UNREALDROP GAMES</strong>
          <span>Independent games. Built differently.</span>
        </div>
      </main>

      <nav className={styles.bottomNav} aria-label="Mobile navigation">
        <Link href="/"><span>⌂</span><b>HOME</b></Link>
        <Link href="/games"><span>◇</span><b>GAMES</b></Link>
        <Link href="/news"><span>▤</span><b>NEWS</b></Link>
        <Link href="/community"><span>◎</span><b>COMMUNITY</b></Link>
      </nav>
    </div>
  );
}
