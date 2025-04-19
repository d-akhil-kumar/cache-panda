import { Injectable, Inject, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

@Injectable()
export class CachePandaService {
  private readonly logger = new Logger(CachePandaService.name);
  private static instance: CachePandaService;

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    CachePandaService.instance = this;
  }

  static getInstance(): CachePandaService {
    if (!CachePandaService.instance) {
      throw new Error(
        "[cache-panda] CachePandaService not initialized. Ensure CachePanda.register() is added to your module."
      );
    }
    return CachePandaService.instance;
  }

  async getCache<T = any>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async setCache(key: string, value: string, ttl?: number): Promise<void> {
    if (!ttl) return await this.cacheManager.set(key, value);
    return await this.cacheManager.set(key, value, ttl);
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
}
