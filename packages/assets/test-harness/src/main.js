import faviconHref from '@connected-web/assets/favicon.ico';
import gradientLargeHref from '@connected-web/assets/connected-web-gradient-large.png';
import gradient32Href from '@connected-web/assets/connected-web-gradient-32.png';
import gradient64Href from '@connected-web/assets/connected-web-gradient-64.png';
import gradient128Href from '@connected-web/assets/connected-web-gradient-128.png';
import gradient256Href from '@connected-web/assets/connected-web-gradient-256.png';
import gradient512Href from '@connected-web/assets/connected-web-gradient-512.png';
import flatLargeHref from '@connected-web/assets/connected-web-flat-large.png';
import flat32Href from '@connected-web/assets/connected-web-flat-32.png';
import flat64Href from '@connected-web/assets/connected-web-flat-64.png';
import flat128Href from '@connected-web/assets/connected-web-flat-128.png';
import flat256Href from '@connected-web/assets/connected-web-flat-256.png';
import flat512Href from '@connected-web/assets/connected-web-flat-512.png';
import assetMap, { manifestUrl } from '@connected-web/assets';

const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.href = faviconHref;
document.head.appendChild(faviconLink);

document.body.style.margin = '0';
document.body.style.minHeight = '100vh';
document.body.style.fontFamily = 'ui-sans-serif, system-ui, sans-serif';
document.body.style.background = '#f4f7fb';
document.body.style.color = '#1b2a41';

const assetCards = [
  { label: 'Gradient large', href: gradientLargeHref, size: 160 },
  { label: 'Gradient 512', href: gradient512Href, size: 160 },
  { label: 'Gradient 256', href: gradient256Href, size: 160 },
  { label: 'Gradient 128', href: gradient128Href, size: 128 },
  { label: 'Gradient 64', href: gradient64Href, size: 64 },
  { label: 'Gradient 32', href: gradient32Href, size: 32 },
  { label: 'Flat large', href: flatLargeHref, size: 160 },
  { label: 'Flat 512', href: flat512Href, size: 160 },
  { label: 'Flat 256', href: flat256Href, size: 160 },
  { label: 'Flat 128', href: flat128Href, size: 128 },
  { label: 'Flat 64', href: flat64Href, size: 64 },
  { label: 'Flat 32', href: flat32Href, size: 32 },
  { label: 'Favicon', href: faviconHref, size: 16, tone: '#ffffff' }
];

const debugPayload = {
  manifestUrl,
  assetKeys: Object.keys(assetMap),
  samples: Object.fromEntries(Object.entries(assetMap).slice(0, 6))
};

const galleryMarkup = assetCards.map(({ label, href, size, tone = '#f8fbfe' }) => `
  <figure style="margin:0;padding:16px;border:1px solid #e3ebf4;border-radius:16px;background:${tone};text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:180px;">
    <div style="width:100%;min-height:96px;display:flex;align-items:center;justify-content:center;">
      <img src="${href}" alt="${label}" style="width:${size}px;max-width:100%;aspect-ratio:1 / 1;object-fit:contain;display:block;image-rendering:auto;" />
    </div>
    <figcaption style="font-size:14px;color:#4a6078;">${label}</figcaption>
  </figure>
`).join('');

document.querySelector('#app').innerHTML = `
  <main style="min-height:100vh;padding:32px 20px 48px;box-sizing:border-box;">
    <section style="max-width:1120px;margin:0 auto;background:#ffffff;border:1px solid #d8e2ee;border-radius:20px;padding:24px;box-shadow:0 12px 30px rgba(27,42,65,0.08);box-sizing:border-box;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#5b728c;">Consumer smoke test</p>
      <h1 style="margin:0 0 12px;font-size:40px;line-height:1.05;letter-spacing:-0.03em;">Connected Web assets package</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:#4a6078;max-width:64ch;">This page verifies that Vite can import the published package assets directly and that the helper interface is available to consumers. All exported image assets are tiled below for visual inspection.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;align-items:start;">
        ${galleryMarkup}
      </div>
      <pre id="interface-dump" style="margin:24px 0 0;padding:14px 16px;border-radius:14px;background:#1b2a41;color:#f8fbff;overflow:auto;font-size:12px;line-height:1.45;max-height:160px;white-space:pre-wrap;word-break:break-word;">${JSON.stringify(debugPayload, null, 2)}</pre>
    </section>
  </main>
`;
