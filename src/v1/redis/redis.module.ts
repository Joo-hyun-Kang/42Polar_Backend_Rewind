import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { LoginConsumer } from './login-consumer';
import { LoginProducer } from './login-producer';
import 'dotenv/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        username: 'default',
      },
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
      },
      limiter: {
        max: 2,
        duration: 1000,
      },
      settings: {
        maxStalledCount: 1,
      },
    }),
    BullModule.registerQueue({ name: 'loginQueue' }),
    CacheModule.registerAsync({
      //ConfigModuleは環境変数を持ってもらうnestのライブラリを使用するため
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          //redisに接続するライブラリー
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        };
      },
    }),
  ],
  providers: [LoginConsumer, LoginProducer, CacheService],
  exports: [LoginProducer, CacheService],
})
export class RedisModule {}
