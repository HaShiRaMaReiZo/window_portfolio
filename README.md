# Windows 10 Portfolio

A portfolio website that replicates the Windows 10 desktop UI. Double-click desktop icons to open windows (About Me, Projects). Windows are draggable, resizable, and support minimize, maximize, and close.

## Run

- `npm install`
- `npm run dev` — open [http://localhost:3000](http://localhost:3000)
- `npm run build` && `npm start` — production

## Customize

- **About Me**: Edit [data/about.ts](data/about.ts) (name, bio, education, experience, interests). Add your photo at `public/about-photo.jpg` and set `photo: "/about-photo.jpg"`.
- **Projects**: Edit [data/projects.ts](data/projects.ts) (title, description, image, link, tech).
- **Wallpaper**: Add `public/wallpaper.jpg` for a custom desktop background, or keep the default gradient.
- **Icons**: Replace `public/icons/about.svg` and `public/icons/folder.svg` with your own.

## Tech

Next.js 15 (App Router), React, TypeScript, Zustand, React Bootstrap, custom CSS.

## Git & GitHub

The repo is set up to be safe to push:

- **`.gitignore`** excludes `node_modules/`, `.next/`, build output, and **all `.env*` files** (so API keys and secrets are never committed).
- **Do not commit** `.env`, `.env.local`, or any file containing passwords, API keys, or tokens. Use [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) or your host’s env config for production.
- After cloning, run `npm install`; no secret setup is required for the default portfolio.
