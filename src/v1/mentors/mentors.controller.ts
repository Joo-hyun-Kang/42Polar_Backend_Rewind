import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MentorDto } from './dto/mentor.dto';
import { MentorsService } from './mentors.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { User } from '../auth/decorators/user.decorator';
import { UpdateMentorDatailDto } from './dto/mentor-detail.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { SimpleMentoringInfoDto } from './dto/log-pagination.dto';
import { MentoringInfoDto } from './dto/mentoring-info.dto';
import { JoinMentorDto } from './dto/join-mentor-dto';
import { RequestEmailDto } from './dto/email.dto';

@Controller()
export class MentorsController {
  constructor(private mentorService: MentorsService) {}

  /*
   * 私のメンタリングーMentorページにメンターのメンタリングログを見せるAPI
   * 既存コード：サービスでレポコードを分離
   */
  @Get('mentorings')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async getMentoringsLists(
    @User() user: JwtInfo,
    @Query() pagination: PaginationDto,
  ): Promise<MentoringInfoDto> {
    return await this.mentorService.getMentoringsLists(
      user.intraId,
      pagination,
    );
  }

  /*
   * フロントのメンター詳細ページでメンターに行われたメンタリングリストに使用
   * 既存コード：サービスでレポコードを分離
   */
  @Get('simplelogs/:intraId')
  async getSimpleLogs(
    @Param('intraId') mentorIntraId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<SimpleMentoringInfoDto> {
    console.log(1);
    const result = await this.mentorService.getSimpleLogsPagination(
      mentorIntraId,
      paginationDto,
    );
    return { logs: result[0], total: result[1] };
  }

  /*
   *  会員登録ーMentorページにメール認証のため、コード生成とメールを送るAPI
   *  既存コード：RedisロジックをRedisモージュルに集めました
   */
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Post('email')
  invalidateMentorEmail(
    @User() user: JwtInfo,
    @Body() req: RequestEmailDto,
  ): Promise<boolean> {
    return this.mentorService.sendValidationCode(user.intraId, req.email);
  }

  /*
   * フロントの会員登録ーメンターにサービズの利用前、必須情報登録するAPI
   * updateMentorDetailsとサービス、レポ同じ、DTOが必須なのでAPI分離
   */
  @Patch('join')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async join(
    @Body() body: JoinMentorDto,
    @User() user: JwtInfo,
  ): Promise<boolean> {
    await this.mentorService.updateMentorDetails(user.intraId, body);
    return true;
  }

  /*
   * メンター詳細ページでメンタが自分のキーワードを見える際に使用
   * 既存コード：サービズからレポジトリロジック分離
   */
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Get('/:intraId/keywords')
  async getKeywordNames(@Param('intraId') intraId: string): Promise<string[]> {
    return this.mentorService.getMentorKeywordNamesOfMentor(intraId);
  }

  /*
   * メンター詳細ページでメンタが自分のキーワードをアップデートする際に使う
   * 既存コード：クエリ最適化（キーワード数回→４回）、サービズからレポジトリロジック分離
   */
  @Patch(':intraId/keywords')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async updateMentorKeywords(
    @User() user: JwtInfo,
    @Param('intraId') intraId: string,
    @Body('keywords') keywords: string[],
  ): Promise<boolean> {
    if (user.intraId !== intraId) {
      throw new BadRequestException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    if (!keywords) {
      throw new BadRequestException(process.env.UNCOMPLETEREQUEST);
    }

    return await this.mentorService.updateMentorKeywords(intraId, keywords);
  }

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

  /*
   * フロントのメンター詳細ページでメンター情報をアップデートするAPI
   * Email、キーワードは別のコントローラーによって登録される→メール認証のため
   * 既存コード：サービスでレポコードを分離
   */
  @Patch(':intraId')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async updateMentorDetails(
    @User() user: JwtInfo,
    @Param('intraId') intraId: string,
    @Body() body: UpdateMentorDatailDto,
  ): Promise<boolean> {
    if (user.intraId !== intraId) {
      throw new BadRequestException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    return await this.mentorService.updateMentorDetails(user.intraId, body);
  }
}
