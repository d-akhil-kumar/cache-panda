import { DynamicModule, Global, Module } from "@nestjs/common";
import {
  CacheModule,
  CacheModuleAsyncOptions,
  CacheModuleOptions,
} from "@nestjs/cache-manager";
import { CachePandaService } from "./services/cache-panda.service";

@Global()
@Module({})
export class CachePanda {
  private static createCachePandaModule(
    imports: DynamicModule["imports"]
  ): DynamicModule {
    return {
      module: CachePanda,
      imports,
      providers: [CachePandaService],
      exports: [CachePandaService],
    };
  }

  static register(options: CacheModuleOptions): DynamicModule {
    const imports = [CacheModule.register(options)];
    return this.createCachePandaModule(imports);
  }

  static registerAsync(options: CacheModuleAsyncOptions): DynamicModule {
    const imports = [CacheModule.registerAsync(options)];
    return this.createCachePandaModule(imports);
  }
}
