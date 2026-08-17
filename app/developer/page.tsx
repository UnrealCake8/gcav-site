import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";
import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "Developer",
  description: "Meet Malouk's Games and explore the studio's current Roblox projects.",
};

export default function Developer() {
  return (
    <>
      <PageHero
        kicker="THE STUDIO"
        title="Small team. Big worlds."
        description="Malouk's Games is an independent Roblox studio focused on ambitious, replayable experiences with a strong sense of place."
      />

      <section className="section split developer-intro">
        <div>
          <p className="eyebrow">WHO WE ARE</p>
          <h2>Built for players first.</h2>
        </div>
        <div>
          <p>
            We build games around the things players actually want to do: explore, drive, fly, discover, and come back with friends. Our goal is to make Roblox experiences that feel bigger, more detailed, and more memorable than a typical simulator.
          </p>
          <p>
            Each project has its own identity, but the studio keeps the same focus: strong worlds, satisfying movement, recognizable locations, and gameplay that feels fun within seconds of joining.
          </p>
        </div>
      </section>

      <section className="section developer-pillars">
        <div className="section-head">
          <div>
            <p className="eyebrow">HOW WE BUILD</p>
            <h2>Our focus</h2>
          </div>
        </div>
        <div className="developer-grid">
          <article>
            <span>01</span>
            <h3>Worlds with identity</h3>
            <p>Places should feel recognizable, explorable, and worth spending time in.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Movement that feels good</h3>
            <p>Cars, aircraft, bikes, and player movement should be enjoyable before anything else.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Games that keep growing</h3>
            <p>We want our projects to evolve through new areas, vehicles, systems, and player feedback.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">CURRENT WORK</p>
            <h2>Projects</h2>
          </div>
        </div>
        {games.map((game) => (
          <Link className="project-row" key={game.slug} href={`/games/${game.slug}`}>
            <span>{game.title}</span>
            <span>{[game.status, game.platform].filter(Boolean).join(" / ")}</span>
            <b>↗</b>
          </Link>
        ))}
      </section>

      <section className="section developer-contact">
        <p className="eyebrow">CONTACT</p>
        <h2>Want to reach the studio?</h2>
        <p>For project, community, or general enquiries, contact Malouk's Games directly.</p>
        <a className="button primary" href={`mailto:${site.contactEmail}`}>Email the studio</a>
      </section>
    </>
  );
}
