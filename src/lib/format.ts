/**
 * Content dates are plain calendar dates ("2026-11-14") that parse to UTC
 * midnight, so they are always formatted in UTC. Only "today" needs the
 * Slovenian time zone.
 */
const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('sl-SI', { timeZone: 'UTC', ...opts });

const long = fmt({ day: 'numeric', month: 'long', year: 'numeric' });
const longNoYear = fmt({ day: 'numeric', month: 'long' });
const weekday = fmt({ weekday: 'long' });
const monthShort = fmt({ month: 'short' });
const dayNum = fmt({ day: 'numeric' });

export const formatDate = (d: Date) => long.format(d);
export const formatWeekday = (d: Date) => weekday.format(d);
export const formatMonthShort = (d: Date) => monthShort.format(d).replace('.', '');
export const formatDay = (d: Date) => dayNum.format(d);

/** "14. november 2026" or "14.–16. november 2026" for ranges. */
export function formatRange(start: Date, end?: Date) {
  if (!end || end.getTime() === start.getTime()) return long.format(start);
  const sameMonth =
    start.getUTCMonth() === end.getUTCMonth() && start.getUTCFullYear() === end.getUTCFullYear();
  if (sameMonth) return `${start.getUTCDate()}.–${long.format(end)}`;
  const sameYear = start.getUTCFullYear() === end.getUTCFullYear();
  return `${sameYear ? longNoYear.format(start) : long.format(start)} – ${long.format(end)}`;
}

export const dateKey = (d: Date) => d.toISOString().slice(0, 10);

/** Today's calendar date in Slovenia, as YYYY-MM-DD. */
export const todayKey = () =>
  new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Ljubljana' }).format(new Date());
