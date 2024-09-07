import { Injectable } from '@nestjs/common';
import { MentorsRepository } from './repository/mentors.repository';
import { MentorDto } from './dto/mentor.dto';

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
}
