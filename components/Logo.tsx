import Image from "next/image";
import { site } from "@/content/site";
export function Logo() {
  return <span className="brand" aria-label={site.studioName}>{site.logo ? <Image src={site.logo} width={42} height={42} alt={`${site.studioName} logo`} /> : <><span className="logo-box" aria-hidden="true">S</span><span className="brand-name">{site.studioName}</span></>}</span>;
}
