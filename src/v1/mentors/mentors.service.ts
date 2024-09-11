import { Injectable } from '@nestjs/common';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { MentorsRepository } from './mentors.repository';
import { AvailableTimeDto } from './dto/available-time.dto';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { ROLES } from '../auth/enum/roles.enum';

@Injectable()
export class MentorsService {
  constructor(private mentorsRepository: MentorsRepository) {}

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
}
