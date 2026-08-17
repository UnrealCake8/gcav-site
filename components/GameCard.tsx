import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/content/games";

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="game-card">
      <Link className="game-card-link" href={`/games/${game.slug}`} aria-label={`View ${game.title}`}>
        <Image
          src={game.heroImage}
          alt={`${game.title} key art`}
          fill
          sizes="100vw"
          style={{ objectPosition: game.heroPosition }}
        />
        <div className="game-card-shade" />
        <div className="game-card-overlay">
          {game.logoImage ? (
            <Image className="card-game-logo" src={game.logoImage} alt={game.title} width={520} height={220} />
          ) : (
            <h3>{game.title}</h3>
          )}
          <div className="game-card-meta">
            <span>{[game.status, game.platform].filter(Boolean).join(" / ")}</span>
            <b>Explore ↗</b>
          </div>
        </div>
      </Link>
    </article>
  );
}
