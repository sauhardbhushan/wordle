import { DEFAULT_WORD } from './constants';

// Named routes: domain.com/<slug> plays the mapped word.
export const PUZZLES: Record<string, string> = {
  abc: 'ALICE',
  xyz: 'CRANE',
};

const WORD_PATTERN = /^[A-Z]{3,8}$/;

// Light obfuscation so the word isn't readable in the link. Not secure.
export function encodeWord(word: string): string {
  const reversed = word.toUpperCase().split('').reverse().join('');
  return btoa(reversed).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeWord(code: string): string | null {
  try {
    const base64 = code.replace(/-/g, '+').replace(/_/g, '/');
    const word = atob(base64).split('').reverse().join('').toUpperCase();
    return WORD_PATTERN.test(word) ? word : null;
  } catch {
    return null;
  }
}

export function isValidWord(word: string): boolean {
  return WORD_PATTERN.test(word.toUpperCase());
}

export type Route =
  | { kind: 'play'; word: string }
  | { kind: 'create' }
  | { kind: 'notFound' };

export function resolveRoute(pathname: string): Route {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return { kind: 'play', word: DEFAULT_WORD };

  if (segments.length === 1) {
    if (segments[0] === 'new') return { kind: 'create' };
    const word = PUZZLES[segments[0].toLowerCase()];
    return word ? { kind: 'play', word } : { kind: 'notFound' };
  }

  if (segments.length === 2 && segments[0] === 'w') {
    const word = decodeWord(segments[1]);
    return word ? { kind: 'play', word } : { kind: 'notFound' };
  }

  return { kind: 'notFound' };
}
