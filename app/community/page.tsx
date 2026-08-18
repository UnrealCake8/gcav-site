import type { Metadata } from "next";
import Link from "next/link";
import { activeSocialLinks } from "@/content/social";

export const metadata: Metadata = {
  title: "Community",
  description: "Official Malouk's Games community destinations.",
};

const descriptions: Record<string, string> = {
  Discord: "The closest place to development. Talk, follow progress and catch updates early.",
  YouTube: "Trailers, showcases and longer looks at what is being built.",
  Instagram: "Screenshots, visual updates and quick studio posts.",
  "X / Twitter": "Short updates, announcements and links from the studio.",
  TikTok: "Fast clips, work in progress moments and game highlights.",
};

export default function Community() {
  return (
    <main className="signal-hub">
      <header className="signal-header">
        <div className="signal-brand-block">
          <span className="signal-live-dot" />
          <span>COMMUNITY SIGNAL</span>
        </div>
        <div className="signal-header-copy">
          <h1>Stay in the loop.</h1>
          <p>This is the official map of everywhere Malouk&apos;s Games posts, talks and shares development.</p>
        </div>
        <div className="signal-count">{String(activeSocialLinks.length).padStart(2, "0")} CHANNELS ONLINE</div>
      </header>

      <section className="signal-board" aria-label="Official community channels">
        {activeSocialLinks.length ? activeSocialLinks.map((item, index) => (
          <a className="signal-row" href={item.url} key={item.label}>
            <span className="signal-index">CH {String(index + 1).padStart(2, "0")}</span>
            <div className="signal-name">
              <strong>{item.label}</strong>
              <small>OFFICIAL</small>
            </div>
            <p>{descriptions[item.label] ?? `Follow Malouk's Games on ${item.label}.`}</p>
            <span className="signal-open">OPEN ↗</span>
          </a>
        )) : (
          <div className="signal-offline">
            <span>NO SIGNAL</span>
            <strong>Official community links are being configured.</strong>
          </div>
        )}
      </section>

      <section className="signal-notice">
        <div>
          <span>PLAYER CHANNEL</span>
          <h2>See something. Say something.</h2>
        </div>
        <p>Feedback, screenshots, weird bugs, ideas and the things players love most are part of how these games evolve.</p>
      </section>

      <footer className="signal-footer">
        <span>KEEP EXPLORING</span>
        <nav>
          <Link href="/games">GAMES ↗</Link>
          <Link href="/news">NEWSWIRE ↗</Link>
          <Link href="/developer">STUDIO ↗</Link>
        </nav>
      </footer>
    </main>
  );
}
