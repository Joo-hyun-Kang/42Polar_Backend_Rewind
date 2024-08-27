import { MigrationInterface, QueryRunner } from "typeorm";

export class Polar1724756766125 implements MigrationInterface {
    name = 'Polar1724756766125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "extraCadets" character varying(500), "place" character varying(100), "topic" character varying(150), "content" character varying(800), "imageUrl" character varying(1000) array DEFAULT '{}', "signatureUrl" character varying(1000), "feedbackMessage" character varying(800), "feedback1" smallint, "feedback2" smallint, "feedback3" smallint, "money" integer, "status" "public"."reports_status_enum" NOT NULL DEFAULT '作成不可', "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "mentoringLogsId" uuid, "mentorsId" uuid, "cadetsId" uuid, CONSTRAINT "REL_79399a0043e313196d3d125093" UNIQUE ("mentoringLogsId"), CONSTRAINT "PK_d9013193989303580053c0b5ef6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentoring_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "meetingAt" TIMESTAMP WITH TIME ZONE array, "meetingStart" TIMESTAMP WITH TIME ZONE, "topic" character varying(100) NOT NULL, "content" character varying(1000) NOT NULL, "status" "public"."mentoring_logs_status_enum" NOT NULL DEFAULT 'お待ち中', "rejectMessage" character varying(500), "requestTime1" TIMESTAMP WITH TIME ZONE array NOT NULL, "requestTime2" TIMESTAMP WITH TIME ZONE array, "requestTime3" TIMESTAMP WITH TIME ZONE array, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "mentorsId" uuid, "cadetsId" uuid, CONSTRAINT "PK_33e90fb8f8903523648041037a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cadets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "intraId" character varying(15) NOT NULL, "name" character varying(50), "profileImage" character varying(1000), "resumeUrl" character varying(1000), "isCommon" boolean NOT NULL, "email" character varying(100) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f4dfe45a6458152583c442e30cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(300) NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "mentorsId" uuid, "cadetsId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "intraId" character varying(50) NOT NULL, "slackId" character varying(100), "name" character varying(50), "email" character varying(100), "company" character varying(100), "duty" character varying(100), "profileImage" character varying(100), "availableTime" character varying, "introduction" character varying(150), "tags" character varying(150) array, "isActive" boolean NOT NULL, "markdownContent" text, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_67a614446eab992e4d0580afebf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentor_keywords" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "keywordsId" uuid, "mentorsId" uuid, CONSTRAINT "PK_795674f0edfa1dfb30a231cf223" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "keywords" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_3b06f22a51417a28bacbefac1fd" UNIQUE ("name"), CONSTRAINT "PK_4aa660a7a585ed828da68f3c28e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "keyword_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "keywordsId" uuid, "categoriesId" uuid, CONSTRAINT "PK_fb02941a9ed7504ece66a1f21ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bocals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(10), "intraId" character varying(50) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fc425bc67545ad0e82ed96e8995" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_79399a0043e313196d3d1250930" FOREIGN KEY ("mentoringLogsId") REFERENCES "mentoring_logs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_d95c4fb0f5511ba73bc03fafe1c" FOREIGN KEY ("mentorsId") REFERENCES "mentors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reports" ADD CONSTRAINT "FK_896fcb0ac8133f39b19a0ae4d08" FOREIGN KEY ("cadetsId") REFERENCES "cadets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_logs" ADD CONSTRAINT "FK_f0f2a83fd6179b82ce1780d74e2" FOREIGN KEY ("mentorsId") REFERENCES "mentors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentoring_logs" ADD CONSTRAINT "FK_c8b0f9a3c0025b11c3d34ee8c7d" FOREIGN KEY ("cadetsId") REFERENCES "cadets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e71af7b6a90d91b732ab35d867c" FOREIGN KEY ("mentorsId") REFERENCES "mentors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_95dcb3d9d301b383a05b96c979b" FOREIGN KEY ("cadetsId") REFERENCES "cadets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentor_keywords" ADD CONSTRAINT "FK_d6bd51b865f950ebeef9a5c4ce9" FOREIGN KEY ("keywordsId") REFERENCES "keywords"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentor_keywords" ADD CONSTRAINT "FK_216889c3342ad6e52c75f86f982" FOREIGN KEY ("mentorsId") REFERENCES "mentors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "keyword_categories" ADD CONSTRAINT "FK_90e6440d3853117f653737b39f5" FOREIGN KEY ("keywordsId") REFERENCES "keywords"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "keyword_categories" ADD CONSTRAINT "FK_c5af47b413d6923c905aeafea77" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "keyword_categories" DROP CONSTRAINT "FK_c5af47b413d6923c905aeafea77"`);
        await queryRunner.query(`ALTER TABLE "keyword_categories" DROP CONSTRAINT "FK_90e6440d3853117f653737b39f5"`);
        await queryRunner.query(`ALTER TABLE "mentor_keywords" DROP CONSTRAINT "FK_216889c3342ad6e52c75f86f982"`);
        await queryRunner.query(`ALTER TABLE "mentor_keywords" DROP CONSTRAINT "FK_d6bd51b865f950ebeef9a5c4ce9"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_95dcb3d9d301b383a05b96c979b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e71af7b6a90d91b732ab35d867c"`);
        await queryRunner.query(`ALTER TABLE "mentoring_logs" DROP CONSTRAINT "FK_c8b0f9a3c0025b11c3d34ee8c7d"`);
        await queryRunner.query(`ALTER TABLE "mentoring_logs" DROP CONSTRAINT "FK_f0f2a83fd6179b82ce1780d74e2"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_896fcb0ac8133f39b19a0ae4d08"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_d95c4fb0f5511ba73bc03fafe1c"`);
        await queryRunner.query(`ALTER TABLE "reports" DROP CONSTRAINT "FK_79399a0043e313196d3d1250930"`);
        await queryRunner.query(`DROP TABLE "bocals"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "keyword_categories"`);
        await queryRunner.query(`DROP TABLE "keywords"`);
        await queryRunner.query(`DROP TABLE "mentor_keywords"`);
        await queryRunner.query(`DROP TABLE "mentors"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "cadets"`);
        await queryRunner.query(`DROP TABLE "mentoring_logs"`);
        await queryRunner.query(`DROP TABLE "reports"`);
    }

}
