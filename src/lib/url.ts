import { site } from '@/config/site';

/**
 * The site can be served from a subfolder: the GitHub Pages preview lives at
 * /ajda-dolenjska/. Paths in data and content stay root-relative ('/kmetije/'),
 * and go through `url()` where they become a link.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

const hasBase = (path: string) => path === base || path.startsWith(`${base}/`);

/** Prefix a root-relative path with the base. Other URLs (#, mailto:, https:) pass through. */
export function url(path: string): string {
  if (!base || !path.startsWith('/') || path.startsWith('//') || hasBase(path)) return path;
  return base + path;
}

/** The current page's path without the base, for comparing with nav paths. */
export function stripBase(pathname: string): string {
  return base && hasBase(pathname) ? pathname.slice(base.length) || '/' : pathname;
}

/** Only a build for the real domain is indexed; previews (GitHub Pages) are not. */
export const indexable = new URL(import.meta.env.SITE).origin === new URL(site.url).origin;
