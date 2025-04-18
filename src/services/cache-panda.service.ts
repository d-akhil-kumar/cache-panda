import { Injectable, Inject, Logger, Optional } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class CachePandaService {
  private readonly logger = new Logger(CachePandaService.name);

  constructor(
    @Optional() @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {
    if (!cacheManager) {
      throw new Error(
        "[cache-panda] CACHE_MANAGER is not provided. Please ensure CachePandaModule is registered correctly."
      );
    }
  }

  async getCache<T = any>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async setCache(key: string, value: string, ttl?: number): Promise<void> {
    const effectiveTtl = ttl ?? this.getDefaultTtl();
    return await this.cacheManager.set(key, value, effectiveTtl);
  }

  async deleteCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.reset();
  }

  async deleteCacheByKeys(keys: string[]): Promise<void> {
    for (const key of keys) {
      await this.cacheManager.del(key);
      this.logger.log(`Deleted cache key: ${key}`);
    }
  }

  async getKeysByKeyPattern(pattern: string): Promise<string[]> {
    const store: any = this.cacheManager.store;
    if (typeof store.keys !== "function") {
      throw new Error(
        "[cache-panda] Cache store does not support key scanning"
      );
    }
    const keys = await store.keys();
    return keys.filter((key: string) => key.includes(pattern));
  }

  async deleteCacheByKeyPattern(pattern: string): Promise<void> {
    const keys = await this.getKeysByKeyPattern(pattern);
    await Promise.all(keys.map((key) => this.deleteCache(key)));
  }

  private getDefaultTtl(): number {
    // @ts-ignore: Access to internal property (works with memory store, redis etc.)
    return this.cacheManager?.options?.ttl ?? 0;
  }
}
