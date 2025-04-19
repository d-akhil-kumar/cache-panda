# cache-panda

A smart, flexible cache module for **NestJS** 🐼 that wraps `@nestjs/cache-manager` and introduces a flexible ` @CachePandaSet` decorator for conditional, granular, and performance-aware caching.



---


## 🚀 Features

- ✅ **Drop-in replacement** for `@nestjs/cache-manager`
- 🧠 Decorator-based `@CachePandaSet()` for elegant method-level caching
- ⏱️ **Conditional caching** based on method execution time
- 🔑 Custom cache key building with prefixes and argument targeting
- 🧩 Plugs into Redis, memory store, or any cache-manager compatible store
- 🛠️ Easy to use, fully typed, developer-friendly


---


## 📦 Installation

```bash
npm install cache-panda
```


Also install peer dependencies (if not already):
```bash
npm install @nestjs/cache-manager cache-manager
```


---

## 🔧 Setup

### Register the module in your NestJS app:

```ts
// app.module.ts

import { CachePanda } from 'cache-panda';

@Module({
  imports: [
    CachePanda.register({
      ttl: 60000,        // Default TTL in ms
      isGlobal: true,    // Optional: make available globally
      max: 1000,         // Optional max number of keys
    }),
  ],
})
export class AppModule {}
```

---

## 🧠 Usage

### Decorate your methods using `@CachePandaSet()`:

```ts
import { Injectable } from '@nestjs/common';
import { CachePandaSet, CachingService } from 'cache-panda';

@Injectable()
export class MyService {
  constructor(public cachingService: CachingService) {}

  @CachePandaSet({
    prefix: 'user:',
    name: 'get-profile',
    ttl: 12000,
    argsIndex: [0],
    executionTimeLimit: 20
  })
  async getUserProfile(userId: string) {
    return { id: userId, name: 'Akhil' };
  }
}
```

---

## 🔍 `@CachePandaSet` Options

| Option                | Type       | Description                                                         |
|-----------------------|------------|---------------------------------------------------------------------|
| `prefix`              | `string`   | Key prefix to categorize/group caches                               |
| `name?`                | `string`   | Logical name for the method being cached                            |
| `ttl?`                | `number`   | Optional override for TTL (in ms)                                   |
| `argsIndex?`          | `number[]` | Pick specific method arguments to build the cache key               |
| `executionTimeLimit?` | `number`   | Only cache if method takes more than this number of ms              |


---

## 🧼 Manual Cache Usage

```ts
await this.cachingService.setCache('some-key', JSON.stringify(data), 60);
const result = await this.cachingService.getCache('some-key');

await this.cachingService.deleteCache('some-key');
await this.cachingService.clearCache();
```

Advanced:

```ts
await this.cachingService.deleteCacheByKeys(['key1', 'key2']);
await this.cachingService.deleteCacheByKeyPattern('user:');
const keys = await this.cachingService.getKeysByKeyPattern('user:');
```

---

## 📈 Roadmap

- [x] Initial release with decorator + service
- [x] TTL and execution-time-based conditional caching
- [ ] Redis and multi-store setup guide
- [ ] Logging and debug mode support (cache hit vs miss)
- [ ] Auto-Invalidation (Cache Busting) decorator
- [ ] CLI tool to inspect and manage cache keys


---

## 🛠 Contributing

Contributions are welcome! Open an issue or PR.

### Steps:
1. Fork the repo 🍴
2. Create your feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -am 'feat: add amazing thing'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Create a new Pull Request!

---

## 📜 License

MIT © [Akhil Kumar](https://github.com/d-akhil-kumar)

> Designed with ❤️ to make NestJS caching smarter, cleaner, and panda-fied.
