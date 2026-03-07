import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const packageRoot = path.resolve(import.meta.dirname, '..');
const repoRoot = path.resolve(packageRoot, '..', '..');
const sourceDir = path.join(repoRoot, 'site', 'images');
const distDir = path.join(packageRoot, 'dist');

const baseAssets = [
  {
    source: 'favicon.ico',
    output: 'favicon.ico',
    kind: 'icon'
  },
  {
    source: 'connected-web-gradient-large.png',
    output: 'connected-web-gradient-large.png',
    kind: 'image',
    variants: [128, 256, 512]
  },
  {
    source: 'connected-web-flat-large.png',
    output: 'connected-web-flat-large.png',
    kind: 'image',
    variants: [128, 256, 512]
  }
];

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

const manifest = {
  generatedAt: new Date().toISOString(),
  assets: {}
};

for (const asset of baseAssets) {
  const sourcePath = path.join(sourceDir, asset.source);
  const outputPath = path.join(distDir, asset.output);

  await cp(sourcePath, outputPath);

  if (asset.kind === 'icon') {
    manifest.assets.favicon = asset.output;
    continue;
  }

  const name = asset.output.includes('gradient') ? 'gradient' : 'flat';
  const buffer = await readFile(sourcePath);
  const metadata = await sharp(buffer).metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  manifest.assets[`${name}Large`] = asset.output;

  for (const size of asset.variants ?? []) {
    if (size > width || size > height) {
      continue;
    }

    const resizedName = asset.output.replace('-large.png', `-${size}.png`);
    const resizedPath = path.join(distDir, resizedName);

    await sharp(buffer)
      .resize(size, size, { fit: 'contain', withoutEnlargement: true })
      .png()
      .toFile(resizedPath);

    manifest.assets[`${name}${size}`] = resizedName;
  }
}

await writeFile(path.join(distDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
