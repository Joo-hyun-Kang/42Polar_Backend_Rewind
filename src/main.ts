import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // NestFactoryはアプリケーションインスタンスの作成を可能にするいくつかの静的メソッドを含まれている
  // 多分、モジュールを読んで登録した機能を実行する
  const app = await NestFactory.create(AppModule);

  // ValidationPipeをグローバルに適用
  app.useGlobalPipes(new ValidationPipe());

  // CORSを有効にする
  app.enableCors({
    origin: [
      process.env.FRONT_URL,
      process.env.NS_FRONT_URL,
      process.env.LOCALHOST,
    ],
    credentials: true, // 認証情報を含むリクエストを許可する場合
  });

  // HTTP リスナーを起動するだけで、アプリケーションは着信 HTTP 要求を待機できます。
  await app.listen(3001);
}
bootstrap();
