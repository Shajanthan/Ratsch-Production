/**
 * In-memory cache for GET requests.
 * - First load or page refresh: cache is empty → fetch.
 * - Client-side navigation (Home → About → Home): cache is used → no refetch.
 */
const cache = new Map<string, Promise<unknown>>();

export async function getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = cache.get(key);
  if (existing !== undefined) {
    return existing as Promise<T>;
  }
  const promise = fetcher();
  cache.set(key, promise as Promise<unknown>);
  return promise;
}

/** Clear one key or the whole cache (e.g. after admin mutations or for testing). */
export function invalidateCache(key?: string): void {
  if (key === undefined) {
    cache.clear();
  } else {
    cache.delete(key);
  }
}
