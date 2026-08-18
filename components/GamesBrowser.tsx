"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Game } from "@/content/games";

export function GamesBrowser({ games }: { games: Game[] }) {
  const [active, setActive] = useState(0);
  const game = games[active];
  if (!game) return null;

  return (
    <section className="games-browser">
      <div className="games-browser-background">
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
        <div className="games-browser-shade" />
      </div>

      <div className="games-browser-ui">
        <aside className="games-browser-rail">
          <span className="games-browser-label">LIBRARY</span>
          <div className="games-browser-list" role="tablist" aria-label="Games">
            {games.map((item, index) => (
              <button
                key={item.slug}
                role="tab"
                aria-selected={active === index}
                className={active === index ? "is-active" : ""}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
          <small>{String(active + 1).padStart(2, "0")} / {String(games.length).padStart(2, "0")}</small>
        </aside>

        <div className="games-browser-stage" role="tabpanel">
          <div className="games-browser-status">
            <span>{game.status ?? "Project"}</span>
            <span>{game.platform ?? "Game"}</span>
          </div>

          {game.logoImage ? (
            <Image className="games-browser-logo" src={game.logoImage} alt={`${game.title} logo`} width={760} height={340} />
          ) : (
            <h1>{game.title}</h1>
          )}

          <p className="games-browser-tagline">{game.tagline}</p>
          <p className="games-browser-description">{game.description}</p>

          <div className="games-browser-actions">
            <Link href={`/games/${game.slug}`} className="games-browser-enter">ENTER WORLD <b>↗</b></Link>
            {game.discordUrl && <a href={game.discordUrl}>FOLLOW DEVELOPMENT</a>}
          </div>
        </div>

        <div className="games-browser-hint">MOVE THROUGH THE LIBRARY</div>
      </div>
    </section>
  );
}
