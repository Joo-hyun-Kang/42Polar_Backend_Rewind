import { Controller, Get, Param } from '@nestjs/common';
import { MentorDto } from './dto/mentor.dto';
import { MentorsService } from './mentors.service';

@Controller()
export class MentorsController {
  constructor(private mentorService: MentorsService) {}

  /*
   * フロントのメンター詳細ページでメンター情報を見せる時に使う
   * 既存コード：サービスでレポコードを分離、フロントコードでデフォルトイメージで見えるようにコード修正
   */
  @Get(':intraId')
  async getMentorDetails(
    @Param('intraId') intraId: string,
  ): Promise<MentorDto> {
    return await this.mentorService.getMentorDetails(intraId);
  }
}
