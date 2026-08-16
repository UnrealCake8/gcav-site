# Independent game studio website

A standalone, static-first studio site built with Next.js and TypeScript. It has no Wix code, database, accounts, analytics, or CMS. All content lives in small files inside `content/`.

## Start locally

Install [Node.js 20 or newer](https://nodejs.org), then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Create a production build with `npm run build`; the static site is written to `out/`.

## Edit the studio

### Name, description, domain, and color

Open `content/site.ts`:

* Replace `STUDIO_NAME` and `STUDIO_DESCRIPTION` with approved copy.
* Change `siteUrl` to the final `https://...` domain. This powers canonical links, the sitemap, and social metadata.
* Change `accentColor` to any CSS hex color.

### Logo

Put the official asset in `public/logo.svg`, then set `logo: "/logo.svg"` in `content/site.ts`. Until then, the header deliberately displays a simple replaceable placeholder—not an invented studio identity.

### Discord, Roblox, and social links

Paste only official URLs into `content/social.ts`. Leave unknown URLs blank; blank destinations are automatically hidden. A game-specific Roblox or Discord URL belongs on that game in `content/games.ts`.

## Games and images

Games are objects in `content/games.ts`. Copy the existing object, give it a unique URL-safe `slug`, and fill only verified fields. Empty status, description, feature, media, and link fields remain hidden.

Store a game's assets in `public/games/your-game-slug/`. Set `heroImage` to its public path, for example `/games/your-game-slug/hero.webp`. Use compressed WebP, AVIF, JPEG, PNG, or SVG images. A 1920×1080 image is a practical hero starting point. Adjust `heroPosition` (for example `"65% 40%"`) to keep the subject visible. Set `featured: true` to include it in the homepage carousel. With one featured game, controls hide automatically; with several, arrows, keyboard arrow keys, and mobile swiping work automatically.

Add media to `screenshots` like this:

```ts
screenshots: [
  { src: "/games/your-game-slug/screenshot-01.webp", alt: "Accurate image description" },
]
```

### Change the homepage hero

Replace the referenced hero file or update a featured game's `heroImage`. The included SVG is an original neutral placeholder illustration and can be replaced without component changes.

## Newswire

Posts live in `content/news.ts`. The array intentionally starts empty. Add only genuine posts using the exported `NewsPost` shape. When it is empty, the homepage and Newswire show an honest empty state. Article-detail routing can be added when the first approved post is ready.

## Deployment

### Vercel

Import the Git repository in Vercel and deploy. Vercel detects Next.js automatically. No environment variables are required.

### Cloudflare Pages

This project uses static export for broad portability. In Cloudflare Pages choose **Next.js (Static HTML Export)**, use `npm run build` as the build command, and `out` as the output directory. Use Node.js 20 or newer in the build settings.

## Before publishing

1. Replace every all-caps placeholder in `content/site.ts`.
2. Configure the real domain and official links.
3. Replace the placeholder logo and hero art when official assets are available.
4. Run `npm run build` and review every route on both a phone-sized and desktop viewport.
5. Verify image crops, focus states, menu operation, and every external destination.

The core routes are `/`, `/games`, `/games/[slug]`, `/newswire`, `/developer`, and `/community`. All are statically generated and portable.
