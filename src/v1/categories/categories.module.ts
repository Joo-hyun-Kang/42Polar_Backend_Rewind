import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './repository/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/domain/typeorm/entity/categories.entity';
import { Keywords } from 'src/domain/typeorm/entity/keywords.entity';
import { KeywordsRepository } from './repository/keywords.repository';
import { KeywordsService } from './keywords.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Keywords]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    KeywordsService,
    KeywordsRepository,
  ],
})
export class CategoriesModule {}
