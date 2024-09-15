import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class LoginProducer {
  constructor(@InjectQueue('loginQueue') private loginQueue: Queue) {}

  async addJob(accessToken: string) {
    const job = await this.loginQueue.add(
      'get-profile',
      { accessToken },
      { attempts: 10, backoff: 1000 },
    );

    return await job.finished();
  }
}
