import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cadets } from '../../domain/typeorm/entity/cadets.entity';
import { Repository } from 'typeorm';
import { CreateCadetDto } from './dto/create-cadet.dto';

@Injectable()
export class CadetsRepository {
  constructor(
    @InjectRepository(Cadets)
    private cadetsRepository: Repository<Cadets>,
  ) {}

  async findByIntra(intraId: string): Promise<Cadets> {
    let foundUser: Cadets;

    try {
      foundUser = await this.cadetsRepository.findOneBy({
        intraId,
      });
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }

    if (!foundUser) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return foundUser;
  }

  async createUser(cadetDto: CreateCadetDto): Promise<Cadets> {
    try {
      const createdCadte: Cadets = this.cadetsRepository.create({
        intraId: cadetDto.intraId,
        profileImage: cadetDto.profileImage,
        isCommon: cadetDto.isCommon,
        email: cadetDto.email,
      });

      const updateCadet = await this.cadetsRepository.save(createdCadte);

      return updateCadet;
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }
  }

  async updateCadet(updatedCadet: Cadets): Promise<Cadets> {
    try {
      return await this.cadetsRepository.save(updatedCadet);
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }
  }
}
