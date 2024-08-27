interface MentorsEntityForSeeding {
  intraId: string;
  name: string;
  profileImage: string;
  introduction: string;
  availableTime: string;
  isActive: boolean;
  markdownContent: string;
}

interface MentorKeywords {
  mentor: MentorsEntityForSeeding;
  keywords: string[];
}

export const mentorKeywordsData: MentorKeywords[] = [
  {
    mentor: {
      intraId: 'm-kaito',
      name: '鈴木海斗',
      profileImage: 'https://example.com/profile_image01.png',
      introduction:
        'データサイエンス全般に精通し、AIと機械学習のプロジェクト経験が豊富。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0},{"startHour":10,"startMinute":0,"endHour":11,"endMinute":0}],[],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}]]',
      isActive: true,
      markdownContent: `
  ## **鈴木海斗**
  
  Slack : m-kaito
  
  自己紹介
  
  - データサイエンス全般に精通
  - AIと機械学習に関する多くのプロジェクト経験
  - LinkedIn: [https://www.linkedin.com/in/kaito-suzuki](https://www.linkedin.com/in/kaito-suzuki)
  
  主な分野
  
  - データ分析、機械学習、AI
  - ソフトウェアエンジニアリング、データ可視化
  
  外部活動
  
  - AI関連のカンファレンス講演
  - 日本データサイエンス学会メンバー
  
  主な経歴
  
  - 2020.01～現在 グローバルAI企業 データサイエンティスト
  - 2015.04～2019.12 日本のIT企業 AIエンジニア
  - 2010.06～2015.03 大学データサイエンス講師
        `,
    },
    keywords: [
      'AI',
      'データ分析',
      'バックエンド',
      'SWアーキテクチャ',
      'コード最適化',
    ],
  },
  {
    mentor: {
      intraId: 'm-hiroshi',
      name: '田中浩史',
      profileImage: 'https://example.com/profile_image02.png',
      introduction:
        'サイバーセキュリティの専門家で、企業のセキュリティインフラの構築と運用に豊富な経験。',
      availableTime:
        '[[],[],[],[],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}],[]]',
      isActive: true,
      markdownContent: `
  ## **田中浩史**
  
  Slack : m-hiroshi
  
  自己紹介
  
  - サイバーセキュリティの専門家
  - 企業のセキュリティインフラの構築と運用
  - Twitter: [https://twitter.com/hiroshi_tanaka](https://twitter.com/hiroshi_tanaka)
  
  主な分野
  
  - サイバーセキュリティ、脅威分析
  - ネットワークセキュリティ、情報セキュリティ
  
  外部活動
  
  - セキュリティ関連のセミナー講師
  - 日本セキュリティ協会の会員
  
  主な経歴
  
  - 2016.03～現在 グローバルIT企業 セキュリティアナリスト
  - 2010.07～2015.12 日本の企業 ITセキュリティエンジニア
  - 2005.01～2010.06 大学セキュリティ講師
        `,
    },
    keywords: [
      'セキュリティ',
      'ネットワーク',
      'オペレーティングシステム',
      'サーバー',
      'プロジェクト管理',
    ],
  },
  {
    mentor: {
      intraId: 'm-yoshida',
      name: '吉田誠',
      profileImage: 'https://example.com/profile_image03.png',
      introduction:
        'UX/UIデザインの専門家で、デジタルプロダクトのデザイン全般に精通。',
      availableTime:
        '[[],[],[],[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
  ## **吉田誠**
  
  Slack : m-yoshida
  
  自己紹介
  
  - ユーザーエクスペリエンスの専門家
  - UXデザインの全プロセスに関与
  - LinkedIn: [https://www.linkedin.com/in/makoto-yoshida](https://www.linkedin.com/in/makoto-yoshida)
  
  主な分野
  
  - UX/UIデザイン、ユーザビリティテスト
  - デジタルプロダクトデザイン
  
  外部活動
  
  - UXデザインカンファレンスのスピーカー
  - 日本UXデザイン協会の会員
  
  主な経歴
  
  - 2018.04～現在 国際デザイン会社 UXデザイナー
  - 2012.05～2018.03 日本のデザイン会社 UXリサーチャー
  - 2007.10～2012.04 大学UXデザイン講師
        `,
    },
    keywords: [
      'デザイン',
      'UX/UIデザイン',
      'データ分析',
      'グラフィックス',
      '企画',
    ],
  },
  {
    mentor: {
      intraId: 'm-sato',
      name: '佐藤亮',
      profileImage: 'https://example.com/profile_image04.png',
      introduction:
        '組織開発とリーダーシップトレーニングのエキスパートで、チームビルディングとパフォーマンス管理に豊富な経験。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0}],[],[],[{"startHour":6,"startMinute":0,"endHour":9,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
  ## **佐藤亮**
  
  Slack : m-sato
  
  自己紹介
  
  - 組織開発とリーダーシップのエキスパート
  - 企業のリーダーシップトレーニングとコンサルティング
  - Twitter: [https://twitter.com/ryo_sato](https://twitter.com/ryo_sato)
  
  主な分野
  
  - 組織開発、リーダーシップトレーニング
  - チームビルディング、パフォーマンス管理
  
  外部活動
  
  - 組織開発のカンファレンス講師
  - 日本リーダーシップ協会の会員
  
  主な経歴
  
  - 2015.01～現在 グローバルコンサルティング会社 リーダーシップコンサルタント
  - 2008.06～2014.12 日本の企業 組織開発マネージャー
  - 2003.04～2008.05 大学リーダーシップ講師
        `,
    },
    keywords: ['協業', 'プロジェクト管理', 'キャリアカウンセリング', '大企業'],
  },
  {
    mentor: {
      intraId: 'm-naoko',
      name: '中村尚子',
      profileImage: 'https://example.com/profile_image05.png',
      introduction:
        'マーケティング戦略の専門家で、グローバル市場におけるブランド戦略とキャンペーンに豊富な経験。',
      availableTime:
        '[[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":12,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
  ## **中村尚子**
  
  Slack : m-naoko
  
  自己紹介
  
  - マーケティング戦略の専門家
  - グローバル市場におけるブランド戦略とキャンペーン
  - LinkedIn: [https://www.linkedin.com/in/naoko-nakamura](https://www.linkedin.com/in/naoko-nakamura)
  
  主な分野
  
  - ブランド戦略、マーケティングキャンペーン
  - デジタルマーケティング、消費者行動
  
  外部活動
  
  - マーケティングカンファレンスのスピーカー
  - 日本マーケティング協会の会員
  
  主な経歴
  
  - 2017.02～現在 国際マーケティング会社 マーケティングディレクター
  - 2011.05～2016.12 日本の企業 マーケティングマネージャー
  - 2006.09～2011.04 大学マーケティング講師
        `,
    },
    keywords: ['海外', 'キャリアカウンセリング', '創業', 'eコマース'],
  },
  {
    mentor: {
      intraId: 'm-takashi',
      name: '高橋明',
      profileImage: 'https://example.com/profile_image06.png',
      introduction:
        'ソフトウェアアーキテクチャの専門家で、複雑なシステムの設計と実装に豊富な経験。',
      availableTime:
        '[[],[],[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":17,"endMinute":0}]]',
      isActive: true,
      markdownContent: `
  ## **高橋明**
  
  Slack : m-takashi
  
  自己紹介
  
  - ソフトウェアアーキテクチャの専門家
  - 複雑なシステムの設計と実装
  - LinkedIn: [https://www.linkedin.com/in/takashi-takahashi](https://www.linkedin.com/in/takashi-takahashi)
  
  主な分野
  
  - ソフトウェアアーキテクチャ、システムデザイン
  - クラウドコンピューティング、分散システム
  
  外部活動
  
  - ソフトウェアアーキテクチャカンファレンスのスピーカー
  - 日本ソフトウェアアーキテクト協会の会員
  
  主な経歴
  
  - 2014.05～現在 グローバルIT企業 ソフトウェアアーキテクト
  - 2008.02～2013.12 日本の企業 システムエンジニア
  - 2003.07～2007.11 大学ソフトウェア講師
        `,
    },
    keywords: [
      'SWアーキテクチャ',
      'クラウド',
      'サーバー',
      'コード最適化',
      'アルゴリズム',
    ],
  },
  {
    mentor: {
      intraId: 'm-yuki',
      name: '山田由紀',
      profileImage: 'https://example.com/profile_image07.png',
      introduction:
        'フィンテックの専門家で、金融技術の進展と新技術の導入に関する豊富な知識を持つ。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":12,"endMinute":0}],[],[],[],[],[]]',
      isActive: true,
      markdownContent: `
  ## **山田由紀**
  
  Slack : m-yuki
  
  自己紹介
  
  - フィンテックの専門家
  - 金融技術の進展と新技術の導入
  - Twitter: [https://twitter.com/yuki_yamada](https://twitter.com/yuki_yamada)
  
  主な分野
  
  - フィンテック、金融技術
  - ブロックチェーン、デジタル通貨
  
  外部活動
  
  - フィンテック関連のカンファレンスのスピーカー
  - 日本フィンテック協会の会員
  
  主な経歴
  
  - 2016.09～現在 国際フィンテック企業 技術顧問
  - 2010.04～2015.08 日本の企業 フィンテックエンジニア
  - 2005.01～2009.12 大学金融技術講師
        `,
    },
    keywords: ['データ分析', '金融', 'ブロックチェーン', 'ネットワーク'],
  },
];
