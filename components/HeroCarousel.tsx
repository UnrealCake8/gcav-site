"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Game } from "@/content/games";

const AUTOPLAY_MS = 9000;

export function HeroCarousel({ items }: { items: Game[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const start = useRef(0);
  const heroRef = useRef<HTMLElement>(null);
  const game = items[i];
  const move = (direction: number) => setI((current) => (current + direction + items.length) % items.length);

  useEffect(() => {
    if (items.length < 2 || paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => move(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  const setDepth = (x: number, y: number) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = Math.max(-1, Math.min(1, ((x - rect.left) / rect.width - 0.5) * 2));
    const py = Math.max(-1, Math.min(1, ((y - rect.top) / rect.height - 0.5) * 2));
    el.style.setProperty("--hero-x", px.toFixed(3));
    el.style.setProperty("--hero-y", py.toFixed(3));
  };

  const resetDepth = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--hero-x", "0");
    el.style.setProperty("--hero-y", "0");
  };

  return (
    <section
      ref={heroRef}
      className="hero hero-depth"
      aria-roledescription="carousel"
      aria-label="Featured games"
      tabIndex={0}
      onPointerMove={(event) => {
        if (event.pointerType === "mouse") setDepth(event.clientX, event.clientY);
      }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        resetDepth();
        setPaused(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onTouchStart={(event) => (start.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        const distance = event.changedTouches[0].clientX - start.current;
        if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
      }}
    >
      <div className="hero-depth-image" aria-hidden="true">
        <Image
          key={game.slug}
          className="hero-image"
          src={game.heroImage}
          fill
          priority
          alt=""
          sizes="100vw"
          style={{ objectPosition: game.heroPosition }}
        />
      </div>
      <div className="hero-wash" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content hero-depth-content">
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
            Learn More
          </Link>
          {game.robloxUrl && (
            <a className="button secondary" href={game.robloxUrl}>
              Play on Roblox
            </a>
          )}
        </div>
      </div>

      {items.length > 1 && (
        <div className="carousel-controls" aria-label="Featured game controls">
          <button onClick={() => move(-1)} aria-label="Previous featured game">←</button>
          <div className="hero-progress" aria-hidden="true">
            {items.map((item, index) => (
              <span key={item.slug} className={index === i ? "active" : ""} />
            ))}
          </div>
          <button onClick={() => move(1)} aria-label="Next featured game">→</button>
        </div>
      )}

      <span className="scroll-cue" aria-hidden="true">SCROLL <i /></span>
    </section>
  );
}
