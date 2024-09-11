import { Injectable } from '@nestjs/common';
import { BocalsRepository } from './bocals.repository';
import { Bocals } from 'src/domain/typeorm/entity/bocal.entity';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { ROLES } from '../auth/enum/roles.enum';

@Injectable()
export class BocalsService {
  constructor(private bocalsRepository: BocalsRepository) {}

  async findByIntra(intraId: string): Promise<Bocals> {
    return await this.bocalsRepository.findByIntra(intraId);
  }

  async createUser(intraId: string): Promise<JwtInfo> {
    const bocal = await this.bocalsRepository.createUser(intraId);

    return {
      id: bocal.id,
      intraId: bocal.intraId,
      role: ROLES.BOCAL,
    };
  }

  async updateLogin(bocal: Bocals, intraId: string): Promise<JwtInfo> {
    const updatedbocal = await this.bocalsRepository.updateIntraId(
      bocal,
      intraId,
    );

    return {
      id: updatedbocal.id,
      intraId: updatedbocal.intraId,
      role: ROLES.BOCAL,
    };
  }
}
