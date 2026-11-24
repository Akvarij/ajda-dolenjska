import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { z } from 'astro/zod';

import { optional } from '../src/lib/optional-field.js';

const text = optional(z.string());
const day = optional(z.coerce.date());
const time = optional(z.string().regex(/^\d{1,2}:\d{2}$/));
const website = optional(z.string().url());

describe('optional', () => {
  const blanks = [
    ['text', text],
    ['date', day],
    ['time', time],
    ['url', website],
  ];

  for (const [name, schema] of blanks) {
    for (const blank of ['', null, undefined]) {
      it(`${name}, ${JSON.stringify(blank)} → undefined`, () => {
        assert.equal(schema.parse(blank), undefined);
      });
    }
  }

  it('a real time → kept', () => {
    assert.equal(time.parse('09:00'), '09:00');
  });

  it('a real date → a Date', () => {
    assert.deepEqual(day.parse('2026-05-01'), new Date('2026-05-01'));
  });

  it('a time with a dot ("9.00") → still refused', () => {
    assert.equal(time.safeParse('9.00').success, false);
  });

  it('a website without https:// → still refused', () => {
    assert.equal(website.safeParse('www.kmetija.si').success, false);
  });
});
