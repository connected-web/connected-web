const toAssetUrl = (relativePath) => new URL(relativePath, import.meta.url).href;

export const assets = {
  favicon: toAssetUrl('../dist/favicon.ico'),
  gradientLarge: toAssetUrl('../dist/connected-web-gradient-large.png'),
  flatLarge: toAssetUrl('../dist/connected-web-flat-large.png'),
  gradient32: toAssetUrl('../dist/connected-web-gradient-32.png'),
  gradient64: toAssetUrl('../dist/connected-web-gradient-64.png'),
  gradient128: toAssetUrl('../dist/connected-web-gradient-128.png'),
  gradient256: toAssetUrl('../dist/connected-web-gradient-256.png'),
  gradient512: toAssetUrl('../dist/connected-web-gradient-512.png'),
  flat32: toAssetUrl('../dist/connected-web-flat-32.png'),
  flat64: toAssetUrl('../dist/connected-web-flat-64.png'),
  flat128: toAssetUrl('../dist/connected-web-flat-128.png'),
  flat256: toAssetUrl('../dist/connected-web-flat-256.png'),
  flat512: toAssetUrl('../dist/connected-web-flat-512.png'),
  maskableLarge: toAssetUrl('../dist/connected-web-maskable-large.png'),
  maskable180: toAssetUrl('../dist/connected-web-maskable-180.png'),
  maskable192: toAssetUrl('../dist/connected-web-maskable-192.png'),
  maskable512: toAssetUrl('../dist/connected-web-maskable-512.png')
};

export const manifestUrl = toAssetUrl('../dist/manifest.json');

export default assets;
