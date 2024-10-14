import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from 'src/domain/typeorm/entity/reports.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsRepository {
  constructor(
    @InjectRepository(Reports)
    private readonly reportRepository: Repository<Reports>,
  ) {}

  async save(report: Reports): Promise<Reports> {
    let result = null;

    try {
      result = await this.reportRepository.save(report);
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SAVE);
    }

    return result;
  }
}
