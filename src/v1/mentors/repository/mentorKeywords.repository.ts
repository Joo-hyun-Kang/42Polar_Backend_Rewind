import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/domain/typeorm/entity/keywords.entity';
import { MentorKeywords } from 'src/domain/typeorm/entity/mentorKeywords.entity';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { Repository } from 'typeorm';

export class MentorKeywordsRepository {
  constructor(
    @InjectRepository(MentorKeywords)
    private readonly mentorKeywordsRepository: Repository<MentorKeywords>,
  ) {}

  async deleteAllForMentor(mentorId: string): Promise<boolean> {
    try {
      const queryBuilder = this.mentorKeywordsRepository.createQueryBuilder();

      await queryBuilder
        .delete()
        .from(MentorKeywords)
        .where('mentors = :id', { id: mentorId })
        .execute();
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_DELETE);
    }

    return true;
  }

  async insertMentorToKeywords(
    mentor: Mentors,
    keywords: Keywords[],
  ): Promise<boolean> {
    try {
      const mentorKeywords = keywords.map((keyword) => {
        const mentorKeywords = new MentorKeywords();
        mentorKeywords.mentors = Promise.resolve(mentor);
        mentorKeywords.keywords = Promise.resolve(keyword);
        return mentorKeywords;
      });

      const queryBuilder = this.mentorKeywordsRepository.createQueryBuilder();

      await queryBuilder
        .insert()
        .into(MentorKeywords)
        .values(mentorKeywords)
        .execute();
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_SAVE);
    }

    return true;
  }

  async getMentorKeywords(mentorIntra: string): Promise<MentorKeywords[]> {
    let mentorKeywords: MentorKeywords[];

    try {
      mentorKeywords = await this.mentorKeywordsRepository.find({
        relations: { mentors: true, keywords: true },
        select: {},
        where: { mentors: { intraId: mentorIntra } },
      });
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!mentorKeywords) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return mentorKeywords;
  }
}
