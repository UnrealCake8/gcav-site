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

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.heroImage ? { images: [post.heroImage] } : undefined,
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getNewsPost(slug);

  if (!post) notFound();

  return (
    <article className="news-article">
      <header className="news-article-header">
        <div className="news-article-header-inner">
          <Link className="news-back" href="/news">← All news</Link>
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="news-article-excerpt">{post.excerpt}</p>
          <div className="news-article-byline">
            {post.author ? <span>By {post.author}</span> : null}
            <time dateTime={post.date}>
              {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </div>
      </header>

      {post.heroImage ? (
        <figure className="news-hero-media">
          <img src={post.heroImage} alt={post.heroAlt || post.title} />
        </figure>
      ) : null}

      <div className="news-article-body">
        {post.body.map((block, index) => {
          if (block.type === "heading") {
            return <h2 key={index}>{block.text}</h2>;
          }

          if (block.type === "image") {
            return (
              <figure className="news-inline-media" key={index}>
                <img src={block.src} alt={block.alt} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          }

          return <p key={index}>{block.text}</p>;
        })}
      </div>
    </article>
  );
}
