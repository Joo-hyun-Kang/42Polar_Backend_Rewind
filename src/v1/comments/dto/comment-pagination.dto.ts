import { CommentDto } from './comment.dto';

export class CommentPaginationDto {
  comments: CommentDto[];
  total: number;
}
