"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  ["Home", "/", "Back to the front page"],
  ["Games", "/games", "Explore our worlds"],
  ["News", "/news", "Updates from development"],
  ["Developer", "/developer", "Behind the studio"],
  ["Community", "/community", "Find us online"],
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
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";

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
            <Link key={href} href={href}>{name}</Link>
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

      <div id="mobile-menu" className={`mobile-menu-layer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu-noise" aria-hidden="true" />
        <div className="mobile-menu-topline">
          <span>UNREALDROP GAMES</span>
          <span>MENU / 05</span>
        </div>

        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map(([name, href, description], index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              <span className="mobile-nav-number">0{index + 1}</span>
              <span className="mobile-nav-copy">
                <strong>{name}</strong>
                <small>{description}</small>
              </span>
              <span className="mobile-nav-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-bottom">
          <span>INDIE GAMES / ROBLOX</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </header>
  );
}
