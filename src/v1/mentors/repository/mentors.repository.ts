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
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION);
    }

    if (!mentor) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return mentor;
  }
}
