# @connected-web/assets

Shared Connected Web brand assets for npm-based tooling.

## Install

```bash
npm config set @connected-web:registry https://npm.pkg.github.com
npm install @connected-web/assets
```

## User guide

### Direct asset imports

Import the exact asset file you want and let Vite fingerprint it during build:

```ts
import gradient256 from '@connected-web/assets/connected-web-gradient-256.png';
import flat64 from '@connected-web/assets/connected-web-flat-64.png';
import faviconIco from '@connected-web/assets/favicon.ico';
```

This is the preferred approach when you already know which size you want to render.

### Helper map imports

Import the helper map when your component wants to select an asset at runtime:

```ts
import { assets } from '@connected-web/assets';

const logoSrc = assets.gradient128;
const iconSrc = assets.flat32;
```

Available helper keys:

- `favicon`
- `gradientLarge`, `gradient512`, `gradient256`, `gradient128`, `gradient64`, `gradient32`
- `flatLarge`, `flat512`, `flat256`, `flat128`, `flat64`, `flat32`

### Manifest usage

Import the manifest URL if you want to fetch or inspect the published asset inventory:

```ts
import { manifestUrl } from '@connected-web/assets';

const manifest = await fetch(manifestUrl).then((response) => response.json());
```

### Choosing asset sizes

- Use `32` or `64` for compact icons in buttons, menus, or dense navigation.
- Use `128` or `256` for standard app branding surfaces.
- Use `512` or `large` for docs, social previews, or places where the asset may be scaled down by the consumer.
- Use `favicon.ico` only for browser favicon wiring.

### Example: Vite app usage

```ts
import faviconIco from '@connected-web/assets/favicon.ico';
import logo from '@connected-web/assets/connected-web-gradient-256.png';

const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.href = faviconIco;
document.head.appendChild(faviconLink);

document.querySelector('#app').innerHTML = `
  <img src="${logo}" alt="Connected Web" width="128" height="128" />
`;
```

## Included assets

- `favicon.ico`
- `connected-web-gradient-large.png`
- `connected-web-flat-large.png`
- Generated PNG variants for the large logos at `32`, `64`, `128`, `256`, and `512` square resolution when the source image is large enough.

## Build

```bash
npm install
npm run build
```

The build copies canonical assets from `../../site/images` and generates the scaled PNG variants into `dist/`.

## Local verification

Run the same package checks used by CI:

```bash
source ~/.nvm/nvm.sh
./scripts/assets/check-package.sh
```

Run the local consumer smoke test against a published package version:

```bash
source ~/.nvm/nvm.sh
export DEV_VERSION=0.0.0-dev-<commit-sha>
export CONNECTED_WEB_PACKAGES_TOKEN=<github-packages-token>
./scripts/assets/run-consumer-smoke.sh
```

The consumer smoke test creates a temporary Vite app under `tmp/assets-consumer/`, installs the published package, builds it, and writes screenshot/assertion artifacts into `tmp/assets-consumer/artifacts/`.
