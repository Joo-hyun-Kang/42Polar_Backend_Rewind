import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bocals } from 'src/domain/typeorm/entity/bocal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BocalsRepository {
  constructor(
    @InjectRepository(Bocals)
    private bocalsRepository: Repository<Bocals>,
  ) {}

  async findByIntra(intraId: string): Promise<Bocals> {
    try {
      const foundUser: Bocals = await this.bocalsRepository.findOneBy({
        intraId,
      });
      return foundUser;
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }
  }

  async createUser(intraId: string): Promise<Bocals> {
    try {
      const createdMentors: Bocals = this.bocalsRepository.create({
        intraId: intraId,
      });

      await this.bocalsRepository.save(createdMentors);

      return createdMentors;
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }
  }

  async updateIntraId(bocal: Bocals, intraId: string): Promise<Bocals> {
    bocal.intraId = intraId;
    return await this.bocalsRepository.save(bocal);
  }
}
