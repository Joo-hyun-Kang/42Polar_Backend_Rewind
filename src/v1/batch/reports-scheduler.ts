import { Injectable } from '@nestjs/common';
import { BatchService } from './batch.service';

@Injectable()
export class ReportsScheduler {
  constructor(private readonly batchService: BatchService) {}

  //サーバーが実行した後１回、呼び出す
  onModuleInit() {
    this.batchService.updateReportMoney();
  }
}
