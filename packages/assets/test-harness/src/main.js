import faviconHref from '@connected-web/assets/favicon.ico';
import gradientLargeHref from '@connected-web/assets/connected-web-gradient-large.png';
import gradient256Href from '@connected-web/assets/connected-web-gradient-256.png';
import flat256Href from '@connected-web/assets/connected-web-flat-256.png';
import assetMap, { manifestUrl } from '@connected-web/assets';

const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.href = faviconHref;
document.head.appendChild(faviconLink);

document.body.style.margin = '0';
document.body.style.minHeight = '100vh';
document.body.style.fontFamily = 'ui-sans-serif, system-ui, sans-serif';
document.body.style.background = 'radial-gradient(circle at top, #f8fbff 0%, #e6edf7 45%, #dde7f5 100%)';
document.body.style.color = '#1b2a41';
document.body.style.overflowX = 'hidden';

const assetKeys = Object.keys(assetMap);
const debugPayload = {
  manifestUrl,
  assetKeys,
  samples: {
    gradientLarge: assetMap.gradientLarge,
    gradient256: assetMap.gradient256,
    flat256: assetMap.flat256
  }
};

document.querySelector('#app').innerHTML = `
  <main style="min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box;">
    <section style="width:min(960px,100%);box-sizing:border-box;background:rgba(255,255,255,0.94);backdrop-filter:blur(10px);border:1px solid rgba(27,42,65,0.10);border-radius:24px;padding:24px;box-shadow:0 24px 80px rgba(32,57,90,0.14);overflow:hidden;">
      <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#4f6b8a;">Consumer smoke test</p>
      <h1 style="margin:0 0 10px;font-size:clamp(32px,5vw,52px);line-height:0.95;letter-spacing:-0.04em;max-width:12ch;">Connected Web assets package</h1>
      <p style="margin:0 0 20px;font-size:16px;max-width:60ch;color:#49627f;">Vite resolves direct file imports from the published package, and the helper manifest interface is available to consumers.</p>
      <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;align-items:start;">
        <figure style="margin:0;display:grid;gap:10px;justify-items:center;background:#f8fbff;border-radius:18px;padding:18px;min-width:0;">
          <img src="${gradientLargeHref}" alt="Connected Web gradient large" style="width:min(100%,160px);aspect-ratio:1 / 1;object-fit:contain;" />
          <figcaption style="text-align:center;color:#4a5f79;">Gradient large</figcaption>
        </figure>
        <figure style="margin:0;display:grid;gap:10px;justify-items:center;background:#f8fbff;border-radius:18px;padding:18px;min-width:0;">
          <img src="${gradient256Href}" alt="Connected Web gradient 256" style="width:min(100%,160px);aspect-ratio:1 / 1;object-fit:contain;" />
          <figcaption style="text-align:center;color:#4a5f79;">Gradient 256</figcaption>
        </figure>
        <figure style="margin:0;display:grid;gap:10px;justify-items:center;background:#f8fbff;border-radius:18px;padding:18px;min-width:0;">
          <img src="${flat256Href}" alt="Connected Web flat 256" style="width:min(100%,160px);aspect-ratio:1 / 1;object-fit:contain;" />
          <figcaption style="text-align:center;color:#4a5f79;">Flat 256</figcaption>
        </figure>
      </div>
      <pre id="interface-dump" style="margin:20px 0 0;padding:14px 16px;border-radius:16px;background:#1b2a41;color:#f8fbff;overflow:auto;font-size:12px;line-height:1.45;max-height:160px;white-space:pre-wrap;word-break:break-word;">${JSON.stringify(debugPayload, null, 2)}</pre>
    </section>
  </main>
`;
