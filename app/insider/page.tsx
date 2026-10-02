import type { Metadata } from "next";
import { InsiderForm } from "@/components/InsiderForm";

export const metadata: Metadata = {
  title: "Insider Program",
  description:
    "Join the Malouks Games Insider Program for private betas, unreleased builds and behind-the-scenes access.",
};

export default function InsiderPage() {
  return (
    <section className="insider-page">
      <div className="insider-backdrop" aria-hidden="true" />
      <div className="insider-shell">
        <header className="insider-intro">
          <span className="insider-kicker">// Insider Program</span>
          <h1>
            Become a <span>Malouks Games Insider</span>
          </h1>
          <p>
            Join the inner circle. Get direct access to our private Dev Betas,
            unreleased models, and behind-the-scenes sneak peeks.
          </p>
        </header>
        <InsiderForm />
      </div>
    </section>
  );
}
