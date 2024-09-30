import { Injectable, NotFoundException } from '@nestjs/common';
import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { CreateCadetDto } from './dto/create-cadet.dto';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { ROLES } from '../auth/enum/roles.enum';
import { CadetsRepository } from './repository/cadets.repository';
import { CadetMentoringLogs } from './dto/cadet-mentoring-logs.interface';
import { MentoringLogs } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { CadetApplyInfoDto } from './dto/cadet-apply-info.dto';
import { UpdateCadetDto } from './dto/update-cadet.dto';

@Injectable()
export class CadetsService {
  constructor(private cadetsRepository: CadetsRepository) {}

  async findCadetByIntraId(intraId: string): Promise<Cadets> {
    return await this.cadetsRepository.findByIntra(intraId);
  }

  async createUser(userinfo: CreateCadetDto): Promise<JwtInfo> {
    const createdCadet = await this.cadetsRepository.createUser(userinfo);

    return {
      id: createdCadet.id,
      intraId: createdCadet.intraId,
      role: ROLES.CADET,
    };
  }

  async updateLogin(cadet: Cadets, newData: CreateCadetDto): Promise<JwtInfo> {
    cadet.intraId = newData.intraId;
    cadet.profileImage = newData.profileImage;
    cadet.isCommon = newData.isCommon;
    cadet.email = newData.email;

    const updateCadet = await this.cadetsRepository.updateCadet(cadet);
    return {
      id: updateCadet.id,
      intraId: updateCadet.intraId,
      role: ROLES.CADET,
    };
  }

  validateInfo(cadet: Cadets): boolean {
    if (!cadet.name) {
      return false;
    }
    return true;
  }

  async isCadet(intraId: string): Promise<boolean> {
    try {
      const cadet = await this.findCadetByIntraId(intraId);
      if (cadet) {
        return true;
      }
      return false;
    } catch (error) {
      // NotFoundException の場合だけ例外をキャッチ
      if (error instanceof NotFoundException) {
        return false;
      }

      // 他の例外はそのまま投げる
      throw error;
    }
  }

  async saveName(intraId: string, name: string): Promise<boolean> {
    //生徒がなければ、例外が発生する
    const foundUser: Cadets = await this.cadetsRepository.findByIntra(intraId);

    foundUser.name = name;
    await this.cadetsRepository.updateCadet(foundUser);

    return true;
  }

  async getMentoringLogs(intraId: string): Promise<CadetApplyInfoDto> {
    const cadetWithMetoringLogs =
      await this.cadetsRepository.getCadetWithMentoringLogsAndMentorAndReport(
        intraId,
      );

    //プロントの生徒のメンとリングページにメンタリングカードのモーダルデータにParsing
    const mentorings: CadetMentoringLogs[] = await this.formatMentorings(
      await cadetWithMetoringLogs.mentoringLogs,
      cadetWithMetoringLogs.isCommon,
    );

    return {
      username: cadetWithMetoringLogs.name,
      resumeUrl: cadetWithMetoringLogs.resumeUrl,
      mentorings: mentorings,
    };
  }

  async formatMentorings(
    logs: MentoringLogs[],
    isCommon: boolean,
  ): Promise<CadetMentoringLogs[]> {
    return Promise.all(
      logs.map(async (mentoring) => {
        return {
          id: mentoring.id,
          mentor: {
            intraId: (await mentoring.mentors)?.intraId,
            name: (await mentoring.mentors)?.name,
          },
          createdAt: mentoring.createdAt,
          status: mentoring.status,
          topic: mentoring.topic,
          meta: {
            isCommon,
            content: mentoring.content,
            requestTime: [
              mentoring.requestTime1,
              mentoring.requestTime2,
              mentoring.requestTime3,
            ],
            meetingAt: mentoring.meetingAt,
            rejectMessage: mentoring.rejectMessage,
            feedbackMessage: (await mentoring.reports)?.feedbackMessage,
          },
        };
      }),
    );
  }

  async updateCadet(
    cadetIntraId: string,
    updateCadetDto: UpdateCadetDto,
  ): Promise<void> {
    const cadet: Cadets = await this.findCadetByIntraId(cadetIntraId);
    cadet.resumeUrl = updateCadetDto.resumeUrl;

    await this.cadetsRepository.updateCadet(cadet);
  }
}
