import { CACHE_KEY_HASH_SEED } from "../constants/cache.constants";
import * as XXH from "xxhashjs";
import { reduceArgsArrayToString } from "../utils/reduce-args.util";
import { CacheOptions } from "../interfaces/cache-options.interface";
import { CachePandaService } from "../services/cache-panda.service";

export function CachePandaSet(cacheOptions: CacheOptions) {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): void => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      const {
        ttl,
        prefix,
        name,
        argsIndex,
        executionTimeLimit = 0,
      } = cacheOptions;

      const self = this as { cachePandaService?: CachePandaService };
      const cachePandaService = self.cachePandaService;

      if (
        !cachePandaService ||
        typeof cachePandaService.getCache !== "function" ||
        typeof cachePandaService.setCache !== "function"
      ) {
        throw new Error(
          "[cache-panda] Missing or invalid cachePandaService. Please ensure CachePanda.register() was used and CachePandaService is injected."
        );
      }

      const argsKey = reduceArgsArrayToString(args, argsIndex, "_");
      const hash = XXH.h32(
        JSON.stringify({ method: propertyKey, args }),
        CACHE_KEY_HASH_SEED
      ).toString();

      const cacheKey = `${prefix}${argsKey}:${name}:${hash}`;

      const cachedResult = await cachePandaService.getCache(cacheKey);
      if (cachedResult) return JSON.parse(cachedResult as string);

      const startTime = performance.now();
      const result = await originalMethod.apply(this, args);
      const execTime = performance.now() - startTime;

      if (execTime >= executionTimeLimit) {
        await cachePandaService.setCache(cacheKey, JSON.stringify(result), ttl);
      }

      return result;
    };
  };
}
