# Raja Sudarsan: Portfolio

Interactive 3D portfolio for an Associate MERN Stack Developer. Live at https://raja-sudarsan-portfolio.vercel.app

## Stack
React 19, TypeScript, Vite, Tailwind CSS 4, Motion, Three.js (react-three-fiber). npm workspaces monorepo deployed on Vercel.

## Structure
- `apps/web`: the site (routing, pages, styles)
- `packages/shared`: content data, routes, mouse swarm, scramble text, cards, parallax
- `packages/world-3d`: the 3D island and animated buildings (lazy-loaded chunk)

## Features
- Fixed 3D island background that becomes an interactive world on the last section; buildings open summary cards that link to each page
- Mouse swarm: labelled cursors draw selection boxes and rebuild each page element by element
- Scramble-decode headings, layered parallax, 3D scroll zoom

## Develop
```bash
npm install
npm run dev
npm run build
```

## Credits
- 3D model "Fox's islands" by nimzu (https://sketchfab.com/nimzuk), CC-BY-4.0, via [sanidhyy/3d_portfolio](https://github.com/sanidhyy/3d_portfolio) (MIT)
- Swarm cursor idea inspired by [ruvnet/mouse-swarm](https://github.com/ruvnet/mouse-swarm) and [DhvanilPatel/swarm-cursors](https://github.com/DhvanilPatel/swarm-cursors)
- Draco decoder from three.js (MIT)

## Resume
Source: `resume/resume.html`. Print it to PDF (A4, no headers/footers) and save as `apps/web/public/Raja_Sudarsan_Resume.pdf`.
