import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ROLES } from '../auth/enum/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ReportsService } from './reports.service';
import { ReportDto } from './dto/report.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { UpdateReportDto } from './dto/update-report.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { userImagePath } from 'src/app.module';
import { extname } from 'path';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  /*
   *  最初、私のメンタリングーMentorページで報告書作成というボタンを押す時にサーバーで基本報告書を生成するAPI
   *  既存コード：サービスのロジックをレポジトリとサービスで分離、ORMのCreateメソッドの代わりに、オブジェクトを生成する方法に変更
   */
  @Post(':mentoringLogId')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async createReport(
    @Param('mentoringLogId') mentoringLogId: string,
  ): Promise<string> {
    return await this.reportsService.createReport(mentoringLogId);
  }

  /*
   *  最初、報告書ページで作成できたデータを送るAPI
   *  既存コード：サービスのロジックをレポジトリとサービスで分離
   */
  @Get(':reportId')
  @Roles([ROLES.MENTOR, ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async getReport(@Param('reportId') reportId: string): Promise<ReportDto> {
    return await this.reportsService.getReport(reportId);
  }

  /*
   *  レポートをテータを臨時保存と最終的に保存、精算するAPI
   *  既存コード
   *  - サービスのロジックをレポジトリとサービスで分離
   *  - トランザクションロジック追加
   *  - メンタリング時刻が文字列からDate型に変わるロジック追加とコメント追加
   *  （配列でDataに変わる文字列が入る場合はclass-validateが動作していない）
   */
  @Patch(':reportId')
  @Roles([ROLES.MENTOR, ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async updateReport(
    @Param('reportId') reportId: string,
    @User() user: JwtInfo,
    @Body() body: UpdateReportDto,
  ): Promise<boolean> {
    //レポートが存在有無と修正する権限のバーリデーションする、なければ、例外が発生する
    await this.reportsService.validateAuthorization(user, reportId);
    return await this.reportsService.updateReport(reportId, body, user);
  }

  /*
   *  レポートのメンタリング照明写真、署名をアップロードAPI
   *  既存コード
   *  - S3を利用せずに、サーバーにdiskに保存（次回にs3に更新する予定あり）
   *  - diskに保存するため、イメージをstaticに接近させるServeStaticModule追加
   *  - enum FileSavePathのパスにデータ保存
   *  - データベースにはサーバーのURLは除いで保存しているので、GetのAPIからサーバーのURLを追加が必要
   *  - データベースに保存した後、URLが更新される場合を防止
   */
  @Patch(':reportId/picture')
  @Roles([ROLES.MENTOR, ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'signature', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            cb(null, userImagePath);
          },
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            const filename = `${randomName}${extname(file.originalname)}`;
            cb(null, filename);
          },
        }),
        limits: {
          fileSize: 3000000,
        },
        fileFilter: (req, file, cb) => {
          if (!file.mimetype.startsWith('image/')) {
            cb(
              new Error('イメージファイルだけアップロードが可能です。'),
              false,
            );
          } else {
            cb(null, true);
          }
        },
      },
    ),
  )
  async updatePicture(
    @Param('reportId') reportId: string,
    @User() user: JwtInfo,
    @UploadedFiles()
    files: {
      image: Express.Multer.File[];
      signature: Express.Multer.File[];
    },
  ): Promise<boolean> {
    //レポートが存在有無と修正する権限のバーリデーションする、なければ、例外が発生する
    await this.reportsService.validateAuthorization(user, reportId);

    await this.reportsService.uploadImageAndSignature(
      reportId,
      files.image ? files.image[0] : undefined,
      files.signature ? files.signature[0] : undefined,
    );

    return true;
  }

  /*
   *  アップロードしたレポートのメンタリング照明写真、署名を削除するAPI
   *  APIクエリのパタン：${reportId}/picture?image=${imageIndex}&signature=true
   *  既存コード
   *  - S3を利用せずに、サーバーにdiskに保存（次回にs3に更新する予定あり）
   *  - diskに保存するため、イメージをstaticに接近させるServeStaticModule追加
   *  - 取り除いてからプロントでまたGetAPIを呼び出す仕組み
   */
  @Delete(':reportId/picture')
  @Roles([ROLES.MENTOR, ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async deletePicture(
    @Param('reportId') reportId: string,
    @User() user: JwtInfo,
    @Query('signature') signature: string,
    @Query('image') imageIndex: number,
  ) {
    //レポートが存在有無と修正する権限のバーリデーションする、なければ、例外が発生する
    await this.reportsService.validateAuthorization(user, reportId);

    return this.reportsService.deleteImageAndSignature(
      reportId,
      imageIndex,
      signature,
    );
  }
}
