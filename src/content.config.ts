import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

import { optional } from './lib/optional-field.js';

const md = (dir: string) => glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${dir}` });

/** Local time as editors type it, "HH:MM": the CMS form uses the same pattern (`npm test`). */
const clockTime = z.string().regex(/^\d{1,2}:\d{2}$/);

/** Static content pages (biodinamika, o društvu, ...). The file path is the URL. */
const pages = defineCollection({
  loader: md('pages'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      lead: optional(z.string()),
      image: optional(image()),
      imageAlt: z.string().default(''),
      /** Photo behind the page title instead of the buckwheat field. */
      headerImage: optional(image()),
      /** Buttons under the page title, e.g. to the photo gallery or contacts. */
      links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      /** Which "what next?" suggestion to show at the end of the page. */
      nextStep: z.enum(['learn', 'join', 'none']).default('learn'),
      people: z
        .array(
          z.object({
            name: z.string(),
            role: z.string(),
            phone: optional(z.string()),
            email: optional(z.string()),
            bio: optional(z.string()),
          }),
        )
        .optional(),
    }),
});

/** Events, courses, workshops, trips and member meetings. */
const events = defineCollection({
  loader: md('events'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum(['dogodek', 'izobrazevanje', 'delavnica', 'izlet', 'srecanje']).default('dogodek'),
      /** First day (YYYY-MM-DD). */
      date: z.coerce.date(),
      /** Last day for multi-day events (YYYY-MM-DD). */
      endDate: optional(z.coerce.date()),
      time: optional(clockTime),
      endTime: optional(clockTime),
      location: z.string(),
      /** Full address used for the map and navigation link. */
      address: optional(z.string()),
      speaker: optional(z.string()),
      summary: z.string(),
      price: optional(z.string()),
      contact: z
        .object({
          name: optional(z.string()),
          phone: optional(z.string()),
          email: optional(z.string()),
        })
        .optional(),
      registration: z
        .object({
          required: z.boolean().default(false),
          deadline: optional(z.coerce.date()),
          note: optional(z.string()),
        })
        .default({ required: false }),
      image: optional(image()),
      imageAlt: z.string().default(''),
      draft: z.boolean().default(false),
    }),
});

/** News ("novica") and longer articles ("clanek"). */
const news = defineCollection({
  loader: md('news'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kind: z.enum(['novica', 'clanek']).default('novica'),
      date: z.coerce.date(),
      summary: z.string(),
      author: optional(z.string()),
      image: optional(image()),
      imageAlt: z.string().default(''),
      /** Link an article to a farm so it also shows on the farm's page. */
      relatedFarm: optional(reference('farms')),
      /** Force into the archive; posts older than a year go there automatically. */
      archived: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

/** Member farms. The Markdown body is the farm's own description. */
const farms = defineCollection({
  loader: md('farms'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      owner: optional(z.string()),
      summary: z.string(),
      order: z.number().default(100),
      street: z.string(),
      postal: z.string(),
      city: z.string(),
      phones: z.array(z.object({ number: z.string(), label: optional(z.string()) })).default([]),
      email: optional(z.string()),
      website: optional(z.string().url()),
      /** What visitors can buy, shown as chips. */
      offer: z.array(z.string()).default([]),
      services: z.array(z.string()).default([]),
      certifications: z.array(z.string()).default([]),
      image: optional(image()),
      imageAlt: z.string().default(''),
    }),
});

/** Photo albums. */
const albums = defineCollection({
  loader: md('albums'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: optional(z.string()),
      photos: z.array(z.object({ src: image(), alt: z.string() })).min(1),
    }),
});

/** Downloadable files. Put the file in /public/dokumenti/ and point `file` at it. */
const documents = defineCollection({
  loader: md('documents'),
  schema: z.object({
    title: z.string(),
    category: z.enum(['gradivo', 'predavanje', 'dokument']),
    date: z.coerce.date(),
    description: z.string(),
    speaker: optional(z.string()),
    /** Public path, e.g. /dokumenti/setveni-koledar.pdf */
    file: z.string(),
    /** Optional, e.g. "PDF · 1,2 MB" */
    fileInfo: optional(z.string()),
    /** Moves lectures/materials to the archive. */
    archived: z.boolean().default(false),
  }),
});

/** Video (YouTube/Vimeo link) and audio (direct file URL) recordings. */
const media = defineCollection({
  loader: md('media'),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['video', 'avdio']),
    date: z.coerce.date(),
    description: z.string(),
    url: z.string().url(),
    duration: optional(z.string()),
  }),
});

export const collections = { pages, events, news, farms, albums, documents, media };
