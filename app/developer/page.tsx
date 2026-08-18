import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "Developer",
  description: "Meet Malouk's Games and explore the studio's current Roblox projects.",
};

export default function Developer() {
  const leadGame = games[0];

  return (
    <>
      <section className="studio-hero">
        {leadGame && <Image src={leadGame.heroImage} alt="" fill priority sizes="100vw" style={{ objectPosition: leadGame.heroPosition }} />}
        <div className="studio-hero-shade" />
        <div className="studio-hero-copy">
          <p className="eyebrow">THE STUDIO</p>
          <h1>Small team.<br />Big worlds.</h1>
          <p>Independent Roblox experiences built around places, movement and the feeling that there is always more to discover.</p>
        </div>
      </section>

      <section className="section studio-manifesto" data-reveal>
        <span>01 / WHY WE BUILD</span>
        <h2>We want Roblox games to feel like places, not menus.</h2>
        <div className="studio-manifesto-copy">
          <p>We build around the things players actually want to do: explore, drive, fly, discover and come back with friends.</p>
          <p>Each project has its own identity, but the goal stays the same: make something that feels good within seconds of joining and still has reasons to return later.</p>
        </div>
      </section>

      <section className="section developer-pillars" data-reveal>
        <div className="section-head">
          <div><p className="eyebrow">02 / HOW WE BUILD</p><h2>Our focus.</h2></div>
        </div>
        <div className="developer-grid">
          <article><span>01</span><h3>Worlds with identity</h3><p>Places should feel recognizable, explorable and worth spending time in.</p></article>
          <article><span>02</span><h3>Movement that feels good</h3><p>Cars, aircraft, bikes and player movement should be enjoyable before anything else.</p></article>
          <article><span>03</span><h3>Games that keep growing</h3><p>Projects evolve through new areas, vehicles, systems and player feedback.</p></article>
        </div>
      </section>

      <section className="section studio-projects" data-reveal>
        <div className="section-head"><div><p className="eyebrow">03 / CURRENT WORK</p><h2>In development.</h2></div></div>
        {games.map((game, index) => (
          <Link className="studio-project" key={game.slug} href={`/games/${game.slug}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{game.title}</strong>
            <small>{[game.status, game.platform].filter(Boolean).join(" / ")}</small>
            <b>↗</b>
          </Link>
        ))}
      </section>

      <section className="page-signoff" data-reveal>
        <div>
          <p className="eyebrow">04 / CONTACT</p>
          <h2>Have something worth talking about?</h2>
          <p className="finale-copy">For project, community or general enquiries, contact Malouk&apos;s Games directly.</p>
        </div>
        <a className="button light-button" href={`mailto:${site.contactEmail}`}>Email the studio</a>
      </section>
    </>
  );
}
