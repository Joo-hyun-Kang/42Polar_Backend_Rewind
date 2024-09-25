import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments } from 'src/domain/typeorm/entity/comments.entity';
import { CadetsModule } from '../cadets/cadets.module';
import { MentorsModule } from '../mentors/mentors.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentsRepository } from './repository/comments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comments]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
    CadetsModule,
    MentorsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
