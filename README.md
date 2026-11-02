# Huidong Ma's Academic Homepage

A bilingual academic homepage built with React, TypeScript, Vite, and Tailwind CSS.

## Local Development

Node.js 24 LTS is recommended. Run the following commands in PowerShell from the project root:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open the URL shown in the terminal, usually http://localhost:3000. The page updates automatically when you save changes. No Gemini API key is required to run the website.

## Editing Content

- `src/data/siteData.ts`: Profile, publications, news, honors, and service. News, publications, honors, and service appear in their array order.
- `public/papers/`: Publication PDFs.
- `public/images/`: Profile photo and other images.
- `public/CNAME`: Custom domain, currently `www.huidong.site`.

## Checking and Building

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

The production build is generated in `dist/`. Files in `public/` are copied into the build without modification.

## GitHub Pages Deployment

The repository is `huidong-ma/huidong-ma.github.io`. In the repository's **Settings > Pages**, set **Source** to **GitHub Actions** and use `www.huidong.site` as the custom domain.

Each push to `main` triggers `.github/workflows/deploy.yml`, which installs dependencies, checks TypeScript, builds the website, and deploys `dist/`. Check the repository's **Actions** tab for deployment results.

Commit the source code, `public/`, `package-lock.json`, and deployment configuration. The `.gitignore` file excludes `node_modules/`, `dist/`, and local environment files.
