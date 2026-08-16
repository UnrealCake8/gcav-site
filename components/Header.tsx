"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { activeSocialLinks } from "@/content/social";
import { Logo } from "./Logo";
const nav = [["Home","/"],["Games","/games"],["Newswire","/newswire"],["Developer","/developer"]];
export function Header() {
  const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const f=()=>setScrolled(scrollY>24);f();addEventListener("scroll",f,{passive:true});return()=>removeEventListener("scroll",f)},[]);
  const discord=activeSocialLinks.find(x=>x.label==="Discord");
  return <header className={`header ${scrolled||open?"header-solid":""}`}><div className="nav-wrap"><Link href="/" className="logo-link" onClick={()=>setOpen(false)}><Logo/></Link><nav id="main-menu" className={open?"nav open":"nav"} aria-label="Main navigation">{nav.map(([n,h])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{n}</Link>)}<Link href="/community" onClick={()=>setOpen(false)}>Community</Link>{discord&&<a className="button small mobile-cta" href={discord.url}>Discord</a>}</nav>{discord&&<a className="button small desktop-cta" href={discord.url}>Discord</a>}<button className="menu" aria-expanded={open} aria-controls="main-menu" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}><span/><span/></button></div></header>;
}
