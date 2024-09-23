import { Injectable } from '@nestjs/common';
import { MentorKeywordsRepository } from './repository/mentorKeywords.repository';
import { Keywords } from 'src/domain/typeorm/entity/keywords.entity';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { MentorKeywords } from 'src/domain/typeorm/entity/mentorKeywords.entity';

@Injectable()
export class MentorKeywordsService {
  constructor(
    private readonly mentorKeywordsRepository: MentorKeywordsRepository,
  ) {}

  async updateMentorToKeywords(
    mentor: Mentors,
    keywords: Keywords[],
  ): Promise<boolean> {
    await this.mentorKeywordsRepository.deleteAllForMentor(mentor.id);

    return keywords
      ? this.mentorKeywordsRepository.insertMentorToKeywords(mentor, keywords)
      : true;
  }

  async getMentorKeywords(mentorIntra: string): Promise<MentorKeywords[]> {
    return this.mentorKeywordsRepository.getMentorKeywords(mentorIntra);
  }

  async getKeywords(mentorKeywords: MentorKeywords[]): Promise<Keywords[]> {
    return Promise.all(
      mentorKeywords.map(async (e) => {
        return await e.keywords;
      }),
    );
  }
}
