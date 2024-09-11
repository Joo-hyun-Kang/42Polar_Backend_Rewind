import { Injectable } from '@nestjs/common';
import { CadetsRepository } from './cadets.repository';
import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { CreateCadetDto } from './dto/create-cadet.dto';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { ROLES } from '../auth/enum/roles.enum';

@Injectable()
export class CadetsService {
  constructor(private cadetsRepository: CadetsRepository) {}

  async findCadetByIntraId(intraId: string): Promise<Cadets> {
    return await this.cadetsRepository.findByIntra(intraId);
  }

  async createUser(userinfo: CreateCadetDto): Promise<JwtInfo> {
    const createdCadet = await this.cadetsRepository.createUser(userinfo);

    return {
      id: createdCadet.id,
      intraId: createdCadet.intraId,
      role: ROLES.CADET,
    };
  }

  async updateLogin(cadet: Cadets, newData: CreateCadetDto): Promise<JwtInfo> {
    cadet.intraId = newData.intraId;
    cadet.profileImage = newData.profileImage;
    cadet.isCommon = newData.isCommon;
    cadet.email = newData.email;

    const updateCadet = await this.cadetsRepository.updateCadet(cadet);
    return {
      id: updateCadet.id,
      intraId: updateCadet.intraId,
      role: ROLES.CADET,
    };
  }

  validateInfo(cadet: Cadets): boolean {
    if (!cadet.name) {
      return false;
    }
    return true;
  }
}
