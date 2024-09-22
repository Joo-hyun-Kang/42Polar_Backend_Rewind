import { Injectable } from '@nestjs/common';
import { KeywordsRepository } from './repository/keywords.repository';
import { MentorsListElement } from './dto/mentors-list-element.interface';

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
}
