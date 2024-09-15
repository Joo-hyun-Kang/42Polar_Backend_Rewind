import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bocals } from '../../../domain/typeorm/entity/bocal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BocalsRepository {
  constructor(
    @InjectRepository(Bocals)
    private bocalsRepository: Repository<Bocals>,
  ) {}

  async findByIntra(intraId: string): Promise<Bocals> {
    let foundUser: Bocals;

    try {
      foundUser = await this.bocalsRepository.findOneBy({
        intraId,
      });
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!foundUser) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return foundUser;
  }

  async createUser(intraId: string): Promise<Bocals> {
    try {
      const createdBocals: Bocals = this.bocalsRepository.create({
        intraId: intraId,
      });

      const updatedBocal = await this.bocalsRepository.save(createdBocals);

      return updatedBocal;
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }

  async updateIntraId(bocal: Bocals, intraId: string): Promise<Bocals> {
    bocal.intraId = intraId;

    try {
      return await this.bocalsRepository.save(bocal);
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }
}
