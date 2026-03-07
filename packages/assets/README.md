# @connected-web/assets

Shared Connected Web brand assets for npm-based tooling.

## Install

```bash
npm config set @connected-web:registry https://npm.pkg.github.com
npm install @connected-web/assets
```

## Vite usage

Import files directly so Vite fingerprints and bundles them:

```ts
import gradientLogo from '@connected-web/assets/connected-web-gradient-256.png';
import faviconIco from '@connected-web/assets/favicon.ico';
```

You can also import the helper map:

```ts
import { assets, manifestUrl } from '@connected-web/assets';
```

## Included assets

- `favicon.ico`
- `connected-web-gradient-large.png`
- `connected-web-flat-large.png`
- Generated PNG variants for the large logos at `128`, `256`, and `512` square resolution when the source image is large enough.

## Build

```bash
npm install
npm run build
```

The build copies canonical assets from `../../site/images` and generates the scaled PNG variants into `dist/`.
