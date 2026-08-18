import type { Metadata } from "next";
import Link from "next/link";
import { activeSocialLinks } from "@/content/social";

export const metadata: Metadata = {
  title: "Community",
  description: "Official Malouk's Games community destinations.",
};

export default function Community() {
  return (
    <>
      <section className="community-hero">
        <div className="community-hero-inner">
          <div>
            <p className="eyebrow">MALOUK&apos;S GAMES / COMMUNITY</p>
            <h1>Don&apos;t just watch.</h1>
          </div>
          <p>Follow development as it happens, see new screenshots first, and stay close to the worlds we&apos;re building.</p>
        </div>
      </section>

      <section className="section community-hub" data-reveal>
        <div className="community-hub-head">
          <div>
            <p className="eyebrow">OFFICIAL CHANNELS</p>
            <h2>Find us out there.</h2>
          </div>
          <span>{String(activeSocialLinks.length).padStart(2, "0")} DESTINATIONS</span>
        </div>

        {activeSocialLinks.length ? (
          <div className="community-links">
            {activeSocialLinks.map((item, index) => (
              <a href={item.url} key={item.label} className="community-link-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <p>{item.label === "Discord" ? "Join the conversation and follow development closely." : `Follow Malouk's Games on ${item.label}.`}</p>
                <b>↗</b>
              </a>
            ))}
          </div>
        ) : (
          <div className="newswire-coming-next">
            <span>OFFICIAL LINKS ONLY</span>
            <strong>Community links are coming soon.</strong>
          </div>
        )}
      </section>

      <section className="community-statement" data-reveal>
        <span>BUILD WITH US</span>
        <h2>Every world gets better when players are part of it.</h2>
        <p>Feedback, screenshots, ideas and the people who keep showing up all shape where these projects go next.</p>
      </section>

      <section className="page-signoff" data-reveal>
        <div>
          <p className="eyebrow">KEEP EXPLORING</p>
          <h2>See what&apos;s happening right now.</h2>
        </div>
        <Link href="/news" className="button light-button">Open Newswire</Link>
      </section>
    </>
  );
}
