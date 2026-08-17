import Link from "next/link";
import { getSortedNews } from "@/content/news";

export const metadata = {
  title: "News",
  description: "Studio news, development updates and announcements.",
};

export default function NewsPage() {
  const posts = getSortedNews();

  return (
    <>
      <section className="page-hero news-page-hero">
        <div className="container">
          <p className="eyebrow">STUDIO FEED</p>
          <h1>News</h1>
          <p className="page-lede">
            Development updates, announcements, screenshots and release notes from the studio.
          </p>
        </div>
      </section>

      <section className="section news-index">
        {posts.length === 0 ? (
          <div className="news-empty">
            <p className="eyebrow">NO POSTS YET</p>
            <h2>Updates are coming.</h2>
            <p>Add your first article in <code>content/news.ts</code>.</p>
          </div>
        ) : (
          <div className="news-list">
            {posts.map((post) => (
              <article className="news-list-card" key={post.slug}>
                <Link href={`/news/${post.slug}`} className="news-list-link">
                  {post.heroImage ? (
                    <div className="news-list-image-wrap">
                      <img
                        className="news-list-image"
                        src={post.heroImage}
                        alt={post.heroAlt || post.title}
                      />
                    </div>
                  ) : null}
                  <div className="news-list-copy">
                    <div className="news-list-meta">
                      <span>{post.category}</span>
                      <time dateTime={post.date}>
                        {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <span className="news-read-more">Read article ↗</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
