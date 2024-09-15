import { BadRequestException, Injectable } from '@nestjs/common';
import { MentorsRepository } from './repository/mentors.repository';
import { MentorDto } from './dto/mentor.dto';
import { NotFoundException } from '@nestjs/common';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { AvailableTimeDto } from './dto/available-time.dto';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { ROLES } from '../auth/enum/roles.enum';
import { UpdateMentorDatailDto } from './dto/mentor-detail.dto';

@Injectable()
export class MentorsService {
  constructor(private mentorsRepository: MentorsRepository) {}

  async getMentorDetails(intraId: string): Promise<MentorDto> {
    const mentor = await this.mentorsRepository.getMentorsAll(intraId);
    const mentorsDto = {
      id: mentor.id,
      intraId: mentor.intraId,
      slackId: mentor.slackId || '',
      name: mentor.name || '',
      email: mentor.email || '',
      company: mentor.company || '',
      duty: mentor.duty || '',
      profileImage: mentor.profileImage || '',
      availableTime: mentor.availableTime || '',
      introduction: mentor.introduction || '',
      tags: mentor.tags || [],
      isActive: mentor.isActive,
      markdownContent: mentor.markdownContent,
      createdAt: mentor.createAt,
      updatedAt: mentor.updateAt,
    };

    return mentorsDto;
  }

  async findByIntra(intraId: string): Promise<Mentors> {
    return await this.mentorsRepository.findByIntra(intraId);
  }

  async createUser(intraId: string): Promise<JwtInfo> {
    const mentor = await this.mentorsRepository.createUser(intraId);

    return {
      id: mentor.id,
      intraId: mentor.intraId,
      role: ROLES.MENTOR,
    };
  }

  validateInfo(mentor: Mentors): boolean {
    if (
      !mentor.slackId ||
      !mentor.email ||
      !mentor.name ||
      !mentor.duty ||
      !mentor.company
    ) {
      return false;
    }
    if (mentor.isActive) {
      if (!mentor.availableTime) {
        return false;
      }

      const week: AvailableTimeDto[][] = JSON.parse(mentor.availableTime);
      let join = false;

      week.forEach((day) => {
        if (day.length > 0) {
          join = true;
        }
      });

      return join;
    }

    return true;
  }

  async isMentor(intraId: string): Promise<boolean> {
    try {
      const mentor = await this.findByIntra(intraId);
      if (mentor) {
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

  async updateMentorDetails(
    intraId: string,
    infos: UpdateMentorDatailDto,
  ): Promise<boolean> {
    const {
      name,
      availableTime,
      slackId,
      isActive,
      markdownContent,
      introduction,
      tags,
      company,
      duty,
    } = infos;

    const foundUser: Mentors = await this.findByIntra(intraId);
    foundUser.name = name;
    foundUser.slackId = slackId;
    foundUser.isActive = isActive;
    foundUser.markdownContent = markdownContent;
    foundUser.tags = tags;
    foundUser.introduction = introduction;
    foundUser.company = company;
    foundUser.duty = duty;

    if (isActive) {
      if (!availableTime) {
        throw new BadRequestException(
          'メンタリング可能に設定する際には、利用可能な時間を入力する必要があります',
        );
      }
      foundUser.availableTime = JSON.stringify(
        this.validateAvailableTime(availableTime),
      );
    }

    return await this.mentorsRepository.save(foundUser);
  }

  validateAvailableTime(time: AvailableTimeDto[][]): AvailableTimeDto[][] {
    time.forEach((t) =>
      t.forEach((tt) => {
        if (!this.isValidTime(tt)) {
          throw new BadRequestException('正しくない時間形式です。');
        }
      }),
    );
    for (let day = 0; day < 7; day++) {
      const length = time[day].length;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (i == j) continue;
          this.validateTimeOverlap(time[day][i], time[day][j]);
        }
      }
    }
    return time;
  }

  isValidTime(time: AvailableTimeDto): boolean {
    if (
      !(time.startHour >= 0 && time.startHour < 24) ||
      !(time.startMinute === 0 || time.startMinute === 30) ||
      !(time.endHour >= 0 && time.endHour < 24) ||
      !(time.endMinute === 0 || time.endMinute === 30)
    ) {
      return false;
    }
    if (time.startHour >= time.endHour) {
      return false;
    }
    const endTotalMinute = time.endHour * 60 + time.endMinute;
    const startTotalMinute = time.startHour * 60 + time.startMinute;
    if (endTotalMinute - startTotalMinute < 60) {
      return false;
    }
    return true;
  }

  validateTimeOverlap(time1: AvailableTimeDto, time2: AvailableTimeDto) {
    if (time1.startHour <= time2.startHour && time1.endHour > time2.startHour) {
      throw new BadRequestException('時間の重複が存在します。');
    }
    if (
      time1.endHour === time2.startHour &&
      time1.endMinute === 30 &&
      time2.startMinute === 0
    ) {
      throw new BadRequestException('時間の重複が存在します。');
    }
    if (time2.startHour <= time1.startHour && time2.endHour > time1.startHour) {
      throw new BadRequestException('時間の重複が存在します。');
    }
    if (
      time2.endHour === time1.startHour &&
      time2.endMinute === 30 &&
      time1.endMinute === 0
    ) {
      throw new BadRequestException('時間の重複が存在します。');
    }
  }
}
