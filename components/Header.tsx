"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  ["Home", "/"],
  ["Games", "/games"],
  ["News", "/news"],
  ["Developer", "/developer"],
  ["Community", "/community"],
];

const mobileIcons: Record<string, string> = {
  "/": "⌂",
  "/games": "◇",
  "/news": "▤",
  "/developer": "◫",
  "/community": "◎",
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => setScrolled(scrollY > 24);
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className={`header ${scrolled ? "header-solid" : ""}`}>
        <div className="nav-wrap">
          <Link href="/" className="logo-link">
            <Logo />
          </Link>

          <nav className="nav desktop-nav" aria-label="Main navigation">
            {nav.map(([name, href]) => (
              <Link key={href} href={href}>
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav className="mobile-tabbar" aria-label="Mobile navigation">
        {nav.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            className={isActive(href) ? "is-active" : ""}
            aria-current={isActive(href) ? "page" : undefined}
          >
            <span aria-hidden="true">{mobileIcons[href]}</span>
            <b>{name}</b>
          </Link>
        ))}
      </nav>
    </>
  );
}
