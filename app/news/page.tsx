import Image from "next/image";
import Link from "next/link";
import { getSortedNews } from "@/content/news";

export const metadata = {
  title: "News",
  description: "Studio news, development updates and announcements.",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NewsPage() {
  const posts = getSortedNews();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug);

  return (
    <>
      <section className="newswire-hero">
        <div className="newswire-hero-inner">
          <div>
            <p className="eyebrow">MALOUK&apos;S GAMES / NEWSWIRE</p>
            <h1>What&apos;s happening.</h1>
          </div>
          <p>
            Development updates, screenshots, announcements and everything happening across our worlds.
          </p>
        </div>
      </section>

      {posts.length === 0 ? (
        <section className="section news-index">
          <div className="news-empty">
            <p className="eyebrow">NO POSTS YET</p>
            <h2>Updates are coming.</h2>
            <p>Add your first article in <code>content/news.ts</code>.</p>
          </div>
        </section>
      ) : (
        <>
          {featured && (
            <section className="newswire-feature-wrap" data-reveal>
              <Link href={`/news/${featured.slug}`} className="newswire-feature">
                <div className="newswire-feature-media">
                  {featured.heroImage ? (
                    <Image
                      src={featured.heroImage}
                      alt={featured.heroAlt || featured.title}
                      fill
                      priority
                      sizes="100vw"
                    />
                  ) : (
                    <div className="newswire-feature-fallback" />
                  )}
                  <div className="newswire-feature-shade" />
                </div>

                <div className="newswire-feature-copy">
                  <div className="newswire-feature-meta">
                    <span>{featured.category}</span>
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  </div>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <span className="newswire-feature-link">Read the story <b>↗</b></span>
                </div>
              </Link>
            </section>
          )}

          <section className="section newswire-feed" data-reveal>
            <div className="newswire-feed-head">
              <div>
                <p className="eyebrow">LATEST TRANSMISSIONS</p>
                <h2>More from the studio.</h2>
              </div>
              <span>{String(rest.length).padStart(2, "0")} STORIES</span>
            </div>

            {rest.length === 0 ? (
              <div className="newswire-coming-next">
                <span>MORE SOON</span>
                <strong>The next update is already being built.</strong>
              </div>
            ) : (
              <div className="newswire-grid">
                {rest.map((post, index) => (
                  <article className="newswire-card" key={post.slug}>
                    <Link href={`/news/${post.slug}`}>
                      <div className="newswire-card-media">
                        {post.heroImage ? (
                          <Image
                            src={post.heroImage}
                            alt={post.heroAlt || post.title}
                            fill
                            sizes="(max-width: 760px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="newswire-card-fallback" />
                        )}
                        <span className="newswire-card-number">{String(index + 1).padStart(2, "0")}</span>
                      </div>

                      <div className="newswire-card-copy">
                        <div className="newswire-card-meta">
                          <span>{post.category}</span>
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <span className="newswire-card-link">Read story ↗</span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="newswire-signoff" data-reveal>
            <div>
              <span className="eyebrow">STAY CLOSE</span>
              <h2>We&apos;re building more than you can see.</h2>
            </div>
            <Link href="/community" className="button light-button">Join the community</Link>
          </section>
        </>
      )}
    </>
  );
}
