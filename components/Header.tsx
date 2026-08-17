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

  return (
    <header className={`header ${scrolled || open ? "header-solid" : ""}`}>
      <div className="nav-wrap">
        <Link href="/" className="logo-link" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav id="main-menu" className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {nav.map(([name, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {name}
            </Link>
          ))}
        </nav>

        <button
          className="menu"
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
