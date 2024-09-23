import { Injectable } from '@nestjs/common';
import { KeywordsRepository } from './repository/keywords.repository';
import { MentorsListElement } from './dto/mentors-list-element.interface';
import { Keywords } from 'src/domain/typeorm/entity/keywords.entity';

@Injectable()
export class KeywordsService {
  constructor(private keywordsRepository: KeywordsRepository) {}

  async getMentorsByKeywords(
    keywords: string[],
    MentorNameOrIntraId: string,
  ): Promise<MentorsListElement[]> {
    return await this.keywordsRepository.getMentorsByKeywords(
      keywords,
      MentorNameOrIntraId,
    );
  }

  async getKeywords(keywords: string[]): Promise<Keywords[]> {
    return this.keywordsRepository.getKeywords(keywords);
  }
}
