"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  ["Home", "/"],
  ["Games", "/games"],
  ["News", "/news"],
  ["Developer", "/developer"],
  ["Community", "/community"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(scrollY > 24);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={`header ${scrolled || open ? "header-solid" : ""}`}>
      <div className="nav-wrap">
        <Link href="/" className="logo-link" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="nav desktop-nav" aria-label="Main navigation">
          {nav.map(([name, href]) => (
            <Link key={href} href={href}>
              {name}
            </Link>
          ))}
        </nav>

        <button
          className={`menu ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`mobile-menu-layer ${open ? "open" : ""}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <aside
          id="mobile-menu"
          className="mobile-menu-panel"
          aria-label="Mobile navigation"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mobile-menu-kicker">Explore Malouk's Games</div>

          <nav className="mobile-nav">
            {nav.map(([name, href], index) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{name}</strong>
                <b aria-hidden="true">↗</b>
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-footer">
            <span>Malouk's Games</span>
            <span>Built for mobile exploration</span>
          </div>
        </aside>
      </div>
    </header>
  );
}
