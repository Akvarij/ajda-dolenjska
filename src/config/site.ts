/**
 * Central place for facts about the society. Everything the header, footer,
 * contact page and forms need to know lives here, so editing one value updates
 * the whole site.
 */
export const site = {
  name: 'Ajda Dolenjska',
  legalName: 'Društvo Ajda Dolenjska',
  tagline: 'Društvo za biološko-dinamično gospodarjenje',
  description:
    'Društvo Ajda Dolenjska od leta 2005 povezuje vrtičkarje in kmete, ki pridelujejo hrano po biodinamični metodi: izobraževanja, preparati, dogodki in člani kmetije.',
  url: 'https://www.ajda-dolenjska.si',
  founded: 2005,

  address: {
    street: 'Gorenja vas pri Šmarjeti 7',
    postal: '8220',
    city: 'Šmarješke Toplice',
  },
  taxId: 'SI79287379',

  /** Main contact person (shown on Kontakt, footer, forms). */
  contact: {
    person: 'Jože Gregorčič',
    phone: '040 458 598',
    email: 'joze.jojo@gmail.com',
  },
  /** Contact for beginner courses and the planting calendar. */
  courseContact: {
    phone: '031 645 476',
    email: 'joze.lusavec@gmail.com',
  },

  /**
   * Social profiles. Empty strings are simply not rendered, so add the URLs
   * once the accounts are decided.
   */
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
  },

  forms: {
    /** Contact, membership and event registration. Empty = mailto: fallback. */
    endpoint: (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined) ?? '',
    /** E-novice sign-up. Empty = mailto: fallback. */
    newsletterEndpoint: (import.meta.env.PUBLIC_NEWSLETTER_ENDPOINT as string | undefined) ?? '',
    /** Where mailto: fallbacks are sent. */
    fallbackEmail: 'joze.jojo@gmail.com',
  },

  /** Optional Google My Maps embed with all farms. */
  farmsMapEmbed: (import.meta.env.PUBLIC_FARMS_MAP_EMBED as string | undefined) ?? '',
} as const;

export const fullAddress = `${site.address.street}, ${site.address.postal} ${site.address.city}`;

export const telHref = (phone: string) => `tel:+386${phone.replace(/\s/g, '').replace(/^0/, '')}`;
