# Turkish Compensation Calculator (Next.js)

This project has been migrated from a static `index.html` to a React + Next.js App Router structure.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project structure

- `src/app/page.js`: Home page with full calculator flow
- `src/components/CompensationCalculator.js`: Client-side interactive calculator
- `src/utils/helpers.js`: Calculation and formatting logic
- `src/app/(informational)/*`: Legal and informational pages
- `src/app/robots.js` and `src/app/sitemap.js`: SEO routes

## Notes

- Original static `index.html` can be safely removed once migration is validated.
