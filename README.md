
# 42_polar_backend_Rewind 🚀


## 概要 ✨

**42_polar_backend_Rewind**は、42Seoul の学生向けに提供するオンラインメンタリングプラットフォームのバックエンドを再構築したプロジェクトです。既存のバックエンドコードを改善し、ディレクトリ構造の整理、データ Seeding、MVC 構造の強化、API 性能向上を目指しました。このプロジェクトは、過去にチームで開発したプロジェクトをゼロから再構築し、改善点を補強しながらバックエンド技術を習得することを目的としています。

<br>

## 主な技術スタック 🛠️

- **言語**: TypeScript, NestJS
- **データベース**: PostgreSQL, TypeORM
- **インフラ・ツール**: Docker, Redis, Git
- **プロジェクト管理**: Git Issue、Notion(文書化)

<br>

## 42polar サービス 🐣

> 5.1 メインページ
> 
> 
> <img src="https://github.com/user-attachments/assets/9df6f04d-75fb-4b33-b08a-42e45455ce92" width="70%" height="70%" />

> 
> - 希望する分野を選択できます
> - お知らせと利用方法を確認できます <br>

<br>

> 5.2 メンターリスト
>
> 
>  <img width="70%" height="70%" src="https://github.com/user-attachments/assets/24decf3f-97ac-4e90-8e0d-a5bb1ad6aa81"/>
> 
> - カテゴリー別のメンターを見ることができます
> - 現在メンタリングを行っているメンターを一覧で確認できます <br>

<br>

> 5.3 メンターディテール
> 
> 
> <img src="https://github.com/user-attachments/assets/81426e01-0b07-4fb0-8be4-889ec59d7976" width="70%" height="70%" /> 
> 
> - メンターのスケジュールを確認できます
> - メンターの詳細紹介を見ることができます
> - メンターのレビューを確認できます <br>

<br>

> 5.4 申請
>
>
> <img src="https://github.com/user-attachments/assets/116743a4-ed18-4a41-85fb-03e57eaf9a10" width="70%" height="70%" /> <img src="https://github.com/user-attachments/assets/80e8b4b3-be0d-436a-b031-c3f48be2c83d" width="70%" height="70%" />
> 
> - 希望するメンターのスケジュールに合わせてメンタリングを申し込むことができます
> - 最大3つのリクエスト時間を選択できます <br>

<br>

> 5.5 メンタリング - カデット
> 
> 

> <img src="https://github.com/user-attachments/assets/3242d236-d731-4089-b67d-0664a3712daf" width="70%" height="70%" /> <img src="https://github.com/user-attachments/assets/157831ef-bd1a-496d-a90f-6ae0fdf099bd" width="70%" height="70%" />
> 
> - 申請したメンタリング記録を確認できます
> - 拒否された場合は、その理由も確認できます <br>

<br>

> 5.6 メンタリング - メンター
> 
> 
> <img src="https://github.com/user-attachments/assets/9e51eab5-375d-453f-9ac0-8eab65878404" width="70%" height="70%" /> <img src="https://github.com/user-attachments/assets/f7835b3c-168f-4eb0-bd91-1f3addd35682" width="70%" height="70%" /> 
> 
> - これまでのメンタリングの確認、受諾、拒否などが可能です
> - 報告書を簡単に作成して提出できます <br>

<br>

> 5.7 ボカル(運営陣）
>
> <img src="https://github.com/user-attachments/assets/7d3a6a4c-3f7d-4c1f-aa38-6db82ffbf05e" width="70%" height="70%" /> <img src="https://github.com/user-attachments/assets/b42801e8-2d7f-4fed-a89e-6518df5f185a" width="70%" height="70%" /> 
> 
> - メンタリング記録をエクセルに保存できます
> - 報告書の確認と印刷が可能です

<br>


## サーバーの主な機能 🚀

- **認証と認可機能**

  - 42OAuth を利用した認証を提供し、ユーザーのセッション管理やアクセス制御を実現。
  - JWT トークンを用いた認証により、役割ごとのアクセス管理を行います。

- **メンタリングマッチング機能**

  - メンター検索やカテゴリー別のフィルタリングを提供。
  - 予約システムには、予約申し込み、メール通知、状態変更、無応答時の自動取消機能（48 時間経過後のバッチ処理）があります。

- **メンタリング管理**

  - メンターとカデットの間でメンタリングを円滑に進めるための申し込み、承認、管理機能を提供。
  - 各メンタリングセッションの履歴管理および状態更新機能を備えています。

- **報告書管理機能**

  - メンタリングに関連する報告書を作成、編集、閲覧するための CRUD 機能を提供。
  - 報告書データを Excel ファイルとしてエクスポートする機能があります。

- **会員登録およびメール認証**

  - 安全な登録を実現するため、メール認証機能を実装しています。

- **Bocal（運営管理者）向け機能**
  - データ管理や報告書のフィルタリング、状態更新機能を提供します。

<br>

## 実装内容と改善点 🚀

### 1. DataSource 共有

- **目的**: NestJS アプリケーションの設定と Seeding・マイグレーションで共通の DataSource を使用し、コードの一貫性を保つ。
- **概要**: `basicOption` などの共通設定をスプレッド構文で共有し、NestJS の設定とマイグレーション設定が統一されるよう管理。
- **詳細ドキュメント**: [リンク](https://www.notion.so/DataSoure-Nest-TypeOrm-561e55ff3ad44508b53ef742b36b55db)

<br>

### 2. 開発データの Seeding 機能

- **目的**: 開発時のサンプルデータを自動的に挿入するための機能。
- **概要**:
  - TypeORM Extension を用いてエンティティ用のファクトリーを作成し、必要なデータを作成・挿入します。
  - Excel 依存から脱却し、データファイルをコードと一緒に管理するように改善。
- **詳細ドキュメント**: [リンク](https://www.notion.so/Seeding-7217d462a6ee4e30baa68942c38a2f00#166a026908b2471bb5375b5a0b2e3952)

<br>

### 3. コントローラー、サービス、レポジトリの分離

- **目的**: コードの可読性と保守性を向上。
- **詳細**:
  - コントローラー内に混在していたビジネスロジックをサービス層に分離。
  - DB アクセスはレポジトリを通じてのみ行われ、サービスが直接レポジトリを操作しないように設計。

<br>

### 4. クエリ最適化

- **内容**: fetchJoin と QueryBuilder を活用して、データベースクエリの数を削減。
- **例**: `getMentorsByKeywords` メソッドの最適化。

  ```tsx
  /*
   * クエリでメンターごとにキーワードをまとめて取得
   * isActiveメンターが後ろ、選ばれたメンターあれば、フィルター
   * 既存コード：データベースクエリ４度を１度に減らす
   */
  const queryBuilder = this.keywordsRepository
    .createQueryBuilder('keywords')
    .innerJoin('keywords.mentorKeywords', 'mentorKeywords')
    .innerJoin('mentorKeywords.mentors', 'mentors')
    .where('keywords.name IN (:...keywords)', { keywords });

  // requestMentorNameOrIntraIdが指定されている場合、名前またはintraIdでフィルタリング
  if (requestMentorNameOrIntraId) {
    queryBuilder.andWhere(
      '(mentors.name like :requestMentorNameOrIntraId OR mentors.intraId LIKE :requestMentorNameOrIntraId)',
      {
        requestMentorNameOrIntraId: `%${requestMentorNameOrIntraId}%`,
      },
    );
  }

  const results = await queryBuilder
    .select([
      'mentors.id AS "mentorsid"',
      'mentors.name AS "mentorsname"',
      'mentors.intraId AS "mentorsintraid"',
      'mentors.profileImage AS "mentorsprofileimage"',
      'mentors.tags AS "mentorstags"',
      'mentors.introduction AS "mentorsintroduction"',
      'mentors.isActive AS "mentorsisactive"',
      'ARRAY_AGG(keywords.name) AS "keywordsname"', // キーワードを配列にまとめる
    ])
    .groupBy('mentors.id') // メンターごとにグループ化
    .orderBy('mentors.isActive', 'DESC')
    .getRawMany();
  ```

<br>

### 5. 遅延ローディングの適用

- **内容**: TypeORM の遅延ローディングを用い、Promise による効率的なリレーション管理を実現。
- **詳細ドキュメント**: [リンク](https://www.notion.so/e72c88ea3828462ca0839148ddff2f6e?pvs=21)

<br>

### 6. 非同期処理の最適化

- **内容**: `Promise.all` を活用して並列処理を最適化し、パフォーマンスを向上させました。

<br>

## 開発履歴 📜

### プルリクエストの記録

- **2024-11-09**: [Bocal（運営陣）の API 実装](https://github.com/Joo-hyun-Kang/42_polar_backend_Rewind/pull/28)
- **2024-10-29**: [報告書の API 実装](https://github.com/Joo-hyun-Kang/42_polar_backend_Rewind/pull/26)
- **2024-10-14**: [Mentor、Cadet ページの API 完成](https://github.com/Joo-hyun-Kang/42_polar_backend_Rewind/pull/24)
- **2024-09-30**: [メンタリング申し込み機能完成](https://github.com/Joo-hyun-Kang/42_polar_backend_Rewind/pull/22)
- その他の履歴は GitHub リポジトリのプルリクエストおよび Issues で管理しています。  
  [詳細を見る](https://github.com/Joo-hyun-Kang/42_polar_backend_Rewind/issues?q=is%3Aissue+is%3Aclosed)

<br>

## 追加リンク 🌐

- 学びの記録：[Notion リング](https://wide-yarrow-176.notion.site/Web-7034ee56eed74c35b69271ebf895c360?pvs=4)
- 和訳の既存リポジトリ:
  - [バックエンドフロントギットレポジトリ](https://github.com/42connected/polar-be)
  - [フロントギットレポジトリ](https://github.com/42connected/polar-fe)
- 韓国語の既存リポジトリ:
  - [バックエンドフロントギットレポジトリ](https://github.com/42connected/polar-be)
  - [フロントギットレポジトリ](https://github.com/42connected/polar-fe)
