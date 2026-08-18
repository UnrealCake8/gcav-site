import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { GameGallery } from "@/components/GameGallery";
import { games, getGame } from "@/content/games";

export function generateStaticParams() {
  return games.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const game = getGame((await params).slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.description || game.tagline,
    openGraph: {
      title: game.title,
      description: game.description || game.tagline,
      images: [game.heroImage]
    }
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const game = getGame((await params).slug);
  if (!game) notFound();

  const hasDetails = game.description || game.features?.length || game.developmentNote;

  return (
    <>
      <section className="game-hero">
        <Image
          src={game.heroImage}
          alt={`${game.title} key art`}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: game.heroPosition }}
        />
        <div className="hero-wash" />
        <div className="game-hero-content">
          <p className="eyebrow">{[game.status, game.platform].filter(Boolean).join(" · ")}</p>
          {game.logoImage ? (
            <Image
              className="game-page-logo"
              src={game.logoImage}
              alt={`${game.title} logo`}
              width={760}
              height={380}
              sizes="(max-width: 760px) 82vw, 580px"
            />
          ) : (
            <h1>{game.title}</h1>
          )}
          <p>{game.tagline}</p>
          <div className="actions">
            {game.robloxUrl && <a className="button primary" href={game.robloxUrl}>Play on Roblox</a>}
            {game.discordUrl && <a className="button secondary" href={game.discordUrl}>Follow Development</a>}
          </div>
        </div>
      </section>

      {hasDetails && (
        <section className="section detail-grid" data-reveal>
          {game.description && (
            <div>
              <p className="eyebrow">ABOUT</p>
              <h2>{game.title}</h2>
              <p>{game.description}</p>
            </div>
          )}
          {game.features && game.features.length > 0 && (
            <div>
              <p className="eyebrow">FEATURES</p>
              <ul>{game.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </div>
          )}
          {game.developmentNote && (
            <div>
              <p className="eyebrow">DEVELOPMENT</p>
              <p>{game.developmentNote}</p>
            </div>
          )}
        </section>
      )}

      {game.screenshots && game.screenshots.length > 0 && (
        <section className="section media-section" data-reveal>
          <div className="section-head">
            <div>
              <p className="eyebrow">MEDIA</p>
              <h2>From the world</h2>
            </div>
            <span className="gallery-hint">Click any image to explore</span>
          </div>
          <GameGallery shots={game.screenshots} />
        </section>
      )}
    </>
  );
}
