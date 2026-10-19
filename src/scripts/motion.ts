/**
 * Small, dependency-free motion layer:
 * - fades sections in as they scroll into view,
 * - marks the header once the page has scrolled (it turns more solid),
 * - shows the back-to-top button further down the page.
 * Nothing is hidden unless this script runs, and nothing animates when the
 * visitor asked the system for reduced motion.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- scroll reveal ---------- */

const REVEAL = [
  '[data-reveal]',
  '.section-head',
  '.grid > *',
  '.duo > *',
  '.stats > li',
  '.steps > *',
  '.panel',
  '.empty',
  '.join__text',
].join(',');

if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );

  const fold = window.innerHeight;
  const seen = new Set<Element>();
  for (const el of document.querySelectorAll<HTMLElement>(REVEAL)) {
    // Never hide what is already on screen, and never nest two reveals.
    if (seen.has(el) || el.parentElement?.closest('.reveal')) continue;
    if (el.getBoundingClientRect().top < fold) continue;
    seen.add(el);
    // Siblings in a grid come in one after another.
    const index = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 90}ms`);
    el.classList.add('reveal');
    io.observe(el);
  }
}

/* ---------- header state + back to top ---------- */

const header = document.querySelector('.site-header');
const toTop = document.querySelector('.to-top');
let ticking = false;
const update = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  toTop?.classList.toggle('is-visible', y > window.innerHeight * 0.9);
  ticking = false;
};
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  },
  { passive: true },
);
update();
