"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Game } from "@/content/games";

export function HeroCarousel({ items }: { items: Game[] }) {
  const [i, setI] = useState(0);
  let start = 0;
  const game = items[i];
  const move = (direction: number) => setI((i + direction + items.length) % items.length);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="Featured games"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onTouchStart={(event) => (start = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        const distance = event.changedTouches[0].clientX - start;
        if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
      }}
    >
      <Image
        key={game.slug}
        className="hero-image"
        src={game.heroImage}
        fill
        priority
        alt={`${game.title} key art`}
        sizes="100vw"
        style={{ objectPosition: game.heroPosition }}
      />
      <div className="hero-wash" />

      <div className="hero-content">
        <span className="hero-index">FEATURED / {String(i + 1).padStart(2, "0")}</span>
        {game.logoImage ? (
          <Image
            className="hero-game-logo"
            src={game.logoImage}
            alt={`${game.title} logo`}
            width={720}
            height={360}
            sizes="(max-width: 760px) 80vw, 520px"
          />
        ) : (
          <p className="eyebrow">{game.title}</p>
        )}
        <h1>{game.tagline.replace(" in ", "\nin ")}</h1>
        {game.description && <p className="lede">{game.description}</p>}
        <div className="actions">
          <Link className="button primary" href={`/games/${game.slug}`}>
            Explore Game
          </Link>
          {game.robloxUrl && (
            <a className="button secondary" href={game.robloxUrl}>
              Play on Roblox
            </a>
          )}
        </div>
      </div>

      {items.length > 1 && (
        <div className="carousel-controls">
          <button onClick={() => move(-1)} aria-label="Previous featured game">←</button>
          <button onClick={() => move(1)} aria-label="Next featured game">→</button>
        </div>
      )}

      <span className="scroll-cue" aria-hidden="true">SCROLL <i /></span>
    </section>
  );
}
