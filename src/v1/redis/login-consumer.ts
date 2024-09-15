import { Process, Processor } from '@nestjs/bull';
import { ConflictException } from '@nestjs/common';
import { Job } from 'bull';
import fetch from 'node-fetch';
import { LoginJob } from './interface/login-job.interface';
import { UserInfo42OriginDto } from '../auth/dto/oauth-42user-info-orgin.dto';

@Processor('loginQueue')
export class LoginConsumer {
  @Process('get-profile')
  async login(job: Job<LoginJob>, done) {
    const { accessToken } = job.data;
    const resoureServerUrl = process.env.RESOURE_SERVER_42;
    const requestOption = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    let response;
    try {
      response = await fetch(resoureServerUrl, requestOption);
    } catch (err) {
      throw new ConflictException(
        err,
        'ユーザの情報を取得することに失敗しました',
      );
    }
    if (response.status !== 200) {
      throw new ConflictException('ユーザの情報を取得することに失敗しました');
    }
    try {
      const data: UserInfo42OriginDto = await response.json();
      done(null, data);
    } catch (err) {
      throw new ConflictException(
        err,
        'リスポンスからデータを取り出しているところにエラーが生じました',
      );
    }
  }
}
