import { z } from 'astro/zod';

/**
 * An optional field that also takes `""` or `null` as "not filled in": the CMS saves a field an
 * editor typed in and then cleared that way, which would otherwise fail dates, times, images and
 * URLs and slip past the `??` fallbacks in templates. Plain JS so `node --test` can load it.
 *
 * @template {z.ZodTypeAny} T
 * @param {T} schema
 */
export const optional = (schema) =>
  z.preprocess((value) => (value === '' || value === null ? undefined : value), schema.optional());
