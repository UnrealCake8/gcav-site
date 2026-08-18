"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function GameGallery({ shots }: { shots: { src: string; alt: string }[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? null : (current + 1) % shots.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? null : (current - 1 + shots.length) % shots.length);
    };

    addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      removeEventListener("keydown", onKeyDown);
    };
  }, [active, shots.length]);

  const move = (direction: number) => {
    setActive((current) => current === null ? null : (current + direction + shots.length) % shots.length);
  };

  return (
    <>
      <div className="media-grid cinematic-gallery">
        {shots.map((shot, index) => (
          <button
            type="button"
            className={index === 0 ? "media-featured" : undefined}
            key={shot.src}
            onClick={() => setActive(index)}
            aria-label={`Open screenshot ${index + 1} of ${shots.length}`}
          >
            <Image src={shot.src} alt={shot.alt} width={1600} height={900} sizes="(max-width: 760px) 100vw, 50vw" />
            <span className="gallery-open">VIEW <b>↗</b></span>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Screenshot viewer" onClick={() => setActive(null)}>
          <button className="gallery-close" type="button" onClick={() => setActive(null)} aria-label="Close gallery">×</button>
          <button className="gallery-nav gallery-prev" type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} aria-label="Previous screenshot">←</button>
          <div className="gallery-stage" onClick={(event) => event.stopPropagation()}>
            <Image src={shots[active].src} alt={shots[active].alt} fill sizes="100vw" priority />
            <div className="gallery-caption">
              <span>{String(active + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}</span>
              <p>{shots[active].alt}</p>
            </div>
          </div>
          <button className="gallery-nav gallery-next" type="button" onClick={(event) => { event.stopPropagation(); move(1); }} aria-label="Next screenshot">→</button>
        </div>
      )}
    </>
  );
}
