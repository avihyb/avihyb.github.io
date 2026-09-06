# avihyb.github.io

Personal portfolio of Avichai Ben David, built with Angular 18 and deployed to GitHub Pages from the `docs` folder.

## Develop

```bash
npm ci
npm start
```

Open http://localhost:4200.

## Deploy

```bash
npm run build
```

The build writes to `docs/`, copies `index.html` to `404.html` so deep links work on GitHub Pages, and adds `.nojekyll`. Commit `docs/` together with `src/` and push `main`.

## Content

- Personal and academic projects: `src/app/projects/project-data.ts`
- Timeline: `src/app/resume/timeline-data.ts`
- Images: `public/images`
