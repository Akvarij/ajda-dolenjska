import type { ImageMetadata } from 'astro';

// Every photo under src/assets/photos/ (the knjiznica/ folder is where new ones go).
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
});
const LIBRARY = Object.keys(files)
  .sort()
  .map((path) => files[path].default);

const hashOf = (seed: string | number) =>
  [...String(seed)].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);

/**
 * A library photo for content without its own (news, farms, media). The same seed always gets
 * the same photo, so a post keeps its picture between builds.
 */
export const libraryPhotoFor = (seed: string | number): ImageMetadata =>
  LIBRARY[Math.abs(hashOf(seed)) % LIBRARY.length];
