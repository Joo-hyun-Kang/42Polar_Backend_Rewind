import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisModule } from '../redis/redis.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MentoringLogsModule } from '../mentoring-logs/mentoring-logs.module';

@Module({
  imports: [
    RedisModule,
    MailerModule.forRootAsync({
      useFactory: () => {
        return {
          transport: {
            host: process.env.EMIAL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
          },
          template: {
            dir: './src/v1/templates',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
    forwardRef(() => MentoringLogsModule),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
