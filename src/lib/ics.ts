import { dateKey } from './format';
import { eventUrl, type EventEntry } from './events';

const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** RFC 5545 asks for lines of at most 75 octets. */
function fold(line: string) {
  const out: string[] = [];
  let rest = line;
  while (new TextEncoder().encode(rest).length > 74) {
    let cut = 74;
    while (new TextEncoder().encode(rest.slice(0, cut)).length > 74) cut--;
    out.push(rest.slice(0, cut));
    rest = ' ' + rest.slice(cut);
  }
  out.push(rest);
  return out.join('\r\n');
}

const compact = (key: string) => key.replace(/-/g, '');
const clock = (t: string) => t.replace(':', '').padStart(4, '0') + '00';

function nextDay(d: Date) {
  return dateKey(new Date(d.getTime() + 86_400_000));
}

export function buildIcs(events: EventEntry[], siteUrl: string) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ajda Dolenjska//Dogodki//SL',
    'CALSCALE:GREGORIAN',
    'X-WR-CALNAME:Ajda Dolenjska – dogodki',
  ];
  for (const e of events) {
    const d = e.data;
    const startKey = dateKey(d.date);
    const endDay = d.endDate ?? d.date;
    lines.push('BEGIN:VEVENT', `UID:${e.id}@ajda-dolenjska.si`, `DTSTAMP:${stamp}`);
    if (d.time) {
      // Floating local time: shows at the same wall-clock time for anyone in Slovenia.
      lines.push(`DTSTART:${compact(startKey)}T${clock(d.time)}`);
      const endTime = d.endTime ?? d.time;
      lines.push(`DTEND:${compact(dateKey(endDay))}T${clock(endTime)}`);
    } else {
      lines.push(`DTSTART;VALUE=DATE:${compact(startKey)}`, `DTEND;VALUE=DATE:${compact(nextDay(endDay))}`);
    }
    lines.push(`SUMMARY:${esc(d.title)}`);
    lines.push(`LOCATION:${esc(d.address ? `${d.location}, ${d.address}` : d.location)}`);
    lines.push(`DESCRIPTION:${esc(d.summary)}`);
    lines.push(`URL:${new URL(eventUrl(e), siteUrl).href}`, 'END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(fold).join('\r\n') + '\r\n';
}
