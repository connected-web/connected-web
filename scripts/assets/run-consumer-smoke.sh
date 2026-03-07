#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
HARNESS_TEMPLATE_DIR="${ROOT_DIR}/packages/assets/test-harness"
WORK_DIR="${ROOT_DIR}/tmp/assets-consumer"
DEV_VERSION="${DEV_VERSION:-}"
PACKAGE_TOKEN="${CONNECTED_WEB_PACKAGES_TOKEN:-${NODE_AUTH_TOKEN:-}}"

if [[ -z "${DEV_VERSION}" ]]; then
  echo "DEV_VERSION is required" >&2
  exit 1
fi

if [[ -z "${PACKAGE_TOKEN}" ]]; then
  echo "CONNECTED_WEB_PACKAGES_TOKEN or NODE_AUTH_TOKEN is required" >&2
  exit 1
fi

rm -rf "${WORK_DIR}"
mkdir -p "${WORK_DIR}/src"
cp "${HARNESS_TEMPLATE_DIR}/index.html" "${WORK_DIR}/index.html"
cp "${HARNESS_TEMPLATE_DIR}/src/main.js" "${WORK_DIR}/src/main.js"
cp "${HARNESS_TEMPLATE_DIR}/smoke-test.mjs" "${WORK_DIR}/smoke-test.mjs"
sed "s/__DEV_VERSION__/${DEV_VERSION}/g" "${HARNESS_TEMPLATE_DIR}/package.json.template" > "${WORK_DIR}/package.json"
cat > "${WORK_DIR}/.npmrc" <<NPMRC
@connected-web:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${PACKAGE_TOKEN}
NPMRC

cd "${WORK_DIR}"
npm install

PACKAGE_DIR="${WORK_DIR}/node_modules/@connected-web/assets"
find "${PACKAGE_DIR}" -maxdepth 2 -type f | sort
node --input-type=module <<'NODE'
import assets, { manifestUrl } from './node_modules/@connected-web/assets/src/index.js';
console.log(JSON.stringify({ manifestUrl, assetKeys: Object.keys(assets) }, null, 2));
NODE

PLAYWRIGHT_INSTALL_ARGS=(chromium)
if [[ "${CI:-}" == "true" ]]; then
  PLAYWRIGHT_INSTALL_ARGS=(--with-deps chromium)
fi
npx playwright install "${PLAYWRIGHT_INSTALL_ARGS[@]}"
npm run build
npm run preview > /tmp/assets-consumer-preview.log 2>&1 &
PREVIEW_PID=$!
trap 'kill ${PREVIEW_PID}' EXIT
for _ in $(seq 1 30); do
  if curl --silent --fail http://127.0.0.1:4173 > /dev/null; then
    break
  fi
  sleep 1
done
node ./smoke-test.mjs
