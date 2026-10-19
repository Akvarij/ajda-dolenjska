import type { IconName } from '@/lib/icons';

export interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: IconName;
}

export interface NavSection {
  key: string;
  label: string;
  href: string;
  /** Intro shown on the section landing page. */
  description: string;
  icon: IconName;
  children: NavItem[];
}

/**
 * The single source of truth for the site structure. The header, mobile menu,
 * footer, section landing pages and breadcrumbs are all generated from this.
 * Order follows the agreed sitemap.
 */
export const nav: NavSection[] = [
  {
    key: 'biodinamika',
    label: 'Biodinamika',
    href: '/biodinamika/',
    icon: 'sprout',
    description:
      'Začnite tukaj. Kratek, razumljiv uvod v biodinamiko za vse, ki se z njo srečujete prvič, in poti za tiste, ki želijo izvedeti več.',
    children: [
      {
        label: 'Kaj je biodinamika?',
        href: '/biodinamika/kaj-je-biodinamika/',
        icon: 'sprout',
        description: 'Osnove biodinamičnega kmetovanja in vrtnarjenja v nekaj minutah branja.',
      },
      {
        label: 'Biodinamični pristop',
        href: '/biodinamika/biodinamicni-pristop/',
        icon: 'leaf',
        description: 'Kmetija kot celota: tla, rastline, živali, kompost in ritmi narave.',
      },
      {
        label: 'Preparati',
        href: '/biodinamika/preparati/',
        icon: 'jar',
        description: 'Kaj so biodinamični preparati, iz česa nastanejo in kako jih uporabljamo.',
      },
      {
        label: 'Gradiva in predavanja',
        href: '/biodinamika/gradiva/',
        icon: 'book',
        description: 'Priročniki, zapiski in posnetki predavanj za samostojno učenje.',
      },
      {
        label: 'Setveni koledar',
        href: '/biodinamika/setveni-koledar/',
        icon: 'calendar',
        description: 'Kdaj sejati, presajati, negovati in pobirati, po ritmih lune in ozvezdij.',
      },
    ],
  },
  {
    key: 'drustvo',
    label: 'Društvo Ajda',
    href: '/drustvo/',
    icon: 'users',
    description: 'Kdo smo, kdo vodi društvo in kako se nam lahko pridružite ali nas kontaktirate.',
    children: [
      {
        label: 'O društvu',
        href: '/drustvo/o-drustvu/',
        icon: 'info',
        description: 'Zgodba in poslanstvo društva, ki deluje od leta 2005.',
      },
      {
        label: 'Vodstvo',
        href: '/drustvo/vodstvo/',
        icon: 'user',
        description: 'Ljudje, ki vodijo društvo in skrbijo za dejavnosti.',
      },
      {
        label: 'Kontakt',
        href: '/drustvo/kontakt/',
        icon: 'mail',
        description: 'Naslov, telefon, e-pošta in kontaktni obrazec.',
      },
      {
        label: 'Včlanitev',
        href: '/drustvo/vclanitev/',
        icon: 'heart',
        description: 'Postanite član in se nam pridružite pri učenju in pridelavi.',
      },
      {
        label: 'E-novice',
        href: '/drustvo/e-novice/',
        icon: 'newspaper',
        description: 'Obvestila o dogodkih in novostih neposredno v vaš e-predal.',
      },
    ],
  },
  {
    key: 'dejavnosti',
    label: 'Dejavnosti',
    href: '/dejavnosti/',
    icon: 'calendar',
    description: 'Dogodki, tečaji, delavnice, izleti in srečanja ter sodelovanje z ustanovami.',
    children: [
      {
        label: 'Dogodki',
        href: '/dejavnosti/dogodki/',
        icon: 'calendar',
        description: 'Koledar vseh prihajajočih dogodkov s prijavo.',
      },
      {
        label: 'Izobraževanja in delavnice',
        href: '/dejavnosti/izobrazevanja-in-delavnice/',
        icon: 'graduation',
        description: 'Tečaji, predavanja in delavnice za začetnike in izkušene.',
      },
      {
        label: 'Izleti in srečanja',
        href: '/dejavnosti/izleti-in-srecanja/',
        icon: 'mountain',
        description: 'Obiski kmetij, izleti in druženja članov.',
      },
      {
        label: 'Kaj ponujamo',
        href: '/dejavnosti/kaj-ponujamo/',
        icon: 'basket',
        description: 'Preparati, pridelki in izdelki naših kmetij ter svetovanje.',
      },
      {
        label: 'Sodelovanje z ustanovami',
        href: '/dejavnosti/sodelovanje-z-ustanovami/',
        icon: 'institution',
        description: 'Šole, vrtci, občine in organizacije: dobre prakse in ideje za skupne projekte.',
      },
    ],
  },
  {
    key: 'kmetije',
    label: 'Kmetije',
    href: '/kmetije/',
    icon: 'farm',
    description: 'Biodinamične in ekološke kmetije članice društva: kje so, kaj pridelujejo in kako jih kontaktirati.',
    children: [
      {
        label: 'Predstavitev kmetij',
        href: '/kmetije/',
        icon: 'farm',
        description: 'Vsaka kmetija s ponudbo, lokacijo in kontakti.',
      },
      {
        label: 'Zemljevid kmetij',
        href: '/kmetije/zemljevid/',
        icon: 'pin',
        description: 'Poiščite najbližjo kmetijo in zaženite navigacijo.',
      },
    ],
  },
  {
    key: 'aktualno',
    label: 'Aktualno',
    href: '/aktualno/',
    icon: 'newspaper',
    description: 'Novice, članki, fotografije ter video in avdio vsebine društva.',
    children: [
      {
        label: 'Novice',
        href: '/aktualno/novice/',
        icon: 'newspaper',
        description: 'Kaj se dogaja v društvu in na kmetijah.',
      },
      {
        label: 'Članki',
        href: '/aktualno/clanki/',
        icon: 'book',
        description: 'Daljši prispevki o biodinamiki, vrtu in kmetovanju.',
      },
      {
        label: 'Fotografije',
        href: '/aktualno/fotografije/',
        icon: 'image',
        description: 'Galerije z dogodkov, delavnic in kmetij.',
      },
      {
        label: 'Video in avdio',
        href: '/aktualno/video-in-avdio/',
        icon: 'play',
        description: 'Posnetki predavanj, delavnic in pogovorov.',
      },
    ],
  },
  {
    key: 'arhiv',
    label: 'Arhiv',
    href: '/arhiv/',
    icon: 'archive',
    description: 'Starejše objave, predavanja in dokumenti društva.',
    children: [
      {
        label: 'Arhiv objav',
        href: '/arhiv/objave/',
        icon: 'archive',
        description: 'Starejše novice in članki.',
      },
      {
        label: 'Starejša predavanja',
        href: '/arhiv/predavanja/',
        icon: 'headphones',
        description: 'Predavanja iz preteklih let.',
      },
      {
        label: 'Dokumenti',
        href: '/arhiv/dokumenti/',
        icon: 'file',
        description: 'Statut, poročila in drugi uradni dokumenti.',
      },
    ],
  },
];

/** Links shown in the slim bar above the header and repeated in the footer. */
export const utilityLinks = [
  { label: 'Za člane', href: '/clani/' },
  { label: 'Kontakt', href: '/drustvo/kontakt/' },
  { label: 'E-novice', href: '/drustvo/e-novice/' },
];

export const joinHref = '/drustvo/vclanitev/';
export const newsletterHref = '/drustvo/e-novice/';
export const contactHref = '/drustvo/kontakt/';

export const sectionForPath = (path: string) =>
  nav.find((s) => path === s.href || path.startsWith(s.href));

/** Find a nav item (or section) by its URL for breadcrumbs. */
export function findNav(path: string): { section?: NavSection; item?: NavItem } {
  for (const section of nav) {
    const item = section.children.find((c) => c.href === path);
    if (item) return { section, item };
    if (section.href === path) return { section };
  }
  return {};
}

/** Next item in a section, used for the "next step" suggestion on content pages. */
export function nextInSection(path: string): NavItem | undefined {
  for (const section of nav) {
    const i = section.children.findIndex((c) => c.href === path);
    if (i >= 0) return section.children[i + 1];
  }
  return undefined;
}
