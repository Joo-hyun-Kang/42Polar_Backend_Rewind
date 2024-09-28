import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CacheService } from '../redis/cache.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly mailservice: MailerService,
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
}
