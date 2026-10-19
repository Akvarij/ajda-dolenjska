import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.ajda-dolenjska.si',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Old WordPress URLs keep working.
  redirects: {
    '/pridelovalci': '/kmetije/',
    '/ekoloska-kmetija-krese': '/kmetije/ekoloska-kmetija-krese/',
    '/ekoloska-kmetija-gregorcic': '/kmetije/ekoloska-kmetija-gregorcic/',
    '/ekoloska-kmetija-mehak': '/kmetije/ekoloska-kmetija-mehak/',
    '/ekoloska-kmetija-zupan': '/kmetije/ekoloska-kmetija-zupan/',
    '/ekoloska-kmetija-franko': '/kmetije/ekoloska-kmetija-franko/',
    '/kontakti': '/drustvo/kontakt/',
    '/setveni-koledar': '/biodinamika/setveni-koledar/',
    '/category/galerija': '/aktualno/fotografije/',
  },
  integrations: [
    sitemap({
      // Utility pages that should not be indexed.
      filter: (page) => !page.includes('/iskanje/'),
    }),
  ],
});
