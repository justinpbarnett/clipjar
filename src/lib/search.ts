import fuzzysort from 'fuzzysort';
import type { ClipEntry } from './types';

interface SearchableClip {
  id: string;
  prepared: Fuzzysort.Prepared | null;
  entry: ClipEntry;
}

let searchIndex: SearchableClip[] | null = null;

export function buildIndex(clips: ClipEntry[]): void {
  searchIndex = clips.map((c) => ({
    id: c.id,
    prepared: fuzzysort.prepare(c.content.slice(0, 500)),
    entry: c,
  }));
}

export function invalidateIndex(): void {
  searchIndex = null;
}

export function searchClips(
  query: string,
  clips: ClipEntry[],
  limit = 50,
): ClipEntry[] {
  if (!query.trim()) return clips.slice(0, limit);

  if (!searchIndex || searchIndex.length !== clips.length) {
    buildIndex(clips);
  }

  const results = fuzzysort.go(query, searchIndex!, {
    key: 'prepared',
    limit,
    threshold: -1000,
  });

  return results.map((r) => r.obj.entry);
}

