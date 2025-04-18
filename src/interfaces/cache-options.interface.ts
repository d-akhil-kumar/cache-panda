export interface CacheOptions {
  /**
   * Prefix for the cache key (e.g., 'user:', 'post:').
   */
  prefix: string;

  /**
   * Logical name to identify the method being cached.
   */
  name?: string;

  /**
   * Optional time-to-live in ms for the cache entry.
   */
  ttl?: number;

  /**
   * Indexes of the method arguments to include in the cache key.
   */
  argsIndex?: number[];

  /**
   * Cache only if method execution takes longer than this (in ms).
   * Defaults to 0 (cache everything).
   */
  executionTimeLimit?: number;
}
