import type { APIRoute } from 'astro';
import { indexable, url } from '@/lib/url';

export const GET: APIRoute = ({ site }) => {
  const lines = indexable
    ? [
        'User-agent: *',
        'Allow: /',
        `Disallow: ${url('/iskanje/')}`,
        `Disallow: ${url('/admin/')}`,
        '',
        `Sitemap: ${new URL(url('/sitemap-index.xml'), site).href}`,
      ]
    : ['User-agent: *', 'Disallow: /'];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
