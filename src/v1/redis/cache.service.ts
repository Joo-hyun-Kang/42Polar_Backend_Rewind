import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    return await this.cacheManager.get(key);
  }

  async set(key: string, value: any, options?: CachingConfig): Promise<any> {
    return await this.cacheManager.set(key, value, options);
  }

  async del(key: string): Promise<any> {
    return await this.cacheManager.del(key);
  }
}
