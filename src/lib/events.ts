import { getCollection, type CollectionEntry } from 'astro:content';
import { dateKey, formatRange, todayKey } from './format';
import { url } from './url';

export type EventEntry = CollectionEntry<'events'>;
export type EventType = EventEntry['data']['type'];

export const typeLabels: Record<EventType, string> = {
  dogodek: 'Dogodek',
  izobrazevanje: 'Izobraževanje',
  delavnica: 'Delavnica',
  izlet: 'Izlet',
  srecanje: 'Srečanje',
};

export const trainingTypes: EventType[] = ['izobrazevanje', 'delavnica'];
export const tripTypes: EventType[] = ['izlet', 'srecanje'];

export const eventUrl = (e: EventEntry) => url(`/dejavnosti/dogodki/${e.id}/`);

export const endKey = (e: EventEntry) => dateKey(e.data.endDate ?? e.data.date);

export const isPast = (e: EventEntry) => endKey(e) < todayKey();

/** All published events, soonest first. */
export async function getEvents(types?: EventType[]) {
  const all = await getCollection('events', ({ data }) => !data.draft && (!types || types.includes(data.type)));
  return all.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

/** Upcoming (soonest first) and past (most recent first). */
export async function getEventsSplit(types?: EventType[]) {
  const all = await getEvents(types);
  return {
    upcoming: all.filter((e) => !isPast(e)),
    past: all.filter(isPast).reverse(),
  };
}

export function timeRange(e: EventEntry) {
  const { time, endTime } = e.data;
  if (!time) return '';
  return endTime ? `${time}–${endTime}` : `ob ${time}`;
}

export const whenLabel = (e: EventEntry) => {
  const range = formatRange(e.data.date, e.data.endDate);
  const t = timeRange(e);
  return t ? `${range}, ${t}` : range;
};

export const mapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const mapsDirectionsUrl = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
export const mapsEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
