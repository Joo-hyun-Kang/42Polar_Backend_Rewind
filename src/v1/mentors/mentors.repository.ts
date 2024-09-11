import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MentorsRepository {
  constructor(
    @InjectRepository(Mentors)
    private mentorsRepository: Repository<Mentors>,
  ) {}

  async findByIntra(intraId: string): Promise<Mentors> {
    try {
      const foundUser: Mentors = await this.mentorsRepository.findOneBy({
        intraId,
      });
      return foundUser;
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }
  }

  async createUser(intraId: string): Promise<Mentors> {
    try {
      const createdMentors: Mentors = this.mentorsRepository.create({
        intraId: intraId,
        isActive: false,
      });

      await this.mentorsRepository.save(createdMentors);

      return createdMentors;
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }
  }
}
