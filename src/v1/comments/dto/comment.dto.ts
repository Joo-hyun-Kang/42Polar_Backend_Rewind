import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content: string;
}

export class UpdateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CommentDto {
  id: string;
  content: string;
  createdAt: Date;
  cadets: {
    intraId: string;
    profileImage: string;
  };
}
