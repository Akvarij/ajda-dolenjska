import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The GitHub Pages preview builds with SITE and BASE set (.github/workflows/deploy.yml).
// Without them the build targets the real domain at its root.
const site = process.env.SITE ?? 'https://www.ajda-dolenjska.si';
const base = process.env.BASE ?? '/';
const prefix = base.replace(/\/$/, '');

/** Point root-relative links in Markdown ('/kmetije/') into the base folder too. */
function rehypeBase() {
  const fix = (v) => (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') ? prefix + v : v);
  const walk = (node) => {
    if (node.type === 'element') {
      for (const attr of ['href', 'src']) if (attr in node.properties) node.properties[attr] = fix(node.properties[attr]);
    } else if (node.type === 'raw') {
      // Inline HTML in Markdown (e.g. <a class="btn">) is only parsed after this plugin runs.
      node.value = node.value.replace(/\b(href|src)="\/(?!\/)/g, `$1="${prefix}/`);
    }
    node.children?.forEach(walk);
  };
  return (tree) => {
    if (prefix) walk(tree);
  };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { rehypePlugins: [rehypeBase] },
  // Old WordPress URLs keep working. Astro doesn't add the base to redirect targets.
  redirects: Object.fromEntries(
    Object.entries({
      '/pridelovalci': '/kmetije/',
      '/ekoloska-kmetija-krese': '/kmetije/ekoloska-kmetija-krese/',
      '/ekoloska-kmetija-gregorcic': '/kmetije/ekoloska-kmetija-gregorcic/',
      '/ekoloska-kmetija-mehak': '/kmetije/ekoloska-kmetija-mehak/',
      '/ekoloska-kmetija-zupan': '/kmetije/ekoloska-kmetija-zupan/',
      '/ekoloska-kmetija-franko': '/kmetije/ekoloska-kmetija-franko/',
      '/kontakti': '/drustvo/kontakt/',
      '/setveni-koledar': '/biodinamika/pomembne-osebnosti/',
      '/category/galerija': '/aktualno/fotografije/',
    }).map(([from, to]) => [from, prefix + to]),
  ),
  integrations: [
    sitemap({
      // Utility pages that should not be indexed.
      filter: (page) => !page.includes('/iskanje/'),
    }),
  ],
});
