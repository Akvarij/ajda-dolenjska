import { getCollection, type CollectionEntry } from 'astro:content';

export type PostEntry = CollectionEntry<'news'>;

/** Posts older than this move to /arhiv/ automatically. */
export const ARCHIVE_AFTER_DAYS = 365;

export const isArchived = (p: PostEntry) =>
  p.data.archived || (Date.now() - p.data.date.getTime()) / 86_400_000 > ARCHIVE_AFTER_DAYS;

export const postUrl = (p: PostEntry) =>
  `/aktualno/${p.data.kind === 'clanek' ? 'clanki' : 'novice'}/${p.id}/`;

export const kindLabel = (p: PostEntry) => (p.data.kind === 'clanek' ? 'Članek' : 'Novica');

export async function getPosts(kind?: PostEntry['data']['kind']) {
  const all = await getCollection('news', ({ data }) => !data.draft && (!kind || data.kind === kind));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPostsSplit(kind?: PostEntry['data']['kind']) {
  const all = await getPosts(kind);
  return { current: all.filter((p) => !isArchived(p)), archived: all.filter(isArchived) };
}
