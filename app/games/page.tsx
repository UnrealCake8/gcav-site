import type { Metadata } from "next";
import Link from "next/link";
import { GamesBrowser } from "@/components/GamesBrowser";
import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "Games",
  description: "Explore the worlds currently in development at Malouk's Games.",
};

export default function Games() {
  return (
    <>
      <GamesBrowser games={games} />
      <section className="games-browser-footer">
        <span>MORE FROM MALOUK&apos;S GAMES</span>
        <Link href="/news">NEWSWIRE ↗</Link>
        <Link href="/developer">THE STUDIO ↗</Link>
        <Link href="/community">COMMUNITY ↗</Link>
      </section>
    </>
  );
}
