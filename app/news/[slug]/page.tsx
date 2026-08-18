import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsPost, news } from "@/content/news";

export function generateStaticParams() {
  return news.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, openGraph: post.heroImage ? { images: [post.heroImage] } : undefined };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsPost(slug);
  if (!post) notFound();

  const formattedDate = new Date(`${post.date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="news-article editorial-article">
      <header className="editorial-article-hero">
        {post.heroImage ? <img src={post.heroImage} alt={post.heroAlt || post.title} /> : null}
        <div className="editorial-article-shade" />
        <div className="editorial-article-copy">
          <Link className="news-back" href="/news">← Newswire</Link>
          <div className="editorial-article-meta"><span>{post.category}</span><time dateTime={post.date}>{formattedDate}</time></div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          {post.author ? <span className="editorial-author">By {post.author}</span> : null}
        </div>
      </header>

      <div className="editorial-body-wrap">
        <aside className="editorial-rail">
          <span>NEWSWIRE</span>
          <strong>{post.category}</strong>
          <small>{formattedDate}</small>
        </aside>

        <div className="news-article-body editorial-body">
          {post.body.map((block, index) => {
            if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
            if (block.type === "image") {
              return (
                <figure className="news-inline-media editorial-inline-media" key={index}>
                  <img src={block.src} alt={block.alt} />
                  {block.caption ? <figcaption>{block.caption}</figcaption> : null}
                </figure>
              );
            }
            return <p key={index}>{block.text}</p>;
          })}
        </div>
      </div>

      <section className="article-endcap">
        <div><span className="eyebrow">END OF TRANSMISSION</span><h2>There&apos;s more happening.</h2></div>
        <div className="article-endcap-actions"><Link className="button light-button" href="/news">More stories</Link><Link href="/games">Explore the games ↗</Link></div>
      </section>
    </article>
  );
}
