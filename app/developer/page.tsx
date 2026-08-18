import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "Developer",
  description: "Meet Malouk's Games and explore the studio's current Roblox projects.",
};

export default function Developer() {
  return (
    <main className="studio-notebook">
      <header className="notebook-cover">
        <div className="notebook-stamp">MALOUK&apos;S GAMES / STUDIO FILE 001</div>
        <div className="notebook-title-row">
          <h1>We build places<br />people want to stay in.</h1>
          <p>Not a giant studio. Not trying to act like one. Just a small team making ambitious Roblox worlds around movement, atmosphere and things that are fun immediately.</p>
        </div>
        <div className="notebook-rule"><span>EST. IN DEVELOPMENT</span><span>ROBLOX / UAE</span></div>
      </header>

      <section className="notebook-entry">
        <aside><span>ENTRY 01</span><small>THE IDEA</small></aside>
        <div>
          <h2>Games should feel like places, not menus.</h2>
          <p>We care about the first few seconds after you join. Can you move? Can you explore? Is there something interesting in the distance? Does the world make you want to see what&apos;s around the next corner?</p>
          <p>That is the starting point before progression systems, currencies or anything else gets layered on top.</p>
        </div>
      </section>

      <section className="notebook-entry notebook-entry-dark">
        <aside><span>ENTRY 02</span><small>THE RULES</small></aside>
        <div className="notebook-principles">
          <article><b>01</b><strong>Make movement fun first.</strong><p>Driving, flying and simply getting around should feel satisfying before rewards are involved.</p></article>
          <article><b>02</b><strong>Give every world an identity.</strong><p>A player should be able to recognise the place from a screenshot without needing the logo.</p></article>
          <article><b>03</b><strong>Leave room to grow.</strong><p>Projects should be able to expand through new locations, vehicles, systems and player ideas.</p></article>
        </div>
      </section>

      <section className="notebook-entry">
        <aside><span>ENTRY 03</span><small>ON THE DESK</small></aside>
        <div className="notebook-project-board">
          {games.map((game, index) => (
            <Link href={`/games/${game.slug}`} className="notebook-project" key={game.slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{game.title}</strong><small>{[game.status, game.platform].filter(Boolean).join(" / ")}</small></div>
              <b>OPEN FILE ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="notebook-contact">
        <span>LAST PAGE</span>
        <h2>Want to talk to the studio?</h2>
        <p>Project, community or general enquiries can go straight to Malouk&apos;s Games.</p>
        <a href={`mailto:${site.contactEmail}`}>EMAIL THE STUDIO ↗</a>
      </section>
    </main>
  );
}
