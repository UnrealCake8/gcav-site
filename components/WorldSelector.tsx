"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Game } from "@/content/games";

export function WorldSelector({ games }: { games: Game[] }) {
  const [active, setActive] = useState(0);
  const game = games[active] ?? games[0];

  if (!game) return null;

  return (
    <section className="world-selector" data-reveal>
      <div className="world-selector-backdrop" aria-hidden="true">
        {games.map((item, index) => (
          <Image
            key={item.slug}
            src={item.heroImage}
            alt=""
            fill
            sizes="100vw"
            className={index === active ? "is-active" : ""}
            style={{ objectPosition: item.heroPosition }}
          />
        ))}
        <div className="world-selector-wash" />
      </div>

      <div className="world-selector-inner">
        <div className="world-selector-intro">
          <p className="eyebrow">ENTER A WORLD</p>
          <h2>Where do you want to go?</h2>
          <p>Each Malouk&apos;s Games project is built to feel like its own place. Pick a world and step inside.</p>
        </div>

        <div className="world-selector-list" role="list" aria-label="Game worlds">
          {games.map((item, index) => (
            <Link
              href={`/games/${item.slug}`}
              key={item.slug}
              className={index === active ? "world-selector-item is-active" : "world-selector-item"}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{item.title}</strong>
                <small>{[item.status, item.platform].filter(Boolean).join(" / ")}</small>
              </div>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>

        <div className="world-selector-current" aria-live="polite">
          <span>NOW SELECTED</span>
          <strong>{game.title}</strong>
          <p>{game.tagline}</p>
        </div>
      </div>
    </section>
  );
}
