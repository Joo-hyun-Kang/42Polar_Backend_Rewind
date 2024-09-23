import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comments } from 'src/domain/typeorm/entity/comments.entity';
import { commentsRepository } from './repository/comments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService, commentsRepository],
})
export class CommentsModule {}
