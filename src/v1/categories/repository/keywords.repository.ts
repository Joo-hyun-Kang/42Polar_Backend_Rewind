import { InjectRepository } from '@nestjs/typeorm';
import { Keywords } from 'src/domain/typeorm/entity/keywords.entity';
import { In, Repository } from 'typeorm';
import { MentorsListElement } from '../dto/mentors-list-element.interface';
import { ConflictException, NotFoundException } from '@nestjs/common';

export class KeywordsRepository {
  constructor(
    @InjectRepository(Keywords)
    private readonly keywordsRepository: Repository<Keywords>,
  ) {}

  /*
   * クエリでメンターごとにキーワードをまとめて取得
   * isActiveメンターが後ろ、選ばれたメンターあれば、フィルター
   * 既存コード：データベースクエリ４度を１度に減らす
   */
  async getMentorsByKeywords(
    keywords: string[],
    requestMentorNameOrIntraId: string,
  ): Promise<MentorsListElement[]> {
    const queryBuilder = this.keywordsRepository
      .createQueryBuilder('keywords')
      .innerJoin('keywords.mentorKeywords', 'mentorKeywords')
      .innerJoin('mentorKeywords.mentors', 'mentors')
      .where('keywords.name IN (:...keywords)', { keywords });

    // requestMentorNameOrIntraIdが指定されている場合、名前またはintraIdでフィルタリング
    if (requestMentorNameOrIntraId) {
      queryBuilder.andWhere(
        '(mentors.name like :requestMentorNameOrIntraId OR mentors.intraId LIKE :requestMentorNameOrIntraId)',
        {
          requestMentorNameOrIntraId: `%${requestMentorNameOrIntraId}%`,
        },
      );
    }

    const results = await queryBuilder
      .select([
        'mentors.id AS "mentorsid"',
        'mentors.name AS "mentorsname"',
        'mentors.intraId AS "mentorsintraid"',
        'mentors.profileImage AS "mentorsprofileimage"',
        'mentors.tags AS "mentorstags"',
        'mentors.introduction AS "mentorsintroduction"',
        'mentors.isActive AS "mentorsisactive"',
        'ARRAY_AGG(keywords.name) AS "keywordsname"', // キーワードを配列にまとめる
      ])
      .groupBy('mentors.id') // メンターごとにグループ化
      .orderBy('mentors.isActive', 'DESC') // isActiveなメンターを上に
      .getRawMany();

    return results.map((value) => ({
      mentor: {
        id: value.mentorsid,
        name: value.mentorsname,
        intraId: value.mentorsintraid,
        tags: value.mentorstags,
        profileImage: value.mentorsprofileimage,
        introduction: value.mentorsintroduction,
        isActive: value.mentorsisactive,
      },
      keywords: value.keywordsname,
    }));
  }

  async getKeywords(keywords: string[]): Promise<Keywords[]> {
    let keywordsEntity;

    try {
      keywordsEntity = await this.keywordsRepository.find({
        where: {
          name: In(keywords),
        },
      });
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!keywordsEntity) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return keywordsEntity;
  }
}
