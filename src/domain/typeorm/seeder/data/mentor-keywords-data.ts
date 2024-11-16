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
      profileImage: '/assets/images/m1.png',
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
      profileImage: '/assets/images/m2.png',
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
      profileImage: '/assets/images/m3.png',
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
      profileImage: '/assets/images/m4.png',
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
      profileImage: '/assets/images/m5.png',
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
      profileImage: '/assets/images/m6.png',
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
      profileImage: '/assets/images/m7.png',
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
  {
    mentor: {
      intraId: 'm-ogawa1',
      name: '小川 明',
      profileImage: '/assets/images/m8.png',
      introduction:
        'Tech分野でのエキスパートで、セキュリティ、アルゴリズム、ネットワークに深い知見を持つ。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":12,"endMinute":0}],[],[],[],[],[]]',
      isActive: true,
      markdownContent: `
    ## **小川 明**
    
    Slack : m-ogawa1
    
    自己紹介
    
    - Tech分野でのエキスパート
    - セキュリティ、アルゴリズム、ネットワークに深い知見を有する
    - LinkedIn: [https://www.linkedin.com/in/naoto1](https://www.linkedin.com/in/naoto1)
    
    主な分野
    
    - セキュリティ、ネットワーク
    - アルゴリズム
    
    外部活動
    
    - 業界カンファレンスのスピーカー
    - Tech関連コミュニティのメンバー
    
    主な経歴
    
    - 2010年～現在 大手IT企業 セキュリティアーキテクト
    - 2005年～2010年 中小企業の技術リーダー
    - 2000年～2005年 大学ネットワーク講師
      `,
    },
    keywords: ['セキュリティ', 'アルゴリズム', 'ネットワーク'],
  },
  {
    mentor: {
      intraId: 'm-isi1',
      name: '石井 豊',
      profileImage: '/assets/images/m9.png',
      introduction:
        '企画におけるエキスパートで、デザイン、企画、SWアーキテクチャにおいて豊富な経験を持つ。',
      availableTime:
        '[[],[],[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":17,"endMinute":0}]]',
      isActive: true,
      markdownContent: `
    ## **石井 豊**
    
    Slack : m-isi1
    
    自己紹介
    
    - 企画におけるエキスパート
    - デザイン、企画、SWアーキテクチャに関する深い知識を持つ
    - LinkedIn: [https://www.linkedin.com/in/emi2](https://www.linkedin.com/in/emi2)
    
    主な分野
    
    - 企画、デザイン
    - SWアーキテクチャ
    
    外部活動
    
    - 企画関連のワークショップを主催
    - デザインカンファレンスのスピーカー
    
    主な経歴
    
    - 2010年～現在 国内外の企画関連プロジェクトで活躍
    - 2005年～2010年 デザイン会社にてリーダー
    - 2000年～2005年 大学でデザイン講師
      `,
    },
    keywords: ['デザイン', '企画', 'SWアーキテクチャ'],
  },
  {
    mentor: {
      intraId: 'm-sigeru1',
      name: '中島 茂',
      profileImage: '/assets/images/m10.png',
      introduction:
        '専門分野におけるエキスパートで、金融、ロボット、医療技術の進展に寄与する経験を持つ。',
      availableTime:
        '[[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":12,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
    ## **中島 茂（なかじま しげる）**
    
    Slack : m-sigeru1
    
    自己紹介
    
    - 専門分野におけるエキスパート
    - 金融、ロボット、医療分野の技術開発に携わる
    - Twitter: [https://twitter.com/yuko3](https://twitter.com/yuko3)
    
    主な分野
    
    - 金融、医療
    - ロボット
    
    外部活動
    
    - 医療技術シンポジウムの登壇者
    - ロボット開発関連の学会会員
    
    主な経歴
    
    - 2015年～現在 グローバル医療機器企業 技術顧問
    - 2010年～2015年 国内ロボット開発企業 リサーチエンジニア
    - 2000年～2010年 大学で金融工学講師
      `,
    },
    keywords: ['金融', 'ロボット', '医療'],
  },
  {
    mentor: {
      intraId: 'm-hiroshi10',
      name: '阿部 浩',
      profileImage: '/assets/images/m11.png',
      introduction:
        'CS分野におけるエキスパートで、AR/VR、グラフィックス、サーバー技術の開発に注力している。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0}],[],[],[{"startHour":6,"startMinute":0,"endHour":9,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
    ## **阿部 浩**
    
    Slack : m-hiroshi10
    
    自己紹介
    
    - CS分野のエキスパート
    - AR/VR、グラフィックス、サーバー技術の専門家
    - LinkedIn: [https://www.linkedin.com/in/hitomi4](https://www.linkedin.com/in/hitomi4)
    
    主な分野
    
    - AR/VR、グラフィックス
    - サーバー技術
    
    外部活動
    
    - AR/VR関連の技術カンファレンスに参加
    - グラフィックス研究会での活動
    
    主な経歴
    
    - 2012年～現在 国内ゲーム開発企業 技術ディレクター
    - 2005年～2012年 サーバーインフラ企業 エンジニアリーダー
    - 2000年～2005年 大学でCS関連の講義を担当
      `,
    },
    keywords: ['AR/VR', 'グラフィックス', 'サーバー'],
  },
  {
    mentor: {
      intraId: 'm-hasimotosin',
      name: '橋本 信',
      profileImage: '/assets/images/m12.png',
      introduction:
        '協業分野でのエキスパートとして、チームビルディングとプロジェクト管理に豊富な実績を持つ。',
      availableTime:
        '[[],[],[],[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
    ## **橋本 信**
    
    Slack : m-hasimotosin
    
    自己紹介
    
    - 協業分野のスペシャリスト
    - チームビルディングとプロジェクト管理を専門とする
    - LinkedIn: [https://www.linkedin.com/in/sho5](https://www.linkedin.com/in/sho5)
    
    主な分野
    
    - 協業、プロジェクト管理
    - チームビルディング
    
    外部活動
    
    - チーム開発に関するセミナー講師
    - プロジェクト管理関連のワークショップ主催
    
    主な経歴
    
    - 2010年～現在 国内外のIT企業でプロジェクトマネージャー
    - 2005年～2010年 中小企業の組織改革リーダー
    - 2000年～2005年 大学でプロジェクト管理を講義
      `,
    },
    keywords: ['協業', 'プロジェクト管理', 'コード最適化'],
  },
  {
    mentor: {
      intraId: 'm-ikedamasaru',
      name: '池田 勝',
      profileImage: '/assets/images/m13.png',
      introduction:
        'CS分野におけるエキスパートで、ネットワーク、グラフィックス、AI技術に強みを持つ。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":12,"endMinute":0}],[],[],[],[],[]]',
      isActive: true,
      markdownContent: `
    ## **池田 勝**
    
    Slack : m-ikedamasaru
    
    自己紹介
    
    - CS分野の専門家
    - ネットワーク、グラフィックス、AI技術の開発に携わる
    - LinkedIn: [https://www.linkedin.com/in/hina6](https://www.linkedin.com/in/hina6)
    
    主な分野
    
    - ネットワーク、グラフィックス
    - AI
    
    外部活動
    
    - ネットワークセキュリティ会議での講演
    - AI研究チームのメンバーとして活動
    
    主な経歴
    
    - 2015年～現在 グローバルIT企業でAIエンジニア
    - 2010年～2015年 グラフィックス会社でデザインエンジニア
    - 2005年～2010年 大学でネットワーク技術の講師
      `,
    },
    keywords: ['ネットワーク', 'グラフィックス', 'AI'],
  },
  {
    mentor: {
      intraId: 'm-kiritetsuya',
      name: '森 哲也',
      profileImage: '/assets/images/m14.png',
      introduction:
        'Tech分野でのエキスパートで、ネットワーク、セキュリティ、サーバー管理に長けている。',
      availableTime:
        '[[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":12,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
    ## **森 哲也**
    
    Slack : m-kiritetsuya

    
    自己紹介
    
    - Tech分野でのエキスパート
    - ネットワーク、セキュリティ、サーバー管理に深い知見を有する
    - LinkedIn: [https://www.linkedin.com/in/emi7](https://www.linkedin.com/in/emi7)
    
    主な分野
    
    - ネットワーク、セキュリティ
    - サーバー管理
    
    外部活動
    
    - ネットワーク関連のセミナーで講演
    - セキュリティワークショップの運営
    
    主な経歴
    
    - 2012年～現在 ITセキュリティ企業でシステムアーキテクト
    - 2008年～2012年 国内IT企業でサーバーエンジニア
    - 2004年～2008年 大学でネットワーク技術の講義
      `,
    },
    keywords: ['ネットワーク', 'セキュリティ', 'サーバー'],
  },
  {
    mentor: {
      intraId: 'm-yamazakihideki',
      name: '山崎 英樹',
      profileImage: '/assets/images/m15.png',
      introduction:
        'Tech分野においてオペレーティングシステムやアルゴリズム設計における専門知識を有する。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0}],[],[],[{"startHour":6,"startMinute":0,"endHour":9,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent: `
    ## **山崎 英樹**
    
    Slack : m-yamazakihideki
    
    自己紹介
    
    - Tech分野の専門家
    - オペレーティングシステムの設計、アルゴリズム開発のエキスパート
    - Twitter: [https://twitter.com/kaori8](https://twitter.com/kaori8)
    
    主な分野
    
    - オペレーティングシステム、アルゴリズム
    
    外部活動
    
    - OS開発者向けセミナー講師
    - アルゴリズムワークショップの開催
    
    主な経歴
    
    - 2015年～現在 大手IT企業でシステムエンジニア
    - 2010年～2015年 国内企業でアルゴリズム研究者
    - 2005年～2010年 大学でプログラム講師
      `,
    },
    keywords: ['オペレーティングシステム', 'アルゴリズム', 'ネットワーク'],
  },
  {
    mentor: {
      intraId: 'm-simizukazuhiko',
      name: '清水 和彦',
      profileImage: '/assets/images/m16.png',
      introduction:
        'Tech分野のエキスパートとして、ネットワーク、アルゴリズム、サーバー技術を専門とする。',
      availableTime:
        '[[],[],[],[],[],[{"startHour":6,"startMinute":30,"endHour":9,"endMinute":0}],[]]',
      isActive: true,
      markdownContent: `
    ## **清水 和彦**
    
    Slack : m-simizukazuhiko

    
    自己紹介
    
    - Tech分野のエキスパート
    - ネットワーク、アルゴリズム、サーバー管理の技術に長けている
    - LinkedIn: [https://www.linkedin.com/in/naoto9](https://www.linkedin.com/in/naoto9)
    
    主な分野
    
    - ネットワーク、アルゴリズム
    - サーバー管理
    
    外部活動
    
    - ネットワークエンジニア向けの講演
    - アルゴリズム開発に関するセミナー
    
    主な経歴
    
    - 2010年～現在 IT企業でネットワークアーキテクト
    - 2006年～2010年 サーバー管理企業でエンジニア
    - 2000年～2006年 大学でネットワーク技術の講師
      `,
    },
    keywords: ['ネットワーク', 'アルゴリズム', 'サーバー'],
  },
  {
    mentor: {
      intraId: 'm-kentarosato',
      name: '佐藤 健太郎',
      profileImage: '/assets/images/m17.png',
      introduction:
        'CS分野におけるエキスパートで、オープンソース、データ分析、コンテナ技術に精通している。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":12,"endMinute":0}],[],[],[],[],[]]',
      isActive: true,
      markdownContent:
        '## **佐藤 健太郎（さとう けんたろう）**\n\nSlack : m-kentarosato\n\n自己紹介\n\n- CS分野のエキスパート\n- オープンソース、データ分析、コンテナ技術に深い知見を有する\n- LinkedIn: [https://www.linkedin.com/in/kentarosato](https://www.linkedin.com/in/kentarosato)\n\n主な分野\n\n- オープンソース、データ分析\n- コンテナ\n\n外部活動\n\n- オープンソースカンファレンスで講演\n- コンテナ技術に関する勉強会を主催\n\n主な経歴\n\n- 2014年～現在 グローバルIT企業でデータエンジニア\n- 2009年～2014年 国内企業でオープンソース開発者\n- 2005年～2009年 大学で情報技術の講義',
    },
    keywords: ['オープンソース', 'データ分析', 'コンテナ'],
  },
  {
    mentor: {
      intraId: 'm-daisukesuzuki',
      name: '鈴木 大輔',
      profileImage: '/assets/images/m18.png',
      introduction:
        '就職に関するエキスパートで、海外でのキャリア支援やスタートアップ相談を提供している。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":12,"endMinute":0}],[],[],[],[],[]]',
      isActive: true,
      markdownContent:
        '## **鈴木 大輔（すずき だいすけ）**\n\nSlack : m-daisukesuzuki\n\n自己紹介\n\n- 就職分野の専門家\n- 海外でのキャリア支援やスタートアップ企業向けの就職相談を行う\n- LinkedIn: [https://www.linkedin.com/in/daisukesuzuki](https://www.linkedin.com/in/daisukesuzuki)\n\n主な分野\n\n- 海外就職支援、スタートアップ\n\n外部活動\n\n- キャリア支援関連のワークショップ\n- 留学生向けの就職支援イベント\n\n主な経歴\n\n- 2013年～現在 海外企業でキャリアコンサルタント\n- 2008年～2013年 国内のスタートアップ支援会社でカウンセラー\n- 2003年～2008年 大学でキャリア教育担当',
    },
    keywords: ['海外', 'スタートアップ', '就職相談'],
  },
  {
    mentor: {
      intraId: 'm-naokitakahashi',
      name: '高橋 直樹',
      profileImage: '/assets/images/m19.png',
      introduction:
        '企画分野のエキスパートで、DB設計、データ分析、デザインの戦略立案に携わっている。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":12,"endMinute":0}],[],[],[],[],[]]',
      isActive: true,
      markdownContent:
        '## **高橋 直樹（たかはし なおき）**\n\nSlack : m-naokitakahashi\n\n自己紹介\n\n- 企画分野におけるエキスパート\n- DB設計、データ分析、デザインの戦略立案を得意とする\n- Twitter: [https://twitter.com/naokitakahashi](https://twitter.com/naokitakahashi)\n\n主な分野\n\n- DB設計、データ分析\n\n外部活動\n\n- 企画立案に関するセミナー開催\n- データ分析ワークショップの運営\n\n主な経歴\n\n- 2012年～現在 国内外での企画関連プロジェクトに従事\n- 2007年～2012年 企画会社でDB設計リーダー\n- 2000年～2007年 大学でデータベース講義',
    },
    keywords: ['DB設計', 'データ分析', 'デザイン'],
  },
  {
    mentor: {
      intraId: 'm-hiroyukitanaka',
      name: '田中 裕樹',
      profileImage: '/assets/images/m20.png',
      introduction:
        '就職分野のエキスパートで、就職相談や大企業でのキャリア構築に注力している。',
      availableTime:
        '[[],[],[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":17,"endMinute":0}]]',
      isActive: true,
      markdownContent:
        '## **田中 裕樹（たなか ひろき）**\n\nSlack : m-hiroyukitanaka\n\n自己紹介\n\n- 就職分野の専門家\n- 就職相談や大企業向けキャリア支援を行う\n- LinkedIn: [https://www.linkedin.com/in/hiroyukitanaka](https://www.linkedin.com/in/hiroyukitanaka)\n\n主な分野\n\n- 就職相談、大企業向け支援\n\n外部活動\n\n- キャリア形成セミナーで講演\n- 企業就職支援イベントの企画\n\n主な経歴\n\n- 2010年～現在 国内外のキャリア支援会社でコンサルタント\n- 2005年～2010年 大手企業でキャリア支援担当\n- 2000年～2005年 大学でキャリア教育を担当',
    },
    keywords: ['就職相談', '大企業', '海外'],
  },
  {
    mentor: {
      intraId: 'm-kazuyawatanabe',
      name: '渡辺 和也',
      profileImage: '/assets/images/m21.png',
      introduction:
        'CS分野においてセキュリティ、データ分析、ネットワーク管理を専門とする。',
      availableTime:
        '[[],[],[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":17,"endMinute":0}]]',
      isActive: true,
      markdownContent:
        '## **渡辺 和也（わたなべ かずや）**\n\nSlack : m-kazuyawatanabe\n\n自己紹介\n\n- CS分野の専門家\n- セキュリティ、データ分析、ネットワーク管理に注力\n- LinkedIn: [https://www.linkedin.com/in/kazuyawatanabe](https://www.linkedin.com/in/kazuyawatanabe)\n\n主な分野\n\n- セキュリティ、データ分析\n- ネットワーク管理\n\n外部活動\n\n- セキュリティワークショップの開催\n- データ分析イベントで講演\n\n主な経歴\n\n- 2014年～現在 国内IT企業でネットワークエンジニア\n- 2010年～2014年 セキュリティ企業でシニアアナリスト\n- 2006年～2010年 大学でデータ分析の講義',
    },
    keywords: ['セキュリティ', 'データ分析', 'ネットワーク'],
  },
  {
    mentor: {
      intraId: 'm-tomoyayoshida',
      name: '吉田 智也',
      profileImage: '/assets/images/m22.png',
      introduction:
        '専門分野においてeコマース、金融、医療技術に関するコンサルティングを行っている。',
      availableTime:
        '[[],[],[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":17,"endMinute":0}]]',
      isActive: true,
      markdownContent:
        '## **吉田 智也（よしだ ともや）**\n\nSlack : m-tomoyayoshida\n\n自己紹介\n\n- 専門分野のエキスパート\n- eコマース、金融、医療技術におけるコンサルティングを実施\n- LinkedIn: [https://www.linkedin.com/in/tomoyayoshida](https://www.linkedin.com/in/tomoyayoshida)\n\n主な分野\n\n- eコマース、金融\n\n外部活動\n\n- 医療技術に関する学会で発表\n- eコマースフォーラムに登壇\n\n主な経歴\n\n- 2015年～現在 国内外の企業でコンサルタント\n- 2010年～2015年 金融企業でシニアエンジニア\n- 2005年～2010年 大学で金融技術の講義',
    },
    keywords: ['eコマース', '金融', '医療'],
  },
  {
    mentor: {
      intraId: 'm-shoutayamamoto',
      name: '山本 翔太',
      profileImage: '/assets/images/m23.png',
      introduction:
        'CS分野でAR/VR技術、セキュリティ、ブロックチェーンの応用に取り組んでいる。',
      availableTime:
        '[[],[],[],[],[{"startHour":9,"startMinute":0,"endHour":12,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent:
        '## **山本 翔太（やまもと しょうた）**\n\nSlack : m-shoutayamamoto\n\n自己紹介\n\n- CS分野のエキスパート\n- AR/VR技術、セキュリティ、ブロックチェーンの応用を得意とする\n- Twitter: [https://twitter.com/shoutayamamoto](https://twitter.com/shoutayamamoto)\n\n主な分野\n\n- AR/VR、ブロックチェーン\n- セキュリティ\n\n外部活動\n\n- AR/VRに関するワークショップの主催\n- ブロックチェーン会議での講演\n\n主な経歴\n\n- 2016年～現在 国内外のIT企業でエンジニア\n- 2010年～2016年 セキュリティ企業でシニアエンジニア\n- 2005年～2010年 大学で技術研究',
    },
    keywords: ['AR/VR', 'セキュリティ', 'ブロックチェーン'],
  },
  {
    mentor: {
      intraId: 'm-kobayashimakoto',
      name: '小林 誠',
      profileImage: '/assets/images/m24.png',
      introduction:
        '協業分野においてプロジェクト管理やコード最適化を手掛ける。',
      availableTime:
        '[[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0}],[],[],[{"startHour":6,"startMinute":0,"endHour":9,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent:
        '## **小林 誠（こばやし まこと）**\n\nSlack : m-kobayashimakoto\n\n自己紹介\n\n- 協業分野の専門家\n- プロジェクト管理やコード最適化を担当\n- LinkedIn: [https://www.linkedin.com/in/kobayashimakoto](https://www.linkedin.com/in/kobayashimakoto)\n\n主な分野\n\n- 協業、プロジェクト管理\n\n外部活動\n\n- プロジェクト管理関連の勉強会に参加\n- コード最適化ワークショップの開催\n\n主な経歴\n\n- 2015年～現在 国内外でプロジェクトマネジメントに従事\n- 2010年～2015年 IT企業でリーダーエンジニア\n- 2005年～2010年 大学でプロジェクト管理を指導',
    },
    keywords: ['協業', 'プロジェクト管理', 'コード最適化'],
  },
  {
    mentor: {
      intraId: 'm-masatoinoue',
      name: '井上 雅人',
      profileImage: '/assets/images/m25.png',
      introduction:
        'Tech分野でSWアーキテクチャ、サーバー、コンテナの設計に長年の経験を持つ。',
      availableTime:
        '[[],[],[],[],[{"startHour":6,"startMinute":0,"endHour":10,"endMinute":0}],[],[]]',
      isActive: true,
      markdownContent:
        '## **井上 雅人（いのうえ まさと）**\n\nSlack : m-masatoinoue\n\n自己紹介\n\n- Tech分野のエキスパート\n- SWアーキテクチャ、サーバー設計、コンテナ技術を専門とする\n- LinkedIn: [https://www.linkedin.com/in/masatoinoue](https://www.linkedin.com/in/masatoinoue)\n\n主な分野\n\n- SWアーキテクチャ、サーバー\n\n外部活動\n\n- サーバー関連の講演を行う\n- コンテナ技術の開発者会議に参加\n\n主な経歴\n\n- 2012年～現在 グローバルIT企業でアーキテクト\n- 2008年～2012年 サーバーインフラ企業でエンジニア\n- 2005年～2008年 大学で技術指導',
    },
    keywords: ['SWアーキテクチャ', 'サーバー', 'コンテナ'],
  },
];
