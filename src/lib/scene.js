/**
 * Generates a soft, bright landscape illustration as an SVG string. Used as a
 * stand-in wherever a photo has not been supplied yet, so the layout never
 * shows an empty grey box. Deterministic for a given seed.
 */

/** @param {number} a */
function rng(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const palettes = [
  { sky: ['#cfeaf7', '#fff7dc'], sun: '#ffd56a', hills: ['#d6e8a6', '#b5d67b', '#8dbb52', '#6aa23c'] },
  { sky: ['#d9f0fb', '#f4fbff'], sun: '#fff1a8', hills: ['#dcebb0', '#bddb84', '#98c25d', '#74a845'] },
  { sky: ['#ffe8bf', '#ffd6c2'], sun: '#ffc857', hills: ['#e3e9a8', '#c4d97a', '#9cc255', '#78a63f'] },
  { sky: ['#e8f3df', '#fbfff2'], sun: '#ffe48a', hills: ['#d3e6a8', '#b0d57c', '#8abb55', '#68a03e'] },
  { sky: ['#d4ecf5', '#fffbea'], sun: '#ffdb70', hills: ['#cfe5a0', '#abd176', '#86b84e', '#639b38'] },
];

/**
 * @param {{ seed?: number, width?: number, height?: number, xmlns?: boolean }} [opts]
 */
export function sceneSvg({ seed = 1, width = 1200, height = 800, xmlns = false } = {}) {
  const rand = rng(seed * 7919 + 13);
  const p = palettes[Math.abs(seed) % palettes.length];
  const W = width;
  const H = height;
  const uid = `s${Math.abs(seed)}`;

  const hill = (/** @type {number} */ base, /** @type {number} */ amp, /** @type {string} */ color) => {
    const pts = [];
    const n = 5;
    for (let i = 0; i <= n; i++) pts.push([(W / n) * i, base + (rand() - 0.5) * amp]);
    let d = `M0 ${H} L0 ${pts[0][1].toFixed(1)}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const cx = (x0 + x1) / 2;
      d += ` C ${cx.toFixed(1)} ${y0.toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    }
    d += ` L${W} ${H} Z`;
    return `<path d="${d}" fill="${color}"/>`;
  };

  const tree = (/** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ s) =>
    `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})"><rect x="-3" y="-4" width="6" height="22" rx="2" fill="#8a6a4a"/><ellipse cx="0" cy="-18" rx="20" ry="26" fill="#5d9433"/><ellipse cx="-6" cy="-24" rx="10" ry="14" fill="#7fb34a"/></g>`;

  const house = (/** @type {number} */ x, /** @type {number} */ y, /** @type {number} */ s) =>
    `<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) scale(${s.toFixed(2)})"><rect x="-28" y="-26" width="56" height="30" fill="#fffaf0"/><path d="M-34 -24 L0 -52 L34 -24 Z" fill="#d98b6a"/><rect x="-6" y="-14" width="12" height="18" fill="#c9b79a"/></g>`;

  const blooms = [];
  for (let i = 0; i < 70; i++) {
    const x = rand() * W;
    const y = H * 0.72 + rand() * H * 0.28;
    const r = 3 + rand() * 4 * (y / H);
    blooms.push(`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${rand() > 0.45 ? '#ffffff' : '#f6b8bf'}" opacity="0.92"/>`);
  }

  const sunX = W * (0.2 + rand() * 0.6);
  const sunY = H * (0.16 + rand() * 0.12);

  return `<svg ${xmlns ? 'xmlns="http://www.w3.org/2000/svg" ' : ''}viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">` +
    `<defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/></linearGradient></defs>` +
    `<rect width="${W}" height="${H}" fill="url(#${uid})"/>` +
    `<circle cx="${sunX.toFixed(0)}" cy="${sunY.toFixed(0)}" r="${(H * 0.13).toFixed(0)}" fill="${p.sun}" opacity="0.35"/>` +
    `<circle cx="${sunX.toFixed(0)}" cy="${sunY.toFixed(0)}" r="${(H * 0.075).toFixed(0)}" fill="${p.sun}"/>` +
    hill(H * 0.52, H * 0.14, p.hills[0]) +
    house(W * (0.25 + rand() * 0.5), H * 0.5, 1.1 + rand() * 0.4) +
    hill(H * 0.64, H * 0.14, p.hills[1]) +
    tree(W * (0.1 + rand() * 0.2), H * 0.62, 1 + rand() * 0.4) +
    tree(W * (0.7 + rand() * 0.2), H * 0.6, 0.9 + rand() * 0.4) +
    hill(H * 0.78, H * 0.12, p.hills[2]) +
    hill(H * 0.92, H * 0.1, p.hills[3]) +
    blooms.join('') +
    `</svg>`;
}
