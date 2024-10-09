import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MentoringLogsService } from './mentoring-logs.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { User } from '../auth/decorators/user.decorator';
import { CreateApplyDto } from './dto/create-apply.dto';
import { ApproveMentoringDto } from './dto/approve-mentoring.dto';
import { LOG_STATUS } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { RejectMentoringDto } from './dto/reject-mentoring.dto';
import { CompleteMentoringDto } from './dto/complete-mentoring.dto';
import { EmailService } from '../email/email.service';
import { MailType } from './enum/mail-type.enum';

@Controller()
export class MentoringLogsController {
  constructor(
    private mentoringLogsService: MentoringLogsService,
    private emailService: EmailService,
  ) {}

  /*
   * メンタリング申し込みページで、新しいメンタリングを申し込みとデーターを生成するAPI
   * 既存コード改善
   * -過去時間い申し込み防ぐロジック追加
   * -Date型で切り替えていない場合、変更する、Date型にあってない場合は例外が発生する
   * -APIをエンドポイントの変更、サービスでレポコードを分離
   */
  @Post('apply/:mentorId')
  @Roles([ROLES.CADET])
  @UseGuards(AuthGuard, RoleGuard)
  async apply(
    @Param('mentorId') mentorId: string,
    @User() user: JwtInfo,
    @Body() createApplyDto: CreateApplyDto,
  ): Promise<boolean> {
    const createdMentoringLog =
      await this.mentoringLogsService.createMentorigLog(
        mentorId,
        user.intraId,
        createApplyDto,
      );

    let isCreateMentoringLog = false;
    if (createdMentoringLog) {
      isCreateMentoringLog = true;

      this.emailService.sendMessage(
        createdMentoringLog.id,
        MailType.Reservation,
      );
    }

    return isCreateMentoringLog;
  }

  /*
   * メンタリングの状態を確定で変更するAPI
   * 私のメンタリングーMentorページで使用
   * 既存コード改善
   * -過去時間い申し込み防ぐロジック追加
   * -APIをエンドポイントの変更、サービスでレポコードを分離
   */
  @Post('approve')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async approveMentoring(
    @User() user: JwtInfo,
    @Body() body: ApproveMentoringDto,
  ) {
    const result = await this.mentoringLogsService.updateMentoringLogStatus({
      MentorOrCadetId: user.intraId,
      mentoringLogId: body.mentoringLogId,
      status: LOG_STATUS.CONFIRMED,
      meetingAtIndex: body.meetingAtIndex,
    });
    this.emailService.sendMessage(body.mentoringLogId, MailType.Approve);
    return result;
  }

  /*
   * メンタリングの状態を確定で削除するAPI
   * 私のメンタリングーMentor、cadet(生徒）ページで使用
   * 既存コード改善
   * -APIをエンドポイントの変更、サービスでレポコードを分離
   */
  @Post('reject')
  @Roles([ROLES.MENTOR, ROLES.CADET])
  @UseGuards(AuthGuard, RoleGuard)
  async rejectMentoring(
    @User() user: JwtInfo,
    @Body() body: RejectMentoringDto,
  ) {
    const result = await this.mentoringLogsService.updateMentoringLogStatus({
      MentorOrCadetId: user.intraId,
      mentoringLogId: body.mentoringLogId,
      status: LOG_STATUS.CANCEL,
      rejectMessage: body.rejectMessage,
    });
    this.emailService.sendMessage(body.mentoringLogId, MailType.Cancel);
    return result;
  }

  /*
   * メンタリングの状態を確定で完了するAPI
   * 私のメンタリングーMentorページで使用
   * 既存コード改善
   * -APIをエンドポイントの変更、サービスでレポコードを分離
   */
  @Patch('done')
  @Roles([ROLES.MENTOR])
  async CompleteMentoring(
    @User() user: JwtInfo,
    @Body() body: CompleteMentoringDto,
  ) {
    return await this.mentoringLogsService.updateMentoringLogStatus({
      MentorOrCadetId: user.intraId,
      mentoringLogId: body.mentoringLogId,
      status: LOG_STATUS.DONE,
    });
  }
}
