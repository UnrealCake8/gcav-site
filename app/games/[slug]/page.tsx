import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
    openGraph: { title: game.title, description: game.description || game.tagline, images: [game.heroImage] }
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const game = getGame((await params).slug);
  if (!game) notFound();

  const isAero = game.slug === "aero-horizon";

  return (
    <main className={`game-experience ${isAero ? "game-experience-aero" : "game-experience-gcav"}`}>
      <section className="game-experience-hero">
        <Image src={game.heroImage} alt={`${game.title} key art`} fill priority sizes="100vw" style={{ objectPosition: game.heroPosition }} />
        <div className="game-experience-shade" />
        <Link href="/games" className="game-experience-back">← ALL GAMES</Link>
        <div className="game-experience-copy">
          <div className="game-experience-meta">{[game.status, game.platform].filter(Boolean).join(" / ")}</div>
          {game.logoImage ? (
            <Image className="game-experience-logo" src={game.logoImage} alt={`${game.title} logo`} width={760} height={380} />
          ) : <h1>{game.title}</h1>}
          <p>{game.tagline}</p>
          <div className="game-experience-actions">
            {game.robloxUrl && <a href={game.robloxUrl}>PLAY NOW ↗</a>}
            {game.discordUrl && <a href={game.discordUrl}>FOLLOW DEVELOPMENT ↗</a>}
          </div>
        </div>
      </section>

      {isAero ? (
        <>
          <section className="aero-flight-panel">
            <div className="aero-flight-code">AH / 27</div>
            <div>
              <span>FLIGHT BRIEFING</span>
              <h2>Built for the long way around.</h2>
              <p>{game.description}</p>
            </div>
            <div className="aero-flight-stats">
              <span><b>01</b> AVIATION FOCUS</span>
              <span><b>02</b> COMMERCIAL AIRCRAFT</span>
              <span><b>03</b> SCENIC FLIGHT</span>
            </div>
          </section>

          {game.screenshots?.length ? (
            <section className="aero-gallery-wrap">
              <div className="aero-gallery-head"><span>WINDOW VIEW</span><strong>From the flight deck.</strong></div>
              <GameGallery shots={game.screenshots} />
            </section>
          ) : null}

          <section className="aero-development-note">
            <span>STATUS / IN DEVELOPMENT</span>
            <p>{game.developmentNote}</p>
          </section>
        </>
      ) : (
        <>
          <section className="gcav-city-strip">
            <span>DUBAI / UAE</span><span>OPEN WORLD</span><span>VEHICLES</span><span>EXPLORATION</span>
          </section>

          <section className="gcav-dossier">
            <aside><span>CASE FILE</span><b>GCAV-05</b></aside>
            <div className="gcav-dossier-main">
              <span>ABOUT THE WORLD</span>
              <h2>Dubai, rebuilt for Roblox.</h2>
              <p>{game.description}</p>
            </div>
            <div className="gcav-feature-list">
              {game.features?.map((feature, index) => <div key={feature}><b>{String(index + 1).padStart(2, "0")}</b><span>{feature}</span></div>)}
            </div>
          </section>

          {game.screenshots?.length ? (
            <section className="gcav-gallery-wrap">
              <div className="gcav-gallery-head"><span>STREET ARCHIVE</span><strong>Scenes from the city.</strong></div>
              <GameGallery shots={game.screenshots} />
            </section>
          ) : null}

          <section className="gcav-development-note">
            <span>DEVELOPMENT FILE</span>
            <p>{game.developmentNote}</p>
          </section>
        </>
      )}
    </main>
  );
}
