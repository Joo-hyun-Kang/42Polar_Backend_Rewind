import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CacheService } from '../redis/cache.service';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { MailType } from '../mentoring-logs/enum/mail-type.enum';
import { ReservationMessage } from '../mentoring-logs/interface/reservation-message.interface';
import { ApproveMessage } from '../mentoring-logs/interface/approve-message.interface';
import { CancelMessage } from '../mentoring-logs/interface/cancel-message.interface';
import { MentoringLogsService } from '../mentoring-logs/mentoring-logs.service';
import { MentoringLogs } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { getJSTDate } from '../util/utils';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly cacheService: CacheService,
    private readonly mailservice: MailerService,
    private readonly mentoringLogsService: MentoringLogsService,
  ) {}

  async sendValidationCode(
    intraId: string,
    emailAddress: string,
  ): Promise<boolean> {
    /*
     * Random code generator 0.c3rm8164vt7
     * subString 0.c3rm8164vt7 -> c3rm8164vt7
     */
    const code: string = Math.random().toString(36).substring(2, 10);

    //タイムアウトは3分設定
    const EMAIL_TIME_LIMIT = 180;

    try {
      /*
       * 同じ Intra IDのリクエスト削除 on Redis 後, 改めて Set
       */
      const oldCode = await this.cacheService.get(intraId);
      if (oldCode) {
        await Promise.all([
          this.cacheService.del(intraId),
          this.cacheService.del(oldCode),
        ]);
      }
      await this.cacheService.set(code, emailAddress, {
        ttl: EMAIL_TIME_LIMIT,
      });
      await this.cacheService.set(intraId, code, {
        ttl: EMAIL_TIME_LIMIT,
      });
    } catch {
      throw new ConflictException(`メールリクエスト中にエラーが発生しました`);
    }

    await this.sendVerificationMail(code, emailAddress);

    return true;
  }

  async sendVerificationMail(code: string, email: string) {
    await this.mailservice.sendMail({
      to: email,
      /*
       * Not works
       */
      from: 'noreply@42polar.com',
      subject: '42POLARのメール認証リクエストメールです。',
      template: 'email-verification.hbs',
      context: {
        verifyCode: `${code}`,
      },
    });
    return true;
  }

  async verifyMentorEmail(intraId: string, code: string): Promise<string> {
    const email = await this.cacheService.get(code);

    if (!email) {
      throw new ConflictException('無効なリクエストです');
    }

    try {
      /*
       * リクエストの削除 on Redis
       */
      await Promise.all([
        this.cacheService.del(intraId),
        this.cacheService.del(code),
      ]);
    } catch {
      throw new ConflictException(`メールリクエスト中にエラーが発生しました`);
    }

    return email;
  }

  async sendMessage(
    mentoringLogsId: string,
    mailType: MailType,
  ): Promise<boolean> {
    let messageDto: ReservationMessage | ApproveMessage | CancelMessage = null;

    try {
      messageDto = await this.getMessageDto(mentoringLogsId, mailType);
    } catch (err) {
      const mailTypeString = this.stringifyMailType(mailType);

      //メールエラーはサーバーで記録、プロントに返さない
      this.logger.warn(
        `${mailTypeString} メールの転送を失敗しました。 DB Error : ${err}`,
      );

      return false;
    }

    const messageForm: ISendMailOptions = await this.getMailMessageForm(
      messageDto,
      mailType,
    );

    if (messageForm === null) {
      this.logger.warn(
        `該当するMailMessageFormがありません : MailTypeを確認してください`,
      );

      return false;
    }

    let mailSendState = false;
    for (let i = 0; i < 2 && mailSendState === false; i++) {
      try {
        mailSendState = await this.sendMailMessageToCadetMentor(
          messageDto.mentorEmail,
          messageDto.cadetEmail,
          messageForm,
        );
      } catch (err) {
        const mailTypeString = this.stringifyMailType(mailType);

        this.logger.warn(
          `${mailTypeString} メール送信失敗 メールエラー : ${err}`,
        );
      }
    }

    if (mailSendState === true) {
      const mailTypeString = this.stringifyMailType(mailType);

      this.logger.log(`${mailTypeString} メール送信成功`);
    } else {
      return false;
    }
  }

  private stringifyMailType(mailType: MailType): string {
    switch (mailType) {
      case MailType.Reservation: {
        return '予約';
      }
      case MailType.Approve: {
        return '承認';
      }
      case MailType.Cancel: {
        return 'キャンセル';
      }
      default: {
        return '未定義のメールタイプ';
      }
    }
  }

  private async getMessageDto(
    mentoringsLogsId: string,
    mailType: MailType,
  ): Promise<ReservationMessage | ApproveMessage | CancelMessage> {
    let mentoringsLogsInfoDb: MentoringLogs = null;

    //なければ,NotFoundExceptionが発生する
    mentoringsLogsInfoDb =
      await this.mentoringLogsService.findMentoringLogsById(mentoringsLogsId);

    const mentor = await mentoringsLogsInfoDb.mentors;
    const cadet = await mentoringsLogsInfoDb.cadets;

    if (!mentoringsLogsInfoDb.mentors) {
      throw new NotFoundException('mentoringLogsテーブルにmentorsがありません');
    }
    if (!mentoringsLogsInfoDb.cadets) {
      throw new NotFoundException('mentoringLogsテーブルにcadetsがありません');
    }
    if (!mentor.email) {
      throw new NotFoundException('mentorのメールアドレスが見つかりません');
    }
    if (!cadet.email) {
      throw new NotFoundException('cadetsのメールアドレスが見つかりません');
    }

    this.vaildateMentoringTimeFromDb(mentoringsLogsInfoDb, mailType);

    switch (mailType) {
      case MailType.Reservation: {
        const reservationMessage: ReservationMessage = {
          mentorEmail: mentor.email,
          mentorSlackId: mentor.intraId,
          cadetEmail: cadet.email,
          cadetSlackId: cadet.intraId,
          topic: mentoringsLogsInfoDb.topic,
          reservationTime1: mentoringsLogsInfoDb.requestTime1,
          reservationTime2: mentoringsLogsInfoDb.requestTime2,
          reservationTime3: mentoringsLogsInfoDb.requestTime3,
          isCommon: cadet.isCommon,
        };
        return reservationMessage;
      }
      case MailType.Approve: {
        const approveMessage: ApproveMessage = {
          mentorEmail: mentor.email,
          mentorSlackId: mentor.intraId,
          cadetEmail: cadet.email,
          cadetSlackId: cadet.intraId,
          topic: mentoringsLogsInfoDb.topic,
          meetingAt: mentoringsLogsInfoDb.meetingAt,
        };
        return approveMessage;
      }
      case MailType.Cancel: {
        const cancelMessage: CancelMessage = {
          mentorEmail: mentor.email,
          mentorSlackId: mentor.intraId,
          cadetEmail: cadet.email,
          cadetSlackId: cadet.intraId,
          topic: mentoringsLogsInfoDb.topic,
          rejectMessage: mentoringsLogsInfoDb.rejectMessage,
        };
        return cancelMessage;
      }
      default: {
        throw new NotFoundException(process.env.UNCOMPLETEREQUEST);
      }
    }
  }

  private vaildateMentoringTimeFromDb(
    mentoringsLogsInfoDb: MentoringLogs,
    mailType: MailType,
  ) {
    switch (mailType) {
      case MailType.Reservation: {
        if (!mentoringsLogsInfoDb.requestTime1) {
          throw new NotFoundException('リクエスト時間が1つも見つかりません');
        }
        /* requestTime2,3はnullまたは空の配列になる可能性があります */
        /* 0000-00-00 00:00は例外処理すべきデータ */
        if (!mentoringsLogsInfoDb.requestTime2) {
          mentoringsLogsInfoDb.requestTime2 = [
            new Date(0, 0, 0, 0, 0, 0, 0),
            new Date(0, 0, 0, 0, 0, 0),
          ];
        }
        if (!mentoringsLogsInfoDb.requestTime3) {
          mentoringsLogsInfoDb.requestTime3 = [
            new Date(0, 0, 0, 0, 0, 0, 0),
            new Date(0, 0, 0, 0, 0, 0),
          ];
        }
        if (mentoringsLogsInfoDb.requestTime1.length !== 2) {
          throw new NotFoundException(
            '正しいリクエスト時間の形式ではありません',
          );
        }
        /* requestTime2,3はnullまたは空の配列になる可能性があります */
        /* 0000-00-00 00:00は例外処理すべきデータ */
        if (mentoringsLogsInfoDb.requestTime2.length < 2) {
          mentoringsLogsInfoDb.requestTime2 = [
            new Date(0, 0, 0, 0, 0, 0, 0),
            new Date(0, 0, 0, 0, 0, 0),
          ];
        }
        if (mentoringsLogsInfoDb.requestTime3.length < 2) {
          mentoringsLogsInfoDb.requestTime3 = [
            new Date(0, 0, 0, 0, 0, 0, 0),
            new Date(0, 0, 0, 0, 0, 0),
          ];
        }
        mentoringsLogsInfoDb.requestTime1.forEach(function (value) {
          if (value === null) {
            throw new NotFoundException(
              '正しいデータ形式ではありません: requestTime1',
            );
          }
        });
        mentoringsLogsInfoDb.requestTime2.forEach(function (value) {
          if (value === null) {
            throw new NotFoundException(
              '正しいデータ形式ではありません: requestTime2',
            );
          }
        });
        mentoringsLogsInfoDb.requestTime3.forEach(function (value) {
          if (value === null) {
            throw new NotFoundException(
              '正しいデータ形式ではありません: requestTime3',
            );
          }
        });

        break;
      }
      case MailType.Approve: {
        if (!mentoringsLogsInfoDb.meetingAt) {
          throw new NotFoundException(
            '予約確定時間(meetingAt)が見つかりません',
          );
        }
        if (mentoringsLogsInfoDb.meetingAt.length !== 2) {
          throw new NotFoundException(
            '予約確定時間(meetingAt)が見つかりません',
          );
        }
        mentoringsLogsInfoDb.meetingAt.forEach(function (value) {
          if (value === null) {
            throw new NotFoundException(
              '正しいデータ形式ではありません: meetingAt',
            );
          }
        });

        break;
      }
      default: {
        throw new NotFoundException(process.env.UNCOMPLETEREQUEST);
      }
    }
  }

  private async getMailMessageForm(
    messageDto: any,
    mailType: MailType,
  ): Promise<ISendMailOptions> {
    switch (mailType) {
      case MailType.Reservation: {
        const commonType: string = messageDto.isCommon
          ? '共通過程'
          : '深化過程';
        const requestTime1: string = await this.convertDateToString(
          getJSTDate(messageDto.reservationTime1[0]),
          this.getMentoringHoursByNumber(
            messageDto.reservationTime1[0],
            messageDto.reservationTime1[1],
          ),
        );
        const requestTime2: string = await this.convertDateToString(
          getJSTDate(messageDto.reservationTime2[0]),
          this.getMentoringHoursByNumber(
            messageDto.reservationTime2[0],
            messageDto.reservationTime2[1],
          ),
        );
        const requestTime3: string = await this.convertDateToString(
          getJSTDate(messageDto.reservationTime3[0]),
          this.getMentoringHoursByNumber(
            messageDto.reservationTime3[0],
            messageDto.reservationTime3[1],
          ),
        );
        /* reservation2, 3のメンタリング時間が0の場合、''を送信 */
        return {
          subject: '[42POLAR] メンタリングリクエストが保留中です',
          template: 'ReservationMessage.hbs',
          context: {
            mentorSlackId: messageDto.mentorSlackId,
            cadetSlackId: messageDto.cadetSlackId,
            topic: messageDto.topic,
            intraProfileUrl:
              'https://profile.intra.42.fr/users/' + messageDto.cadetSlackId,
            commonType: commonType,
            requestTime1: requestTime1,
            requestTime2: requestTime2,
            requestTime3: requestTime3,
          },
        };
      }
      case MailType.Approve: {
        const reservationTimeToString = await this.convertDateToString(
          getJSTDate(messageDto.meetingAt[0]),
          this.getMentoringHoursByNumber(
            messageDto.meetingAt[0],
            messageDto.meetingAt[1],
          ),
        );
        /* meetingAtのメンタリング時間が0の場合、''を送信 */
        return {
          subject: '[42POLAR] メンタリングリクエストが確定しました',
          template: 'ApproveMessage.hbs',
          context: {
            cadetSlackId: messageDto.cadetSlackId,
            mentorSlackId: messageDto.mentorSlackId,
            topic: messageDto.topic,
            reservationTimeToString: reservationTimeToString,
          },
        };
      }
      case MailType.Cancel: {
        return {
          subject: '[42POLAR] メンタリングリクエストがキャンセルされました',
          template: 'CancelMessage.hbs',
          context: {
            cadetSlackId: messageDto.cadetSlackId,
            mentorSlackId: messageDto.mentorSlackId,
            topic: messageDto.topic,
            rejectMessage: messageDto.rejectMessage,
          },
        };
      }
      default: {
        return null;
      }
    }
  }

  private async sendMailMessageToCadetMentor(
    mentorEmail: string,
    cadetEmail: string,
    messageForm: ISendMailOptions,
  ): Promise<boolean> {
    try {
      messageForm.to = cadetEmail;
      await this.mailservice.sendMail(messageForm);
      messageForm.to = mentorEmail;
      await this.mailservice.sendMail(messageForm);
      return true;
    } catch (error) {
      throw new ConflictException('メールの転送が失敗しました。');
    }
  }

  private async convertDateToString(
    reservationTime: Date,
    mentoringTime: number,
  ): Promise<string> {
    if (mentoringTime === 0) {
      return '';
    }
    const reservationTimeToString = `${reservationTime.getUTCFullYear()}.${(
      reservationTime.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}.${reservationTime
      .getUTCDate()
      .toString()
      .padStart(2, '0')} ${reservationTime
      .getUTCHours()
      .toString()
      .padStart(2, '0')}:${reservationTime
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')} (${mentoringTime}시간)`;
    return reservationTimeToString;
  }

  private getMentoringHoursByNumber(startTime: Date, endTime: Date): number {
    const millisecondToHour = 3600000;

    const mentoringTimeHours =
      (endTime.getTime() - startTime.getTime()) / millisecondToHour;

    return mentoringTimeHours;
  }
}
