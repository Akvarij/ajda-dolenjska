/** Works out how to play a media URL without loading anything third-party up front. */
export type Playable =
  | { kind: 'iframe'; src: string; provider: 'YouTube' | 'Vimeo' }
  | { kind: 'audio'; src: string }
  | { kind: 'link'; src: string };

export function toPlayable(url: string): Playable {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      return { kind: 'iframe', provider: 'YouTube', src: `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0` };
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = u.searchParams.get('v') ?? u.pathname.split('/').pop();
      if (id) return { kind: 'iframe', provider: 'YouTube', src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` };
    }
    if (host === 'vimeo.com') {
      return { kind: 'iframe', provider: 'Vimeo', src: `https://player.vimeo.com/video/${u.pathname.split('/').filter(Boolean)[0]}?autoplay=1` };
    }
    if (/\.(mp3|ogg|oga|wav|m4a)$/i.test(u.pathname)) return { kind: 'audio', src: url };
  } catch {
    /* fall through */
  }
  return { kind: 'link', src: url };
}
