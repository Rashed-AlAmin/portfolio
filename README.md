# Md Rashed Al Amin — Portfolio

Personal portfolio of **Md Rashed Al Amin**, Full-Stack Developer (TypeScript · React · Next.js · Node.js · FastAPI · PostgreSQL · Shopify · LLMs).

## Highlights

- **Live data**: GitHub stats, a contribution heatmap, recent repos, Codeforces rating and LeetCode solve counts, fetched on the server and refreshed every hour (Cache Components + `use cache`). Every source fails gracefully if an API is down.
- **Static and fast**: the whole page is prerendered and served from Vercel's edge. Fonts, images and OG images are optimized.
- **⌘K / Ctrl K command palette** to jump to sections, copy the email, open profiles and switch themes.
- **Dark and light themes** with no flash on load.
- **Contact form**: a Server Action with Zod validation and a honeypot, delivered through Resend. When no Resend key is set it opens the visitor's email app instead.
- **SEO**: metadata, generated Open Graph image, JSON-LD `Person` schema, sitemap, robots and web manifest.
- **Accessibility**: semantic landmarks, a skip link, visible focus states, and support for `prefers-reduced-motion`.
- **Security headers** and no `x-powered-by` header.

## Stack

| Layer      | Choice                                                   |
| ---------- | -------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Cache Components, Turbopack)     |
| UI         | React 19, Tailwind CSS 4, Motion, lucide-react, cmdk     |
| Validation | Zod                                                      |
| Hosting    | Vercel (+ Analytics & Speed Insights)                    |

## Editing content

All the content lives in **one file**: [`src/content/profile.ts`](src/content/profile.ts). Experience, projects, skills, achievements and links are all there. Change it, push, and Vercel redeploys automatically.

To change the photo, replace `public/images/rashed.jpg`. To change the CV, replace `public/Rashed_Al_Amin_CV.pdf`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Optional environment variables are documented in [`.env.example`](.env.example).

## Deploy to Vercel (free)

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. Import this repository. Vercel detects Next.js automatically, so you don't need to change any settings.
3. Click **Deploy**. Every push to `main` then redeploys the site.
4. Optional: in **Project → Settings → Environment Variables**, add `GITHUB_TOKEN` and `RESEND_API_KEY` (see `.env.example`), then redeploy.
5. Optional: in **Project → Analytics** and **Speed Insights**, enable both. They're free on the Hobby plan.
