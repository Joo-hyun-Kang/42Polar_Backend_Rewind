import { ConflictException, Injectable } from '@nestjs/common';
import { ROLES } from './enum/roles.enum';
import { TokenResponse42Dto } from './dto/token-response42.dto';
import { UserInfo42OriginDto } from './dto/oauth-42user-info-orgin.dto';

@Injectable()
export class AuthService {
  async getProfileBy42Intra(authCode: string): Promise<UserInfo42OriginDto> {
    const providerUrl = `https://api.intra.42.fr/oauth/token?grant_type=authorization_code&client_id=${process.env.UID_42}&client_secret=${process.env.SECRET_42}&code=${authCode}&redirect_uri=${process.env.REDIRECT_42}`;
    const response: TokenResponse42Dto =
      await this.getAcessToken<TokenResponse42Dto>(authCode, providerUrl);

    return await this.getProfile(response.access_token);
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

  // async validateProfile(userInfo: any) {
  //   let result: JwtUser;
  //   let join: boolean;
  //   if (profile.campus[0].name !== 'Seoul') {
  //     throw new ForbiddenException('서울 캠퍼스만 가입이 가능합니다.');
  //   }
  //   if (intraId.startsWith('m-')) {
  //     const mentor: Mentors = await this.mentorsService.findByIntra(intraId);
  //     if (!mentor) {
  //       result = await this.mentorsService.createUser(intraId);
  //       join = false;
  //     } else {
  //       result = { id: mentor.id, intraId: mentor.intraId, role: 'mentor' };
  //       join = this.mentorsService.validateInfo(mentor);
  //     }
  //   } else if (profile['staff?']) {
  //     join = true;
  //     const bocal: Bocals = await this.bocalsService.findByIntra(intraId);
  //     const newData: CreateBocalDto = { intraId };
  //     if (!bocal) {
  //       result = await this.bocalsService.createUser(newData);
  //     } else {
  //       result = await this.bocalsService.updateLogin(bocal, newData);
  //     }
  //   } else {
  //     if (cursus.length < 2) {
  //       throw new ForbiddenException('본과정 카뎃만 가입이 가능합니다.');
  //     }
  //     if (
  //       cursus[1].grade === 'Learner' &&
  //       (cursus[1].end_at ||
  //         new Date(cursus[1].blackholed_at).getTime() <= Date.now())
  //     ) {
  //       throw new ForbiddenException('블랙홀에 빠진 카뎃은 이용이 불가합니다.');
  //     }
  //     const cadet: Cadets = await this.cadetsService.findByIntra(intraId);
  //     const newData: CreateCadetDto = {
  //       intraId,
  //       profileImage,
  //       isCommon: cursus[1].grade === 'Learner',
  //       email,
  //     };
  //     if (!cadet) {
  //       result = await this.cadetsService.createUser(newData);
  //       join = false;
  //     } else {
  //       result = await this.cadetsService.updateLogin(cadet, newData);
  //       join = this.cadetsService.validateInfo(cadet);
  //     }
  //   }
  //   const jwt = await this.jwtService.sign({
  //     sub: result.id,
  //     username: result.intraId,
  //     role: result.role,
  //   });
  //   return {
  //     jwt,
  //     user: { intraId: result.intraId, role: result.role, join },
  //   };
  // }
}
