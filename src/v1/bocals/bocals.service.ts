import { Injectable, NotFoundException } from '@nestjs/common';
import { Bocals } from 'src/domain/typeorm/entity/bocal.entity';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { ROLES } from '../auth/enum/roles.enum';
import { BocalsRepository } from './repository/bocals.repository';

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

  async isBocal(intraId: string): Promise<boolean> {
    try {
      const bocal = await this.findByIntra(intraId);
      if (bocal) {
        return true;
      }
      return false;
    } catch (error) {
      // NotFoundException の場合だけ例外をキャッチ
      if (error instanceof NotFoundException) {
        return false;
      }

      // 他の例外はそのまま投げる
      throw error;
    }
  }
}
