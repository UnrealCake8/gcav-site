import { MobileHome } from "@/components/MobileHome";
import { ShockHome } from "@/components/ShockHome";
import { games } from "@/content/games";
import { getSortedNews } from "@/content/news";

export default function Home() {
  const latestNews = getSortedNews().slice(0, 4);

  return (
    <>
      <style>{`
        @media (max-width: 760px) {
          .shock-home { display: none !important; }
        }
        @media (min-width: 761px) {
          .mobileExperience { display: none !important; }
        }
      `}</style>
      <MobileHome />
      <ShockHome games={games} news={latestNews} />
    </>
  );
}
