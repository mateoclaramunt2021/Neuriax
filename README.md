This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Vercel Deploy Rules

To prevent deployment errors and ensure smooth CI/CD:

### ✅ DO:
- Define Node version in `package.json` under `"engines"`:
  ```json
  "engines": { "node": "18.x", "npm": "10.x" }
  ```
- Keep `vercel.json` minimal with only supported properties: `buildCommand`, `framework`, `env`, `rewrites`, `redirects`, `headers`
- Run `npm run build` locally before pushing - it validates `vercel.json`

### ❌ DON'T:
- ❌ Put `nodeVersion` in `vercel.json` (NOT supported by Vercel)
- ❌ Put `pythonVersion`, `rubyVersion`, or `goVersion` in `vercel.json`
- ❌ Use custom/unsupported properties in `vercel.json`

### 🔍 Validation:
- Before every build, `scripts/validate-vercel-config.js` checks for forbidden keys
- If found, build fails immediately with clear error message
- This prevents deployment errors at deploy time

### 📝 When deploying:
1. Make sure `npm run build` passes locally
2. Push to GitHub/main
3. Vercel auto-deploys with safe configuration
4. Check deployment logs on https://vercel.com/dashboard
