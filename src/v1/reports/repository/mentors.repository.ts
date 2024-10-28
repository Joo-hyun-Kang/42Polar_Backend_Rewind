import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MentorsRepository {
  constructor(
    @InjectRepository(Mentors)
    private mentorsRepository: Repository<Mentors>,
  ) {}

  async getMentorsAll(intraId: string): Promise<Mentors> {
    let mentor: Mentors;
    try {
      mentor = await this.mentorsRepository.findOneBy({
        intraId: intraId,
      });
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!mentor) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return mentor;
  }

  async findByIntra(intraId: string): Promise<Mentors> {
    let foundUser: Mentors;

    try {
      foundUser = await this.mentorsRepository.findOneBy({
        intraId,
      });
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!foundUser) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return foundUser;
  }

  async createUser(intraId: string): Promise<Mentors> {
    try {
      const createdMentors: Mentors = this.mentorsRepository.create({
        intraId: intraId,
        isActive: false,
      });

      const updatedMentor = await this.mentorsRepository.save(createdMentors);

      return updatedMentor;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }

  async save(mentor: Mentors): Promise<boolean> {
    try {
      await this.mentorsRepository.save(mentor);

      return true;
    } catch (err) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SAVE);
    }
  }

  async findMentorWithMentorKeywords(intraId: string): Promise<Mentors> {
    let mentors: Mentors;

    try {
      mentors = await this.mentorsRepository.findOne({
        relations: ['mentorKeywords', 'mentorKeywords.keywords'],
        where: { intraId: intraId },
      });
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!mentors) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return mentors;
  }
}
