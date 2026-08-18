import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "Games",
  description: "Explore the worlds currently in development at Malouk's Games.",
};

export default function Games() {
  return (
    <>
      <section className="games-showcase-hero">
        <div className="games-showcase-copy">
          <p className="eyebrow">MALOUK&apos;S GAMES / WORLDS</p>
          <h1>Pick your world.</h1>
          <p>From city streets to open skies, every project is built to feel like somewhere worth staying.</p>
        </div>
        <div className="games-showcase-count">{String(games.length).padStart(2, "0")} ACTIVE PROJECTS</div>
      </section>

      <section className="games-showcase-list">
        {games.map((game, index) => (
          <Link href={`/games/${game.slug}`} className="games-showcase-card" key={game.slug} data-reveal>
            <div className="games-showcase-media">
              <Image src={game.heroImage} alt={`${game.title} key art`} fill sizes="100vw" style={{ objectPosition: game.heroPosition }} />
              <div className="games-showcase-shade" />
            </div>
            <div className="games-showcase-card-copy">
              <span className="games-showcase-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <div className="games-showcase-meta">{[game.status, game.platform].filter(Boolean).join(" / ")}</div>
                {game.logoImage ? (
                  <Image className="games-showcase-logo" src={game.logoImage} alt={`${game.title} logo`} width={700} height={300} />
                ) : (
                  <h2>{game.title}</h2>
                )}
                <p>{game.tagline}</p>
              </div>
              <b>ENTER WORLD ↗</b>
            </div>
          </Link>
        ))}
      </section>

      <section className="page-signoff" data-reveal>
        <div>
          <p className="eyebrow">BEHIND THE GAMES</p>
          <h2>See what we&apos;re building next.</h2>
        </div>
        <Link href="/news" className="button light-button">Open Newswire</Link>
      </section>
    </>
  );
}
