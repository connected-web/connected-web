const toAssetUrl = (relativePath) => new URL(relativePath, import.meta.url).href;

export const assets = {
  favicon: toAssetUrl('../dist/favicon.ico'),
  gradientLarge: toAssetUrl('../dist/connected-web-gradient-large.png'),
  flatLarge: toAssetUrl('../dist/connected-web-flat-large.png'),
  gradient128: toAssetUrl('../dist/connected-web-gradient-128.png'),
  gradient256: toAssetUrl('../dist/connected-web-gradient-256.png'),
  gradient512: toAssetUrl('../dist/connected-web-gradient-512.png'),
  flat128: toAssetUrl('../dist/connected-web-flat-128.png'),
  flat256: toAssetUrl('../dist/connected-web-flat-256.png'),
  flat512: toAssetUrl('../dist/connected-web-flat-512.png')
};

export const manifestUrl = toAssetUrl('../dist/manifest.json');

export default assets;
