# Connected Web Artwork

Artwork for the Connected Web website, including images and profile materials.

## Logos

<img src="https://raw.githubusercontent.com/connected-web/connected-web/main/site/images/connected-web-gradient-large.png" alt="Connected Web Logo Gradient Large" width="30%" />
<img src="https://raw.githubusercontent.com/connected-web/connected-web/main/site/images/connected-web-flat-large.png" alt="Connected Web Logo Flat Large" width="30%" />

## Packages

This repository now publishes `@connected-web/assets` to GitHub Packages for reuse in Connected Web tools.

## Release Runbook

Use this process for `@connected-web/assets` releases.

### Important

- Preferred path: create a GitHub Release tag (`vX.Y.Z`) and let `Publish Packages Release` publish the npm package.
- Do not manually rerun the release publish job for the same version after the GitHub Release is published, or npm publish will fail because the version already exists.

### 1) Merge to `main`

- Ensure PR checks are green.
- Merge the PR to `main`.

### 2) Review changes since the previous release

For the first release there will be no previous tag. For later releases:

```bash
PREV_TAG=$(gh release list --limit 1 --json tagName --jq '.[0].tagName')
echo "Previous release: ${PREV_TAG}"
gh release view "${PREV_TAG}" --json publishedAt
```

Review merged PRs and commits that will ship:

```bash
gh pr list --state merged --base main --limit 20
git log --oneline --decorate -20
```

### 3) Prepare release notes in a file

Use a file so release notes render cleanly.

Example:

```bash
cat > /tmp/release-notes-v0.1.0.md <<'EOF_NOTES'
Published packages:
- @connected-web/assets@0.1.0

Highlights:
- Add publishable Connected Web asset package for GitHub Packages
- Generate `32`, `64`, `128`, `256`, `512`, and `large` logo variants
- Add PR and release workflows plus consumer smoke-test harness
EOF_NOTES
```

### 4) Create the GitHub Release

```bash
gh release create v0.1.0 \
  --target main \
  --title "v0.1.0" \
  --notes-file /tmp/release-notes-v0.1.0.md
```

This triggers `.github/workflows/publish-packages-release.yml`.

### 5) Monitor the publish workflow

```bash
gh run list --workflow publish-packages-release.yml --limit 1
gh run watch <run-id>
```

### 6) Verify the published package

```bash
npm view @connected-web/assets@0.1.0 version --registry=https://npm.pkg.github.com
```

### 7) Smoke-test the published package locally

```bash
source ~/.nvm/nvm.sh
export DEV_VERSION=0.1.0
export CONNECTED_WEB_PACKAGES_TOKEN=<github-packages-token>
./scripts/assets/run-consumer-smoke.sh
```
