import { DataSource, In, Not } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Reports } from '../../entity/reports.entity';
import { LOG_STATUS, MentoringLogs } from '../../entity/mentoring-logs.entity';

export class ReportsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const reportRepository = dataSource.getRepository(Reports);
    const mentoringLogsRepository = dataSource.getRepository(MentoringLogs);

    console.log('Seeding reports...');

    const reportsFactory = await factoryManager.get(Reports);
    const reportsMentoingLogs = await reportRepository.find({
      relations: {
        mentoringLogs: true,
      },
      select: {
        mentoringLogs: {
          id: true,
        },
      },
    });

    const reportsMentoingLogsRoom = reportsMentoingLogs.map(report => {
      if (report.mentoringLogs?.id) {
        return report.mentoringLogs.id;
      }
    });
    const mentoringLogsMeta = await mentoringLogsRepository.find({
      relations: {
        cadets: true,
        mentors: true,
      },
      where: {
        id: Not(In(reportsMentoingLogsRoom)),
        status: LOG_STATUS.DONE,
      },
      take: 30,
    });
    if (mentoringLogsMeta.length === 0) {
      console.error('No mentoring logs found');
      return;
    }

    const reports = await Promise.all(
      mentoringLogsMeta.map(async e => {
        return await reportsFactory.make({
          mentoringLogs: e,
          cadets: e.cadets,
          mentors: e.mentors,
        });
      }),
    );

    await reportRepository.save(reports);
  }
}
