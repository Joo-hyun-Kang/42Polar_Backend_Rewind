import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ROLES } from './enum/roles.enum';
import { TokenResponse42Dto } from './dto/token-response42.dto';
import { UserInfo42OriginDto } from './dto/oauth-42user-info-orgin.dto';

import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { Bocals } from 'src/domain/typeorm/entity/bocal.entity';
import { JwtInfo, JwtInfoAndJoin } from './interface/jwt-user.interface';
import { CadetsService } from '../cadets/cadets.service';
import { BocalsService } from '../bocals/bocals.service';
import { MentorsService } from '../mentors/mentors.service';
import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { CreateCadetDto } from '../cadets/dto/create-cadet.dto';
import { LoginProducer } from '../redis/login-producer';

@Injectable()
export class AuthService {
  constructor(
    private cadetsService: CadetsService,
    private bocalsService: BocalsService,
    private mentorsService: MentorsService,
    private loginProducer: LoginProducer,
  ) {}

  async getProfileBy42Intra(authCode: string): Promise<UserInfo42OriginDto> {
    const providerUrl = `https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_id=${process.env.UID_42}&client_secret=${process.env.SECRET_42}&code=${authCode}&redirect_uri=${process.env.REDIRECT_42}`;
    const response: TokenResponse42Dto =
      await this.getAcessToken<TokenResponse42Dto>(authCode, providerUrl);

    return await this.loginProducer.addJob(response.access_token);
  }

  async getProfile(accessToken: string): Promise<UserInfo42OriginDto> {
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
      return data;
    } catch (err) {
      throw new ConflictException(
        err,
        'リスポンスからデータを取り出しているところにエラーが生じました',
      );
    }
  }

  async getAcessToken<T>(authCode: string, providerUrl: string): Promise<T> {
    let response;

    try {
      response = await fetch(providerUrl, { method: 'post' });
    } catch (err) {
      throw new ConflictException(
        err,
        'access tokenを取得するのに失敗しました',
      );
    }

    if (response.status >= 400) {
      throw new ConflictException('access tokenを取得するのに失敗しました');
    }

    try {
      const data = await response.json();
      return data as T;
    } catch (err) {
      throw new ConflictException(
        err,
        'リスポンスからデータを取り出しているところにエラーが生じました',
      );
    }
  }

  async createAndUpdateProfile(
    userInfo: UserInfo42OriginDto,
  ): Promise<JwtInfoAndJoin> {
    //jwtトークンを発行するデータ
    let jwtInfo: JwtInfo;
    //最初ローグインをしたのに、会員情報入力したか確認
    let isJoined: boolean;

    //見やすく必要なデータ抽出
    const email = userInfo.email;
    const intraId = userInfo.login;
    const profileImage = userInfo.image.link;
    const cursus = userInfo.cursus_users;
    const staff = userInfo.staff;

    if (intraId.startsWith('m-')) {
      const isMentor = await this.mentorsService.isMentor(intraId);

      if (!isMentor) {
        jwtInfo = await this.mentorsService.createUser(intraId);
        isJoined = false;
      } else {
        const mentor: Mentors = await this.mentorsService.findByIntra(intraId);

        jwtInfo = {
          id: mentor.id,
          intraId: mentor.intraId,
          role: ROLES.MENTOR,
        };
        isJoined = this.mentorsService.validateInfo(mentor);
      }

      return {
        jwtinfo: jwtInfo,
        isJoined: isJoined,
      };
    }

    if (staff) {
      //現在はスタップの場合、追加で情報入力することはない
      isJoined = true;

      const isBocal = await this.bocalsService.isBocal(intraId);
      if (!isBocal) {
        jwtInfo = await this.bocalsService.createUser(intraId);
      } else {
        const bocal: Bocals = await this.bocalsService.findByIntra(intraId);
        jwtInfo = await this.bocalsService.updateLogin(bocal, intraId);
      }

      return {
        jwtinfo: jwtInfo,
        isJoined: isJoined,
      };
    }

    //カデットの場合
    if (cursus.length < 2) {
      throw new ForbiddenException('42cursusに属している方だけ、入られます');
    }

    const commonCircleIndex = 1;
    if (cursus[commonCircleIndex].grade === 'Learner') {
      if (cursus[commonCircleIndex].end_at) {
        throw new ForbiddenException(
          'ブラックホールに落ちたカデットは利用できません',
        );
      }

      if (
        cursus[commonCircleIndex].blackholed_at !== null &&
        new Date(cursus[commonCircleIndex].blackholed_at).getTime() <=
          Date.now()
      ) {
        throw new ForbiddenException(
          'ブラックホールに落ちたカデットは利用できません',
        );
      }
    }

    const isCadet = await this.cadetsService.isCadet(intraId);

    if (!isCadet) {
      const newData: CreateCadetDto = {
        intraId,
        profileImage,
        isCommon: cursus[1].grade === 'Learner',
        email,
      };

      jwtInfo = await this.cadetsService.createUser(newData);
      isJoined = false;
    } else {
      const cadet: Cadets = await this.cadetsService.findCadetByIntraId(
        intraId,
      );

      const updateData: CreateCadetDto = {
        intraId,
        profileImage,
        isCommon: cursus[1].grade === 'Learner',
        email,
      };

      jwtInfo = await this.cadetsService.updateLogin(cadet, updateData);
      isJoined = this.cadetsService.validateInfo(cadet);
    }

    return {
      jwtinfo: jwtInfo,
      isJoined: isJoined,
    };
  }
}
