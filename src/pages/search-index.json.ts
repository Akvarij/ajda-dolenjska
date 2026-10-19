import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { nav } from '@/data/nav';
import { eventUrl, getEvents, typeLabels } from '@/lib/events';
import { getPosts, kindLabel, postUrl } from '@/lib/posts';
import { url } from '@/lib/url';

interface Entry {
  /** title */
  t: string;
  /** url */
  u: string;
  /** kind label */
  k: string;
  /** summary */
  s: string;
  /** body text (plain, truncated) */
  b: string;
}

const plain = (md = '') =>
  md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`|~-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 1800);

export const GET: APIRoute = async () => {
  const entries: Entry[] = [];
  const seen = new Set<string>();
  const add = (e: Entry) => {
    const u = url(e.u);
    if (seen.has(u)) return;
    seen.add(u);
    entries.push({ ...e, u });
  };

  for (const p of await getCollection('pages')) {
    add({ t: p.data.title, u: `/${p.id}/`, k: 'Stran', s: p.data.lead ?? '', b: plain(p.body) });
  }
  for (const e of await getEvents()) {
    add({
      t: e.data.title,
      u: eventUrl(e),
      k: typeLabels[e.data.type],
      s: e.data.summary,
      b: plain(`${e.data.location} ${e.data.speaker ?? ''} ${e.body ?? ''}`),
    });
  }
  for (const p of await getPosts()) {
    add({ t: p.data.title, u: postUrl(p), k: kindLabel(p), s: p.data.summary, b: plain(p.body) });
  }
  for (const f of await getCollection('farms')) {
    add({
      t: f.data.name,
      u: `/kmetije/${f.id}/`,
      k: 'Kmetija',
      s: f.data.summary,
      b: plain(`${f.data.city} ${f.data.offer.join(' ')} ${f.data.services.join(' ')} ${f.body ?? ''}`),
    });
  }
  for (const a of await getCollection('albums')) {
    add({ t: a.data.title, u: `/aktualno/fotografije/${a.id}/`, k: 'Galerija', s: a.data.summary ?? '', b: '' });
  }
  for (const d of await getCollection('documents')) {
    add({ t: d.data.title, u: d.data.file, k: 'Dokument', s: d.data.description, b: d.data.speaker ?? '' });
  }
  for (const m of await getCollection('media')) {
    add({ t: m.data.title, u: '/aktualno/video-in-avdio/', k: m.data.kind === 'video' ? 'Video' : 'Avdio', s: m.data.description, b: '' });
  }
  // Hand-built pages (contact, membership, ...) come from the navigation data.
  for (const section of nav) {
    for (const c of section.children) add({ t: c.label, u: c.href, k: section.label, s: c.description, b: '' });
  }

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
