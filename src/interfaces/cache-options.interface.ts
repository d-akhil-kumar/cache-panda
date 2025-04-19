export interface CacheOptions {
  /**
   * A string prefix to help group related cache keys.
   * For example: 'user', 'product', etc.
   * This appears at the beginning of your cache key.
   */
  prefix?: string;

  /**
   * An optional name to identify this specific method being cached.
   * Helps distinguish between different methods using similar arguments.
   * Will be used as part of the cache key.
   */
  name?: string;

  /**
   * Time-to-live (TTL) in milliseconds for how long the cache should be valid.
   * If not provided, it will use the global TTL passed in `CachePanda.register()`.
   */
  ttl?: number;

  /**
   * Specific argument indexes to include in the cache key.
   * Example: [0, 2] will use the first and third arguments.
   * If not provided, all method arguments are used.
   */
  argsIndex?: number[];

  /**
   * Minimum execution time (in milliseconds) for a method before its result is cached.
   * Useful for skipping caching of fast methods. Defaults to 0 (cache everything).
   */
  executionTimeLimit?: number;
}
