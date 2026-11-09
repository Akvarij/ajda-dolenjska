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
        label: 'O biodinamiki',
        href: '/biodinamika/o-biodinamiki/',
        icon: 'sprout',
        description: 'Kaj je biodinamika, od kod izvira in za kaj si biodinamiki prizadevamo.',
      },
      {
        label: 'Pomembne osebnosti',
        href: '/biodinamika/pomembne-osebnosti/',
        icon: 'users',
        description: 'Rudolf Steiner, Marija Thun in Meta Vrhunc ter Setveni priročnik Marije Thun.',
      },
      {
        label: 'Preparati',
        href: '/biodinamika/preparati/',
        icon: 'jar',
        description: 'Preparata za škropljenje, kompostni preparati in preparata Marije Thun.',
      },
      {
        label: 'Kompost',
        href: '/biodinamika/kompost/',
        icon: 'leaf',
        description: 'Priprava kompostnega kupa in prepariranje z biodinamičnimi preparati.',
      },
      {
        label: 'Ali lahko nahrani svet?',
        href: '/biodinamika/ali-lahko-nahrani-svet/',
        icon: 'basket',
        description: 'Kaj kaže 45-letni poskus DOK, ki primerja ekološko, biodinamično in konvencionalno kmetovanje.',
      },
      {
        label: 'Demeter',
        href: '/biodinamika/demeter/',
        icon: 'check',
        description: 'Mednarodna blagovna znamka in certifikat za biodinamične pridelke in izdelke.',
      },
      {
        label: 'Literatura in povezave',
        href: '/biodinamika/literatura/',
        icon: 'book',
        description: 'Knjige o biodinamiki s cenami in priporočene spletne strani.',
      },
    ],
  },
  {
    key: 'drustvo',
    label: 'O društvu',
    href: '/drustvo/',
    icon: 'users',
    description: 'Kdo smo, kako delujemo in kako se nam lahko pridružite.',
    children: [
      {
        label: 'Podatki o društvu',
        href: '/drustvo/o-drustvu/',
        icon: 'info',
        description: 'Kje delujemo, kdo smo in osnovni podatki o društvu.',
      },
      {
        label: 'Namen, cilji in dejavnosti',
        href: '/drustvo/namen-in-cilji/',
        icon: 'leaf',
        description: 'Čemu je društvo namenjeno, kaj želi doseči in s čim se ukvarja.',
      },
      {
        label: 'Vodstvo in organizacija',
        href: '/drustvo/vodstvo/',
        icon: 'users',
        description: 'Predsednik, podpredsednika, upravni in nadzorni odbor.',
      },
      {
        label: 'Statut društva',
        href: '/drustvo/statut/',
        icon: 'file',
        description: 'Temeljni akt društva za prenos.',
      },
      {
        label: 'Zgodovina društva',
        href: '/drustvo/zgodovina/',
        icon: 'clock',
        description: 'Prehojena pot društva od ustanovitve leta 2005 do danes.',
      },
      {
        label: 'Pomembne osebnosti društva',
        href: '/drustvo/pomembne-osebnosti/',
        icon: 'user',
        description: 'Člani, ki so pomembno prispevali k delu društva.',
      },
      {
        label: 'Povezanost z Zvezo biodinamikov',
        href: '/drustvo/zveza-biodinamikov/',
        icon: 'institution',
        description: 'Poslanstvo in cilji Zveze biodinamikov Slovenije.',
      },
      {
        label: 'Izobraževanje in dogodki',
        href: '/drustvo/izobrazevanje/',
        icon: 'graduation',
        description: 'Osnovni tečaj biodinamike, predavanja, prikazi dobrih praks in ekskurzije.',
      },
      {
        label: 'Kako postati član',
        href: '/drustvo/vclanitev/',
        icon: 'heart',
        description: 'Članstvo, članarina in pristopnica v društvo.',
      },
      {
        label: 'Iz življenja društva – fotogalerija',
        href: '/aktualno/fotografije/',
        icon: 'image',
        description: 'Galerije z dogodkov, delavnic, izletov in kmetij.',
      },
      {
        label: 'Članki',
        href: '/aktualno/clanki/',
        icon: 'book',
        description: 'Daljši prispevki o biodinamiki, vrtu in kmetovanju.',
      },
      {
        label: 'Donacije in dohodnina',
        href: '/drustvo/donacije/',
        icon: 'sprout',
        description: 'Kako lahko delu društva namenite do 1 % dohodnine.',
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
    description: 'Gradiva, predavanja, starejše objave in dokumenti društva.',
    children: [
      {
        label: 'Gradiva in predavanja',
        href: '/arhiv/gradiva/',
        icon: 'book',
        description: 'Priročniki, zapiski in predavanja za samostojno učenje.',
      },
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

/**
 * Find a nav item (or section) by its URL for breadcrumbs. A page belongs to the section its URL
 * sits in, even when another section's menu also links to it (Fotografije and Članki).
 */
export function findNav(path: string): { section?: NavSection; item?: NavItem } {
  const section = sectionForPath(path);
  return { section, item: section?.children.find((c) => c.href === path) };
}

/** Next item in a section, used for the "next step" suggestion on content pages. */
export function nextInSection(path: string): NavItem | undefined {
  const children = sectionForPath(path)?.children ?? [];
  const i = children.findIndex((c) => c.href === path);
  return i >= 0 ? children[i + 1] : undefined;
}
