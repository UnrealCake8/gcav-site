"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Game } from "@/content/games";
import type { NewsPost } from "@/content/news";

export function ShockHome({ games, news }: { games: Game[]; news: NewsPost[] }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const game = games[active] ?? games[0];
  const lead = news[0];
  const ticker = useMemo(() => games.map((item) => item.title.toUpperCase()).join("  ✦  "), [games]);

  useEffect(() => {
    setMounted(true);
    if (games.length < 2) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % games.length), 9000);
    return () => window.clearInterval(timer);
  }, [games.length]);

  if (!game) return null;

  return (
    <div className={`shock-home ${mounted ? "is-mounted" : ""}`}>
      <section className="shock-stage">
        <div className="shock-backdrops" aria-hidden="true">
          {games.map((item, index) => (
            <Image
              key={item.slug}
              src={item.heroImage}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={index === active ? "is-active" : ""}
              style={{ objectPosition: item.heroPosition }}
            />
          ))}
          <div className="shock-backdrop-shade" />
          <div className="shock-grid-overlay" />
        </div>

        <aside className="shock-rail">
          <span className="shock-rail-label">PROJECT SELECT</span>
          <div className="shock-rail-list">
            {games.map((item, index) => (
              <button key={item.slug} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
          <Link href="/games" className="shock-rail-all">ALL WORLDS ↗</Link>
        </aside>

        <div className="shock-main-copy" key={game.slug}>
          <div className="shock-kicker"><span>{game.status}</span><i /> <span>{game.platform}</span></div>
          {game.logoImage ? (
            <Image src={game.logoImage} alt={`${game.title} logo`} width={760} height={360} className="shock-game-logo" />
          ) : (
            <h1>{game.title}</h1>
          )}
          <p className="shock-tagline">{game.tagline}</p>
          <p className="shock-description">{game.description}</p>
          <div className="shock-actions">
            <Link href={`/games/${game.slug}`} className="shock-primary">ENTER WORLD <b>↗</b></Link>
            <Link href="/news" className="shock-secondary">LATEST INTEL</Link>
          </div>
        </div>

        <div className="shock-side-data">
          <div><span>STATUS</span><strong>{game.status ?? "ACTIVE"}</strong></div>
          <div><span>PLATFORM</span><strong>{game.platform ?? "GAME"}</strong></div>
          <div><span>PROJECT</span><strong>{String(active + 1).padStart(2, "0")} / {String(games.length).padStart(2, "0")}</strong></div>
        </div>

        <div className="shock-scroll-mark">SCROLL / DISCOVER ↓</div>
      </section>

      <div className="shock-ticker" aria-hidden="true"><div>{ticker}  ✦  {ticker}  ✦  {ticker}</div></div>

      <section className="shock-news">
        <div className="shock-news-heading">
          <span>LIVE FEED / NEWSWIRE</span>
          <h2>Something is always happening.</h2>
        </div>
        {lead ? (
          <Link href={`/news/${lead.slug}`} className="shock-news-lead">
            <div className="shock-news-image">
              {lead.heroImage && <Image src={lead.heroImage} alt={lead.heroAlt || lead.title} fill sizes="60vw" />}
              <span className="shock-news-stamp">LATEST TRANSMISSION</span>
            </div>
            <div className="shock-news-copy">
              <span>{lead.category} / {lead.date}</span>
              <strong>{lead.title}</strong>
              <p>{lead.excerpt}</p>
              <b>OPEN STORY ↗</b>
            </div>
          </Link>
        ) : null}
        <div className="shock-news-strip">
          {news.slice(1, 4).map((post, index) => (
            <Link key={post.slug} href={`/news/${post.slug}`}>
              <span>0{index + 2}</span><strong>{post.title}</strong><b>↗</b>
            </Link>
          ))}
          <Link href="/news"><span>+</span><strong>ALL NEWSWIRE STORIES</strong><b>↗</b></Link>
        </div>
      </section>

      <section className="shock-manifesto">
        <span className="shock-manifesto-code">MALOUK&apos;S GAMES / INDEPENDENT / ROBLOX</span>
        <h2>We don&apos;t want to build another simulator.</h2>
        <p>We want worlds with attitude, movement that feels good, and places players remember after they leave.</p>
        <div className="shock-manifesto-links">
          <Link href="/developer">MEET THE STUDIO ↗</Link>
          <Link href="/community">JOIN THE SIGNAL ↗</Link>
        </div>
      </section>
    </div>
  );
}
