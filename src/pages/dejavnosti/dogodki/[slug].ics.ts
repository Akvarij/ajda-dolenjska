import type { APIRoute, GetStaticPaths } from 'astro';
import { getEvents, type EventEntry } from '@/lib/events';
import { buildIcs } from '@/lib/ics';

export const getStaticPaths = (async () => {
  const events = await getEvents();
  return events.map((event) => ({ params: { slug: event.id }, props: { event } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const { event } = props as { event: EventEntry };
  return new Response(buildIcs([event], site?.href ?? 'https://www.ajda-dolenjska.si'), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
