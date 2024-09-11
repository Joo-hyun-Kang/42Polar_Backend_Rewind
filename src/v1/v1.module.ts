import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { V1Controller } from './v1.controller';
import { MentorsModule } from './mentors/mentors.module';
import { BocalsService } from './bocals/bocals.service';
import { BocalsModule } from './bocals/bocals.module';
import { CadetsModule } from './cadets/cadets.module';

@Module({
  imports: [
    CategoriesModule,
    AuthModule,
    MentorsModule,
    BocalsModule,
    CadetsModule,
  ],
  controllers: [V1Controller],
  providers: [],
})
export class V1Module {}
