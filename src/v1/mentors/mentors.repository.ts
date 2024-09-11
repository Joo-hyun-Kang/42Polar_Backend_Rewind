import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { Repository } from 'typeorm';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { fa } from '@faker-js/faker';

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
      const createdMentors: Mentors = await this.mentorsRepository.create({
        intraId: intraId,
        isActive: false,
      });

      return createdMentors;
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }
  }
}
