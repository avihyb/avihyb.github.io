# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Recruiters and hiring managers** — arrive from LinkedIn or a CV link, decide in under a minute whether to open a project or write an email.
- **Founders and collaborators** — evaluate whether Avichai can design and build a product end to end; they open the personal project pages.
- **Peers and students** — browse the academic work and the stack.

## Product Purpose

Personal portfolio of Avichai Ben David, a software developer. Its job is to get a visitor to open one of the three live products (Bambi, Filming It All, Climate Support) and then to make contact by email, GitHub, or LinkedIn.

## Positioning

A developer who ships whole products, not tickets: a booking marketplace (Bambi, Flutter and Supabase), a cinematic studio storefront (Filming It All, Next.js), and a food-tech landing site plus partner platform (Climate Support, Next.js and Supabase). The work is the proof; the portfolio should let the work lead.

## Operating Context

- Angular 18 single-page app deployed to GitHub Pages from `docs/`; a `404.html` fallback makes deep links work.
- Routes: Home, Projects (Personal and Academic tabs, project id in the query string), Story (timeline and stack), Contact (email, GitHub, LinkedIn; no form).
- All content is data-driven in `src/app/projects/project-data.ts` and `src/app/resume/timeline-data.ts`.

## Capabilities and Constraints

- Static hosting only: no server, no forms, no analytics beyond what GitHub Pages provides.
- Icons from FontAwesome 5 and Devicon via CDN; Inter from Google Fonts.
- Images live in `public/images`; product screenshots are WebP, logos are PNG.
- No image generation in the build pipeline; every visual is authored code or an existing asset.

## Brand Commitments

- Dark navy surface (#0b1020) with one gold accent (#ffd700), Inter throughout, glass panels with 1px borders. Established in code and confirmed by the user through several rounds.
- The hexagon portrait is the signature mark of the home page.
- Header: "Avichai." wordmark top-left, four plain text links right, no icons, no underline. User-directed 2026-09-06.
- Quiet motion: one authored intro moment, no ambient loops, no marquee, reduced-motion respected. User chose "calm it down" on 2026-09-06.
- Nothing fabricated: no invented traction, testimonials, or placeholder projects. Locked "NDA" cards were removed at the user's direction.

## Evidence on Hand

- Real product screenshots for all three personal projects, plus transparent brand marks for each.
- Portrait photo (`images/websiteintro.jpeg`).
- Academic project images and university and employer logos.
- Absent: a CV PDF, traction numbers, testimonials.

## Product Principles

- The work leads; the portfolio frames it.
- One primary action per screen: open a project, then make contact.
- Calm surface, precise details, no ornament that does not carry meaning.
- Everything reachable by keyboard, readable at 4.5:1, and shareable by URL.
