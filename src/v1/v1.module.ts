import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { V1Controller } from './v1.controller';

@Module({
  imports: [CategoriesModule, AuthModule],
  controllers: [V1Controller],
  providers: [],
})
export class V1Module {}
