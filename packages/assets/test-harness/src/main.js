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
document.body.style.background = '#f4f7fb';
document.body.style.color = '#1b2a41';

const debugPayload = {
  manifestUrl,
  assetKeys: Object.keys(assetMap),
  samples: {
    gradientLarge: assetMap.gradientLarge,
    gradient256: assetMap.gradient256,
    flat256: assetMap.flat256
  }
};

document.querySelector('#app').innerHTML = `
  <main style="min-height:100vh;padding:32px 20px 48px;box-sizing:border-box;">
    <section style="max-width:960px;margin:0 auto;background:#ffffff;border:1px solid #d8e2ee;border-radius:20px;padding:24px;box-shadow:0 12px 30px rgba(27,42,65,0.08);box-sizing:border-box;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#5b728c;">Consumer smoke test</p>
      <h1 style="margin:0 0 12px;font-size:40px;line-height:1.05;letter-spacing:-0.03em;">Connected Web assets package</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:#4a6078;max-width:64ch;">This page verifies that Vite can import the published package assets directly and that the helper interface is available to consumers.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;align-items:start;">
        <figure style="margin:0;padding:16px;border:1px solid #e3ebf4;border-radius:16px;background:#f8fbfe;text-align:center;">
          <img src="${gradientLargeHref}" alt="Connected Web gradient large" style="width:160px;max-width:100%;aspect-ratio:1 / 1;object-fit:contain;display:block;margin:0 auto 12px;" />
          <figcaption style="font-size:14px;color:#4a6078;">Gradient large</figcaption>
        </figure>
        <figure style="margin:0;padding:16px;border:1px solid #e3ebf4;border-radius:16px;background:#f8fbfe;text-align:center;">
          <img src="${gradient256Href}" alt="Connected Web gradient 256" style="width:160px;max-width:100%;aspect-ratio:1 / 1;object-fit:contain;display:block;margin:0 auto 12px;" />
          <figcaption style="font-size:14px;color:#4a6078;">Gradient 256</figcaption>
        </figure>
        <figure style="margin:0;padding:16px;border:1px solid #e3ebf4;border-radius:16px;background:#f8fbfe;text-align:center;">
          <img src="${flat256Href}" alt="Connected Web flat 256" style="width:160px;max-width:100%;aspect-ratio:1 / 1;object-fit:contain;display:block;margin:0 auto 12px;" />
          <figcaption style="font-size:14px;color:#4a6078;">Flat 256</figcaption>
        </figure>
      </div>
      <pre id="interface-dump" style="margin:24px 0 0;padding:14px 16px;border-radius:14px;background:#1b2a41;color:#f8fbff;overflow:auto;font-size:12px;line-height:1.45;max-height:160px;white-space:pre-wrap;word-break:break-word;">${JSON.stringify(debugPayload, null, 2)}</pre>
    </section>
  </main>
`;
