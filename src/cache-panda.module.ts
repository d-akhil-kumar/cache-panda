import { DynamicModule, Global, Module } from "@nestjs/common";
import { CacheModule, CacheModuleOptions } from "@nestjs/cache-manager";
import { CachePandaService } from "./services/cache-panda.service";

@Global()
@Module({})
export class CachePanda {
  static register(options: CacheModuleOptions): DynamicModule {
    const cacheModule = CacheModule.register({
      ...options,
    });

    return {
      module: CachePanda,
      imports: [cacheModule],
      providers: [CachePandaService],
      exports: [CachePandaService],
    };
  }
}
