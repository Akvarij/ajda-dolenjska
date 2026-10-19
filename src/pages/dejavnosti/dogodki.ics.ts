import type { APIRoute } from 'astro';
import { getEvents } from '@/lib/events';
import { buildIcs } from '@/lib/ics';

export const GET: APIRoute = async ({ site }) => {
  const events = await getEvents();
  return new Response(buildIcs(events, site?.href ?? 'https://www.ajda-dolenjska.si'), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
