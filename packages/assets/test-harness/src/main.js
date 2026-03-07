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
document.body.style.fontFamily = 'ui-sans-serif, system-ui, sans-serif';
document.body.style.background = 'linear-gradient(135deg, #f5f7fb 0%, #dde7f5 100%)';
document.body.style.color = '#1b2a41';

document.querySelector('#app').innerHTML = `
  <main style="min-height:100vh;display:grid;place-items:center;padding:24px;">
    <section style="width:min(880px,100%);background:rgba(255,255,255,0.92);backdrop-filter:blur(10px);border:1px solid rgba(27,42,65,0.12);border-radius:24px;padding:28px;box-shadow:0 24px 80px rgba(32,57,90,0.18);">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#4f6b8a;">Consumer smoke test</p>
      <h1 style="margin:0 0 12px;font-size:40px;line-height:1;">Connected Web assets from GitHub Packages</h1>
      <p style="margin:0 0 24px;font-size:18px;max-width:60ch;color:#355070;">This page imports the published dev package via Vite and renders both direct file exports and the helper manifest interface.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;align-items:start;">
        <figure style="margin:0;display:grid;gap:12px;justify-items:center;background:#f8fbff;border-radius:20px;padding:20px;">
          <img src="${gradientLargeHref}" alt="Connected Web gradient large" style="width:180px;height:180px;object-fit:contain;" />
          <figcaption>Direct import: gradient large</figcaption>
        </figure>
        <figure style="margin:0;display:grid;gap:12px;justify-items:center;background:#f8fbff;border-radius:20px;padding:20px;">
          <img src="${gradient256Href}" alt="Connected Web gradient 256" style="width:180px;height:180px;object-fit:contain;" />
          <figcaption>Direct import: gradient 256</figcaption>
        </figure>
        <figure style="margin:0;display:grid;gap:12px;justify-items:center;background:#f8fbff;border-radius:20px;padding:20px;">
          <img src="${flat256Href}" alt="Connected Web flat 256" style="width:180px;height:180px;object-fit:contain;" />
          <figcaption>Direct import: flat 256</figcaption>
        </figure>
      </div>
      <pre id="interface-dump" style="margin:24px 0 0;padding:16px;border-radius:16px;background:#1b2a41;color:#f8fbff;overflow:auto;font-size:13px;line-height:1.5;max-height:180px;">${JSON.stringify({ faviconHref, manifestUrl, assetKeys: Object.keys(assetMap) }, null, 2)}</pre>
    </section>
  </main>
`;
