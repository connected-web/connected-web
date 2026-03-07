#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PACKAGE_DIR="${ROOT_DIR}/packages/assets"

cd "${PACKAGE_DIR}"
npm ci
npm run build

test -f ./dist/favicon.ico
test -f ./dist/connected-web-gradient-large.png
test -f ./dist/connected-web-flat-large.png
test -f ./dist/connected-web-gradient-32.png
test -f ./dist/connected-web-gradient-64.png
test -f ./dist/connected-web-gradient-128.png
test -f ./dist/connected-web-gradient-256.png
test -f ./dist/connected-web-gradient-512.png
test -f ./dist/connected-web-flat-32.png
test -f ./dist/connected-web-flat-64.png
test -f ./dist/connected-web-flat-128.png
test -f ./dist/connected-web-flat-256.png
test -f ./dist/connected-web-flat-512.png
test -f ./dist/manifest.json

node --input-type=module <<'NODE'
import { readFileSync } from 'node:fs';
const manifest = JSON.parse(readFileSync('./dist/manifest.json', 'utf8'));
const requiredKeys = [
  'favicon',
  'gradientLarge',
  'gradient32',
  'gradient64',
  'gradient128',
  'gradient256',
  'gradient512',
  'flatLarge',
  'flat32',
  'flat64',
  'flat128',
  'flat256',
  'flat512'
];
for (const key of requiredKeys) {
  if (!manifest.assets[key]) {
    throw new Error(`Missing manifest asset key: ${key}`);
  }
}
NODE

npm pack --dry-run
