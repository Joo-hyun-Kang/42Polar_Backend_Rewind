export class UserInfo42OriginDto {
  id: number;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  usual_full_name: string;
  usual_first_name: string;
  url: string;
  phone: string | null;
  displayname: string;
  kind: string;
  image: Image42OriginDto;
  staff: boolean;
  correction_point: number;
  pool_month: string;
  pool_year: string;
  location: string | null;
  wallet: number;
  anonymize_date: string;
  data_erasure_date: string | null;
  alumni: boolean;
  active: boolean;
  groups: any[];
  cursus_users: CursusUser42OriginDto[];
  projects_users: any[];
  languages_users: LanguageUser42OriginDto[];
  achievements: any[];
  titles: any[];
  titles_users: any[];
  partnerships: any[];
  patroned: Patroned42OriginDto[];
  patroning: any[];
  expertises_users: ExpertiseUser42OriginDto[];
  roles: any[];
  campus: Campus42OriginDto[];
  campus_users: CampusUser42OriginDto[];
}

export class Image42OriginDto {
  link: string;
  versions: ImageVersions42OriginDto;
}

export class ImageVersions42OriginDto {
  large: string;
  medium: string;
  small: string;
  micro: string;
}

export class CursusUser42OriginDto {
  id: number;
  begin_at: string;
  end_at: string | null;
  grade: string | null;
  level: number;
  skills: any[];
  cursus_id: number;
  has_coalition: boolean;
  user: UserReference42OriginDto;
  cursus: Cursus42OriginDto;
  blackholed_at: any;
}

export class UserReference42OriginDto {
  id: number;
  login: string;
  url: string;
}

export class Cursus42OriginDto {
  id: number;
  created_at: string;
  name: string;
  slug: string;
}

export class LanguageUser42OriginDto {
  id: number;
  language_id: number;
  user_id: number;
  position: number;
  created_at: string;
}

export class Patroned42OriginDto {
  id: number;
  user_id: number;
  godfather_id: number;
  ongoing: boolean;
  created_at: string;
  updated_at: string;
}

export class ExpertiseUser42OriginDto {
  id: number;
  expertise_id: number;
  interested: boolean;
  value: number;
  contact_me: boolean;
  created_at: string;
  user_id: number;
}

export class Campus42OriginDto {
  id: number;
  name: string;
  time_zone: string;
  language: CampusLanguage42OriginDto;
  users_count: number;
  vogsphere_id: number;
}

export class CampusLanguage42OriginDto {
  id: number;
  name: string;
  identifier: string;
  created_at: string;
  updated_at: string;
}

export class CampusUser42OriginDto {
  id: number;
  user_id: number;
  campus_id: number;
  is_primary: boolean;
}

/* 自分のAPIに通じてデータ
{
  "id": 99828,
  "email": "jokang@student.42tokyo.jp",
  "login": "jokang",
  "first_name": "Joohyun",
  "last_name": "Kang",
  "usual_full_name": "Joohyun Kang",
  "usual_first_name": null,
  "url": "https://api.intra.42.fr/v2/users/jokang",
  "phone": "hidden",
  "displayname": "Joohyun Kang",
  "kind": "student",
  "image": {
    "link": "https://cdn.intra.42.fr/users/0bcc2ea502990db624dee72d7e2278cd/jokang.jpg",
    "versions": {
      "large": "https://cdn.intra.42.fr/users/692e8ca340503b0bc73308608a0d35cf/large_jokang.jpg",
      "medium": "https://cdn.intra.42.fr/users/5999bb54b9014c31cf66491edc2598e5/medium_jokang.jpg",
      "small": "https://cdn.intra.42.fr/users/f3998384c09fdea78a44668d38a02c71/small_jokang.jpg",
      "micro": "https://cdn.intra.42.fr/users/e93dbe7ae0591acf54f8c2ef7a7b345e/micro_jokang.jpg"
    }
  },
  "staff?": false,
  "correction_point": 4,
  "pool_month": "october",
  "pool_year": "2021",
  "location": null,
  "wallet": 35,
  "anonymize_date": "2027-09-10T00:00:00.000+09:00",
  "data_erasure_date": "2027-09-10T00:00:00.000+09:00",
  "created_at": "2021-10-04T03:06:02.722Z",
  "updated_at": "2024-07-25T01:01:12.950Z",
  "alumnized_at": null,
  "alumni?": false,
  "active?": true,
  "groups": [],
  "cursus_users": [
    {
      "grade": null,
      "level": 9.79,
      "skills": [
        {
          "id": 4,
          "name": "Unix",
          "level": 11.6
        },
        {
          "id": 1,
          "name": "Algorithms & AI",
          "level": 9.24
        },
        {
          "id": 3,
          "name": "Rigor",
          "level": 6.4
        },
        {
          "id": 14,
          "name": "Adaptation & creativity",
          "level": 2.9
        },
        {
          "id": 7,
          "name": "Group & interpersonal",
          "level": 0.69
        }
      ],
      "blackholed_at": null,
      "id": 141031,
      "begin_at": "2021-10-04T03:07:04.000Z",
      "end_at": "2021-10-29T14:42:00.000Z",
      "cursus_id": 9,
      "has_coalition": true,
      "created_at": "2021-10-04T03:06:05.033Z",
      "updated_at": "2021-10-04T03:06:05.033Z",
      "user": {
        "id": 99828,
        "email": "jokang@student.42tokyo.jp",
        "login": "jokang",
        "first_name": "Joohyun",
        "last_name": "Kang",
        "usual_full_name": "Joohyun Kang",
        "usual_first_name": null,
        "url": "https://api.intra.42.fr/v2/users/jokang",
        "phone": "hidden",
        "displayname": "Joohyun Kang",
        "kind": "student",
        "image": {
          "link": "https://cdn.intra.42.fr/users/0bcc2ea502990db624dee72d7e2278cd/jokang.jpg",
          "versions": {
            "large": "https://cdn.intra.42.fr/users/692e8ca340503b0bc73308608a0d35cf/large_jokang.jpg",
            "medium": "https://cdn.intra.42.fr/users/5999bb54b9014c31cf66491edc2598e5/medium_jokang.jpg",
            "small": "https://cdn.intra.42.fr/users/f3998384c09fdea78a44668d38a02c71/small_jokang.jpg",
            "micro": "https://cdn.intra.42.fr/users/e93dbe7ae0591acf54f8c2ef7a7b345e/micro_jokang.jpg"
          }
        },
        "staff?": false,
        "correction_point": 4,
        "pool_month": "october",
        "pool_year": "2021",
        "location": null,
        "wallet": 35,
        "anonymize_date": "2027-09-10T00:00:00.000+09:00",
        "data_erasure_date": "2027-09-10T00:00:00.000+09:00",
        "created_at": "2021-10-04T03:06:02.722Z",
        "updated_at": "2024-07-25T01:01:12.950Z",
        "alumnized_at": null,
        "alumni?": false,
        "active?": true
      },
      "cursus": {
        "id": 9,
        "created_at": "2015-11-04T10:58:13.979Z",
        "name": "C Piscine",
        "slug": "c-piscine",
        "kind": "piscine"
      }
    },
    {
      "grade": "Member",
      "level": 10.06,
      "skills": [
        {
          "id": 3,
          "name": "Rigor",
          "level": 7.5
        },
        {
          "id": 10,
          "name": "Network & system administration",
          "level": 6.87
        },
        {
          "id": 6,
          "name": "Web",
          "level": 6.01
        },
        {
          "id": 17,
          "name": "Object-oriented programming",
          "level": 5.58
        },
        {
          "id": 2,
          "name": "Imperative programming",
          "level": 4.86
        },
        {
          "id": 4,
          "name": "Unix",
          "level": 4.26
        },
        {
          "id": 1,
          "name": "Algorithms & AI",
          "level": 3.85
        },
        {
          "id": 7,
          "name": "Group & interpersonal",
          "level": 3.69
        },
        {
          "id": 5,
          "name": "Graphics",
          "level": 3.13
        },
        {
          "id": 19,
          "name": "Basics",
          "level": 0
        }
      ],
      "blackholed_at": null,
      "id": 145196,
      "begin_at": "2021-11-08T01:00:00.000Z",
      "end_at": null,
      "cursus_id": 21,
      "has_coalition": true,
      "created_at": "2021-11-03T09:17:41.505Z",
      "updated_at": "2021-11-03T09:17:41.505Z",
      "user": {
        "id": 99828,
        "email": "jokang@student.42tokyo.jp",
        "login": "jokang",
        "first_name": "Joohyun",
        "last_name": "Kang",
        "usual_full_name": "Joohyun Kang",
        "usual_first_name": null,
        "url": "https://api.intra.42.fr/v2/users/jokang",
        "phone": "hidden",
        "displayname": "Joohyun Kang",
        "kind": "student",
        "image": {
          "link": "https://cdn.intra.42.fr/users/0bcc2ea502990db624dee72d7e2278cd/jokang.jpg",
          "versions": {
            "large": "https://cdn.intra.42.fr/users/692e8ca340503b0bc73308608a0d35cf/large_jokang.jpg",
            "medium": "https://cdn.intra.42.fr/users/5999bb54b9014c31cf66491edc2598e5/medium_jokang.jpg",
            "small": "https://cdn.intra.42.fr/users/f3998384c09fdea78a44668d38a02c71/small_jokang.jpg",
            "micro": "https://cdn.intra.42.fr/users/e93dbe7ae0591acf54f8c2ef7a7b345e/micro_jokang.jpg"
          }
        },
        "staff?": false,
        "correction_point": 4,
        "pool_month": "october",
        "pool_year": "2021",
        "location": null,
        "wallet": 35,
        "anonymize_date": "2027-09-10T00:00:00.000+09:00",
        "data_erasure_date": "2027-09-10T00:00:00.000+09:00",
        "created_at": "2021-10-04T03:06:02.722Z",
        "updated_at": "2024-07-25T01:01:12.950Z",
        "alumnized_at": null,
        "alumni?": false,
        "active?": true
      },
      "cursus": {
        "id": 21,
        "created_at": "2019-07-29T08:45:17.896Z",
        "name": "42cursus",
        "slug": "42cursus",
        "kind": "main"
      }
    },
    {
      "grade": null,
      "level": 0,
      "skills": [],
      "blackholed_at": null,
      "id": 262824,
      "begin_at": "2024-04-01T07:38:00.000Z",
      "end_at": null,
      "cursus_id": 28,
      "has_coalition": false,
      "created_at": "2024-04-01T07:38:27.085Z",
      "updated_at": "2024-04-01T07:38:27.085Z",
      "user": {
        "id": 99828,
        "email": "jokang@student.42tokyo.jp",
        "login": "jokang",
        "first_name": "Joohyun",
        "last_name": "Kang",
        "usual_full_name": "Joohyun Kang",
        "usual_first_name": null,
        "url": "https://api.intra.42.fr/v2/users/jokang",
        "phone": "hidden",
        "displayname": "Joohyun Kang",
        "kind": "student",
        "image": {
          "link": "https://cdn.intra.42.fr/users/0bcc2ea502990db624dee72d7e2278cd/jokang.jpg",
          "versions": {
            "large": "https://cdn.intra.42.fr/users/692e8ca340503b0bc73308608a0d35cf/large_jokang.jpg",
            "medium": "https://cdn.intra.42.fr/users/5999bb54b9014c31cf66491edc2598e5/medium_jokang.jpg",
            "small": "https://cdn.intra.42.fr/users/f3998384c09fdea78a44668d38a02c71/small_jokang.jpg",
            "micro": "https://cdn.intra.42.fr/users/e93dbe7ae0591acf54f8c2ef7a7b345e/micro_jokang.jpg"
          }
        },
        "staff?": false,
        "correction_point": 4,
        "pool_month": "october",
        "pool_year": "2021",
        "location": null,
        "wallet": 35,
        "anonymize_date": "2027-09-10T00:00:00.000+09:00",
        "data_erasure_date": "2027-09-10T00:00:00.000+09:00",
        "created_at": "2021-10-04T03:06:02.722Z",
        "updated_at": "2024-07-25T01:01:12.950Z",
        "alumnized_at": null,
        "alumni?": false,
        "active?": true
      },
      "cursus": {
        "id": 28,
        "created_at": "2020-03-24T06:39:03.649Z",
        "name": "Reloaded",
        "slug": "reloaded",
        "kind": "external"
      }
    },
    {
      "grade": null,
      "level": 0,
      "skills": [],
      "blackholed_at": null,
      "id": 262823,
      "begin_at": "2024-04-01T07:38:00.000Z",
      "end_at": null,
      "cursus_id": 50,
      "has_coalition": false,
      "created_at": "2024-04-01T07:38:08.311Z",
      "updated_at": "2024-04-01T07:38:08.311Z",
      "user": {
        "id": 99828,
        "email": "jokang@student.42tokyo.jp",
        "login": "jokang",
        "first_name": "Joohyun",
        "last_name": "Kang",
        "usual_full_name": "Joohyun Kang",
        "usual_first_name": null,
        "url": "https://api.intra.42.fr/v2/users/jokang",
        "phone": "hidden",
        "displayname": "Joohyun Kang",
        "kind": "student",
        "image": {
          "link": "https://cdn.intra.42.fr/users/0bcc2ea502990db624dee72d7e2278cd/jokang.jpg",
          "versions": {
            "large": "https://cdn.intra.42.fr/users/692e8ca340503b0bc73308608a0d35cf/large_jokang.jpg",
            "medium": "https://cdn.intra.42.fr/users/5999bb54b9014c31cf66491edc2598e5/medium_jokang.jpg",
            "small": "https://cdn.intra.42.fr/users/f3998384c09fdea78a44668d38a02c71/small_jokang.jpg",
            "micro": "https://cdn.intra.42.fr/users/e93dbe7ae0591acf54f8c2ef7a7b345e/micro_jokang.jpg"
          }
        },
        "staff?": false,
        "correction_point": 4,
        "pool_month": "october",
        "pool_year": "2021",
        "location": null,
        "wallet": 35,
        "anonymize_date": "2027-09-10T00:00:00.000+09:00",
        "data_erasure_date": "2027-09-10T00:00:00.000+09:00",
        "created_at": "2021-10-04T03:06:02.722Z",
        "updated_at": "2024-07-25T01:01:12.950Z",
        "alumnized_at": null,
        "alumni?": false,
        "active?": true
      },
      "cursus": {
        "id": 50,
        "created_at": "2021-07-01T09:58:06.110Z",
        "name": "Road to",
        "slug": "road-to",
        "kind": "external"
      }
    }
  ],
  "projects_users": [
    {
      "id": 3392387,
      "occurrence": 0,
      "final_mark": null,
      "status": "in_progress",
      "validated?": null,
      "current_team_id": 5289459,
      "project": {
        "id": 1414,
        "name": "cloud-1",
        "slug": "42cursus-cloud-1",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": null,
      "marked": false,
      "retriable_at": null,
      "created_at": "2023-11-06T07:59:52.341Z",
      "updated_at": "2023-11-06T09:48:20.238Z"
    },
    {
      "id": 3085127,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4833689,
      "project": {
        "id": 1324,
        "name": "Exam Rank 06",
        "slug": "exam-rank-06",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-05-16T06:54:25.505Z",
      "marked": true,
      "retriable_at": "2023-05-16T06:54:25.534Z",
      "created_at": "2023-05-05T10:12:58.963Z",
      "updated_at": "2023-05-16T06:54:33.895Z"
    },
    {
      "id": 3085126,
      "occurrence": 0,
      "final_mark": 91,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4837532,
      "project": {
        "id": 1337,
        "name": "ft_transcendence",
        "slug": "ft_transcendence",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-05-11T13:34:53.666Z",
      "marked": true,
      "retriable_at": "2023-05-14T13:34:54.031Z",
      "created_at": "2023-05-05T10:12:49.193Z",
      "updated_at": "2023-05-11T13:34:54.079Z"
    },
    {
      "id": 3026994,
      "occurrence": 1,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4823991,
      "project": {
        "id": 2309,
        "name": "CPP Module 09",
        "slug": "cpp-module-09",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-05-05T09:19:20.749Z",
      "marked": true,
      "retriable_at": "2023-05-06T09:19:21.042Z",
      "created_at": "2023-03-14T10:54:34.250Z",
      "updated_at": "2023-05-05T09:19:21.055Z"
    },
    {
      "id": 2982144,
      "occurrence": 1,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4783788,
      "project": {
        "id": 1323,
        "name": "Exam Rank 05",
        "slug": "exam-rank-05",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-04-18T06:40:01.064Z",
      "marked": true,
      "retriable_at": "2023-04-18T06:40:01.093Z",
      "created_at": "2023-02-14T07:32:27.624Z",
      "updated_at": "2023-04-18T06:40:11.427Z"
    },
    {
      "id": 3018894,
      "occurrence": 2,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4801430,
      "project": {
        "id": 1336,
        "name": "ft_irc",
        "slug": "ft_irc",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-04-11T10:13:51.023Z",
      "marked": true,
      "retriable_at": "2023-04-12T10:13:51.259Z",
      "created_at": "2023-03-08T07:02:44.632Z",
      "updated_at": "2023-04-11T10:13:51.280Z"
    },
    {
      "id": 2995960,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4708667,
      "project": {
        "id": 1983,
        "name": "Inception",
        "slug": "inception",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-03-08T11:19:30.643Z",
      "marked": true,
      "retriable_at": "2023-03-09T11:19:30.973Z",
      "created_at": "2023-02-21T11:48:01.147Z",
      "updated_at": "2023-03-08T11:19:30.989Z"
    },
    {
      "id": 2896699,
      "occurrence": 1,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4669100,
      "project": {
        "id": 1322,
        "name": "Exam Rank 04",
        "slug": "exam-rank-04",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-02-14T07:21:29.818Z",
      "marked": true,
      "retriable_at": "2023-02-14T07:21:29.848Z",
      "created_at": "2022-11-26T07:09:20.273Z",
      "updated_at": "2023-02-14T07:21:36.042Z"
    },
    {
      "id": 2896700,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4604441,
      "project": {
        "id": 1326,
        "name": "cub3d",
        "slug": "cub3d",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2023-01-04T12:53:03.383Z",
      "marked": true,
      "retriable_at": "2023-01-05T12:53:03.666Z",
      "created_at": "2022-11-26T07:09:29.375Z",
      "updated_at": "2023-01-04T12:53:03.945Z"
    },
    {
      "id": 2900004,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4575049,
      "project": {
        "id": 1346,
        "name": "CPP Module 08",
        "slug": "cpp-module-08",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-30T14:43:08.047Z",
      "marked": true,
      "retriable_at": "2022-12-01T14:43:08.308Z",
      "created_at": "2022-11-29T14:18:17.956Z",
      "updated_at": "2022-11-30T14:43:08.327Z"
    },
    {
      "id": 2899668,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4574584,
      "project": {
        "id": 1345,
        "name": "CPP Module 07",
        "slug": "cpp-module-07",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-29T14:18:01.801Z",
      "marked": true,
      "retriable_at": "2022-11-30T14:18:01.833Z",
      "created_at": "2022-11-29T10:57:35.624Z",
      "updated_at": "2022-11-29T14:18:01.852Z"
    },
    {
      "id": 2898402,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4572757,
      "project": {
        "id": 1344,
        "name": "CPP Module 06",
        "slug": "cpp-module-06",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-29T10:57:04.197Z",
      "marked": true,
      "retriable_at": "2022-11-30T10:57:04.241Z",
      "created_at": "2022-11-28T11:21:32.489Z",
      "updated_at": "2022-11-29T10:57:04.270Z"
    },
    {
      "id": 2895936,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4569271,
      "project": {
        "id": 1343,
        "name": "CPP Module 05",
        "slug": "cpp-module-05",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-28T11:21:18.666Z",
      "marked": true,
      "retriable_at": "2022-11-29T11:21:18.697Z",
      "created_at": "2022-11-25T11:45:18.957Z",
      "updated_at": "2022-11-28T11:21:18.723Z"
    },
    {
      "id": 2894046,
      "occurrence": 0,
      "final_mark": 80,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4566755,
      "project": {
        "id": 1342,
        "name": "CPP Module 04",
        "slug": "cpp-module-04",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-25T11:45:06.118Z",
      "marked": true,
      "retriable_at": "2022-11-26T11:45:06.145Z",
      "created_at": "2022-11-24T10:40:58.530Z",
      "updated_at": "2022-11-25T11:45:06.158Z"
    },
    {
      "id": 2891976,
      "occurrence": 0,
      "final_mark": 80,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4564054,
      "project": {
        "id": 1341,
        "name": "CPP Module 03",
        "slug": "cpp-module-03",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-24T10:40:38.258Z",
      "marked": true,
      "retriable_at": "2022-11-25T10:40:38.288Z",
      "created_at": "2022-11-23T12:34:31.209Z",
      "updated_at": "2022-11-24T10:40:38.308Z"
    },
    {
      "id": 2889870,
      "occurrence": 0,
      "final_mark": 80,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4561262,
      "project": {
        "id": 1340,
        "name": "CPP Module 02",
        "slug": "cpp-module-02",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-23T12:34:14.296Z",
      "marked": true,
      "retriable_at": "2022-11-24T12:34:14.338Z",
      "created_at": "2022-11-22T12:15:29.477Z",
      "updated_at": "2022-11-23T12:34:14.363Z"
    },
    {
      "id": 2887928,
      "occurrence": 0,
      "final_mark": 90,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4558808,
      "project": {
        "id": 1339,
        "name": "CPP Module 01",
        "slug": "cpp-module-01",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-22T12:15:16.140Z",
      "marked": true,
      "retriable_at": "2022-11-23T12:15:16.189Z",
      "created_at": "2022-11-21T14:25:17.470Z",
      "updated_at": "2022-11-22T12:15:16.212Z"
    },
    {
      "id": 2864336,
      "occurrence": 0,
      "final_mark": 80,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4526982,
      "project": {
        "id": 1338,
        "name": "CPP Module 00",
        "slug": "cpp-module-00",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-21T14:24:49.026Z",
      "marked": true,
      "retriable_at": "2022-11-22T14:24:49.054Z",
      "created_at": "2022-11-03T07:44:48.074Z",
      "updated_at": "2022-11-21T14:24:49.075Z"
    },
    {
      "id": 2845805,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4501732,
      "project": {
        "id": 2007,
        "name": "NetPractice",
        "slug": "netpractice",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-11-03T07:13:28.656Z",
      "marked": true,
      "retriable_at": "2022-11-04T07:13:28.941Z",
      "created_at": "2022-10-21T02:27:27.718Z",
      "updated_at": "2022-11-03T07:13:28.956Z"
    },
    {
      "id": 2664890,
      "occurrence": 1,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4476554,
      "project": {
        "id": 1321,
        "name": "Exam Rank 03",
        "slug": "exam-rank-03",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-10-20T02:47:21.592Z",
      "marked": true,
      "retriable_at": "2022-10-20T02:47:21.619Z",
      "created_at": "2022-07-13T14:43:42.493Z",
      "updated_at": "2022-10-20T02:47:30.680Z"
    },
    {
      "id": 2604653,
      "occurrence": 2,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4459384,
      "project": {
        "id": 1334,
        "name": "Philosophers",
        "slug": "42cursus-philosophers",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-10-01T17:51:52.609Z",
      "marked": true,
      "retriable_at": "2022-10-02T17:51:52.896Z",
      "created_at": "2022-05-30T12:43:35.271Z",
      "updated_at": "2022-10-01T17:51:52.912Z"
    },
    {
      "id": 2604668,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4154644,
      "project": {
        "id": 1331,
        "name": "minishell",
        "slug": "42cursus-minishell",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-06-25T15:42:52.194Z",
      "marked": true,
      "retriable_at": "2022-06-26T15:42:52.577Z",
      "created_at": "2022-05-30T12:54:55.774Z",
      "updated_at": "2022-06-25T15:42:52.917Z"
    },
    {
      "id": 2604138,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4152639,
      "project": {
        "id": 1320,
        "name": "Exam Rank 02",
        "slug": "exam-rank-02",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-05-31T07:17:13.170Z",
      "marked": true,
      "retriable_at": "2022-05-31T07:17:13.347Z",
      "created_at": "2022-05-30T04:38:51.359Z",
      "updated_at": "2022-05-31T07:17:20.417Z"
    },
    {
      "id": 2600304,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4146900,
      "project": {
        "id": 2009,
        "name": "so_long",
        "slug": "so_long",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-05-30T12:42:44.731Z",
      "marked": true,
      "retriable_at": "2022-05-31T12:42:45.080Z",
      "created_at": "2022-05-25T12:36:32.001Z",
      "updated_at": "2022-05-30T12:42:45.113Z"
    },
    {
      "id": 2597683,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4143251,
      "project": {
        "id": 2005,
        "name": "minitalk",
        "slug": "minitalk",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-05-26T05:57:33.533Z",
      "marked": true,
      "retriable_at": "2022-05-27T05:57:33.788Z",
      "created_at": "2022-05-23T08:23:41.971Z",
      "updated_at": "2022-05-26T05:57:33.804Z"
    },
    {
      "id": 2582697,
      "occurrence": 1,
      "final_mark": 90,
      "status": "finished",
      "validated?": true,
      "current_team_id": 4143071,
      "project": {
        "id": 1471,
        "name": "push_swap",
        "slug": "42cursus-push_swap",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-05-23T08:23:16.585Z",
      "marked": true,
      "retriable_at": "2022-05-24T08:23:16.945Z",
      "created_at": "2022-05-05T12:18:59.601Z",
      "updated_at": "2022-05-23T08:23:16.981Z"
    },
    {
      "id": 2436451,
      "occurrence": 0,
      "final_mark": 110,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3919355,
      "project": {
        "id": 1994,
        "name": "Born2beroot",
        "slug": "born2beroot",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-05-05T12:17:56.017Z",
      "marked": true,
      "retriable_at": "2022-05-06T12:17:56.272Z",
      "created_at": "2021-12-10T11:09:23.349Z",
      "updated_at": "2022-05-05T12:17:56.294Z"
    },
    {
      "id": 2436450,
      "occurrence": 0,
      "final_mark": 125,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3919354,
      "project": {
        "id": 1327,
        "name": "get_next_line",
        "slug": "42cursus-get_next_line",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-01-07T11:43:55.540Z",
      "marked": true,
      "retriable_at": "2022-01-08T11:43:55.763Z",
      "created_at": "2021-12-10T11:09:16.364Z",
      "updated_at": "2022-01-07T11:43:55.778Z"
    },
    {
      "id": 2436449,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3919352,
      "project": {
        "id": 1316,
        "name": "ft_printf",
        "slug": "42cursus-ft_printf",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2022-03-24T08:28:30.393Z",
      "marked": true,
      "retriable_at": "2022-03-25T08:28:30.579Z",
      "created_at": "2021-12-10T11:09:11.230Z",
      "updated_at": "2022-03-24T08:28:30.597Z"
    },
    {
      "id": 2401180,
      "occurrence": 0,
      "final_mark": 116,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3872944,
      "project": {
        "id": 1314,
        "name": "Libft",
        "slug": "42cursus-libft",
        "parent_id": null
      },
      "cursus_ids": [
        21
      ],
      "marked_at": "2021-12-10T10:53:57.609Z",
      "marked": true,
      "retriable_at": "2021-12-11T10:54:00.206Z",
      "created_at": "2021-11-08T01:15:05.678Z",
      "updated_at": "2021-12-10T10:54:00.222Z"
    },
    {
      "id": 2391563,
      "occurrence": 0,
      "final_mark": 0,
      "status": "finished",
      "validated?": false,
      "current_team_id": 3859399,
      "project": {
        "id": 1267,
        "name": "C Piscine C 11",
        "slug": "c-piscine-c-11",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-29T14:44:44.977Z",
      "marked": true,
      "retriable_at": "2021-10-29T15:04:45.075Z",
      "created_at": "2021-10-27T12:37:48.342Z",
      "updated_at": "2021-10-29T14:46:34.293Z"
    },
    {
      "id": 2390976,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3858542,
      "project": {
        "id": 1265,
        "name": "C Piscine C 09",
        "slug": "c-piscine-c-09",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-27T12:36:47.657Z",
      "marked": true,
      "retriable_at": "2021-10-27T12:56:47.725Z",
      "created_at": "2021-10-27T01:55:42.901Z",
      "updated_at": "2021-10-27T12:36:47.740Z"
    },
    {
      "id": 2389576,
      "occurrence": 0,
      "final_mark": 78,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3856609,
      "project": {
        "id": 1304,
        "name": "C Piscine Final Exam",
        "slug": "c-piscine-final-exam",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-29T05:02:11.167Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-26T03:24:25.248Z",
      "updated_at": "2021-12-27T01:37:28.971Z"
    },
    {
      "id": 2388816,
      "occurrence": 1,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3856758,
      "project": {
        "id": 1264,
        "name": "C Piscine C 08",
        "slug": "c-piscine-c-08",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-27T01:55:29.997Z",
      "marked": true,
      "retriable_at": "2021-10-27T02:35:30.068Z",
      "created_at": "2021-10-25T11:58:27.109Z",
      "updated_at": "2021-10-27T01:55:30.083Z"
    },
    {
      "id": 2387994,
      "occurrence": 0,
      "final_mark": 0,
      "status": "finished",
      "validated?": false,
      "current_team_id": 3854530,
      "project": {
        "id": 1270,
        "name": "C Piscine C 07",
        "slug": "c-piscine-c-07",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-28T11:26:25.757Z",
      "marked": true,
      "retriable_at": "2021-10-28T11:46:25.778Z",
      "created_at": "2021-10-25T03:28:02.142Z",
      "updated_at": "2021-10-28T11:26:25.791Z"
    },
    {
      "id": 2387957,
      "occurrence": 1,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3854845,
      "project": {
        "id": 1263,
        "name": "C Piscine C 06",
        "slug": "c-piscine-c-06",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-25T11:33:39.598Z",
      "marked": true,
      "retriable_at": "2021-10-25T12:13:39.701Z",
      "created_at": "2021-10-25T03:06:52.445Z",
      "updated_at": "2021-10-25T11:33:39.715Z"
    },
    {
      "id": 2383745,
      "occurrence": 2,
      "final_mark": 80,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3853509,
      "project": {
        "id": 1262,
        "name": "C Piscine C 05",
        "slug": "c-piscine-c-05",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-25T03:16:39.280Z",
      "marked": true,
      "retriable_at": "2021-10-25T04:16:39.339Z",
      "created_at": "2021-10-20T13:13:44.675Z",
      "updated_at": "2021-10-25T03:16:39.353Z"
    },
    {
      "id": 2383119,
      "occurrence": 0,
      "final_mark": 0,
      "status": "finished",
      "validated?": false,
      "current_team_id": 3849043,
      "project": {
        "id": 1305,
        "name": "C Piscine BSQ",
        "slug": "c-piscine-bsq",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-29T14:44:12.319Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-20T07:44:41.986Z",
      "updated_at": "2021-10-29T14:44:12.377Z"
    },
    {
      "id": 2381750,
      "occurrence": 0,
      "final_mark": 0,
      "status": "finished",
      "validated?": false,
      "current_team_id": 3851503,
      "project": {
        "id": 1309,
        "name": "C Piscine Rush 02",
        "slug": "c-piscine-rush-02",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-27T07:40:19.832Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-19T06:48:06.029Z",
      "updated_at": "2021-10-27T07:40:19.863Z"
    },
    {
      "id": 2381749,
      "occurrence": 0,
      "final_mark": 84,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3845373,
      "project": {
        "id": 1303,
        "name": "C Piscine Exam 02",
        "slug": "c-piscine-exam-02",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-22T06:13:34.932Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-19T06:47:33.328Z",
      "updated_at": "2021-10-22T06:23:07.292Z"
    },
    {
      "id": 2381112,
      "occurrence": 1,
      "final_mark": 70,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3849024,
      "project": {
        "id": 1261,
        "name": "C Piscine C 04",
        "slug": "c-piscine-c-04",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-20T12:51:13.202Z",
      "marked": true,
      "retriable_at": "2021-10-29T15:25:16.946Z",
      "created_at": "2021-10-18T13:59:06.220Z",
      "updated_at": "2021-10-29T14:46:40.318Z"
    },
    {
      "id": 2379028,
      "occurrence": 4,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3853492,
      "project": {
        "id": 1260,
        "name": "C Piscine C 03",
        "slug": "c-piscine-c-03",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-25T02:58:14.361Z",
      "marked": true,
      "retriable_at": "2021-10-25T06:58:14.435Z",
      "created_at": "2021-10-16T11:17:10.437Z",
      "updated_at": "2021-10-25T02:58:14.452Z"
    },
    {
      "id": 2375224,
      "occurrence": 2,
      "final_mark": 85,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3852656,
      "project": {
        "id": 1259,
        "name": "C Piscine C 02",
        "slug": "c-piscine-c-02",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-18T12:51:51.036Z",
      "marked": true,
      "retriable_at": "2021-10-29T15:45:02.588Z",
      "created_at": "2021-10-13T11:36:28.072Z",
      "updated_at": "2021-10-29T14:46:37.170Z"
    },
    {
      "id": 2375223,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3835720,
      "project": {
        "id": 1258,
        "name": "C Piscine C 01",
        "slug": "c-piscine-c-01",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-16T11:00:44.960Z",
      "marked": true,
      "retriable_at": "2021-10-16T11:20:45.041Z",
      "created_at": "2021-10-13T11:36:22.059Z",
      "updated_at": "2021-10-16T11:00:45.056Z"
    },
    {
      "id": 2373267,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3832918,
      "project": {
        "id": 1302,
        "name": "C Piscine Exam 01",
        "slug": "c-piscine-exam-01",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-15T07:37:19.323Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-12T10:31:30.393Z",
      "updated_at": "2021-12-27T01:35:48.378Z"
    },
    {
      "id": 2373140,
      "occurrence": 0,
      "final_mark": 88,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3840024,
      "project": {
        "id": 1310,
        "name": "C Piscine Rush 01",
        "slug": "c-piscine-rush-01",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-20T07:15:20.523Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-12T09:35:51.107Z",
      "updated_at": "2021-10-20T07:15:21.149Z"
    },
    {
      "id": 2368108,
      "occurrence": 0,
      "final_mark": 0,
      "status": "finished",
      "validated?": false,
      "current_team_id": 3829003,
      "project": {
        "id": 1308,
        "name": "C Piscine Rush 00",
        "slug": "c-piscine-rush-00",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-16T08:51:05.156Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-06T11:12:40.242Z",
      "updated_at": "2021-10-16T08:51:05.216Z"
    },
    {
      "id": 2368107,
      "occurrence": 0,
      "final_mark": 80,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3825966,
      "project": {
        "id": 1301,
        "name": "C Piscine Exam 00",
        "slug": "c-piscine-exam-00",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-08T06:21:46.067Z",
      "marked": true,
      "retriable_at": null,
      "created_at": "2021-10-06T11:12:03.437Z",
      "updated_at": "2021-10-08T07:58:42.765Z"
    },
    {
      "id": 2368073,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3825912,
      "project": {
        "id": 1257,
        "name": "C Piscine C 00",
        "slug": "c-piscine-c-00",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-13T11:32:50.136Z",
      "marked": true,
      "retriable_at": "2021-10-13T11:52:50.243Z",
      "created_at": "2021-10-06T10:48:25.412Z",
      "updated_at": "2021-10-13T11:32:50.258Z"
    },
    {
      "id": 2364219,
      "occurrence": 0,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3820897,
      "project": {
        "id": 1256,
        "name": "C Piscine Shell 01",
        "slug": "c-piscine-shell-01",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-13T11:08:49.422Z",
      "marked": true,
      "retriable_at": "2021-10-13T11:28:49.489Z",
      "created_at": "2021-10-04T05:00:13.873Z",
      "updated_at": "2021-10-13T11:08:49.503Z"
    },
    {
      "id": 2364214,
      "occurrence": 1,
      "final_mark": 100,
      "status": "finished",
      "validated?": true,
      "current_team_id": 3827101,
      "project": {
        "id": 1255,
        "name": "C Piscine Shell 00",
        "slug": "c-piscine-shell-00",
        "parent_id": null
      },
      "cursus_ids": [
        9
      ],
      "marked_at": "2021-10-16T12:44:16.505Z",
      "marked": true,
      "retriable_at": "2021-10-16T13:24:16.597Z",
      "created_at": "2021-10-04T04:53:56.788Z",
      "updated_at": "2021-10-16T12:44:16.614Z"
    }
  ],
  "languages_users": [
    {
      "id": 443077,
      "language_id": 14,
      "user_id": 99828,
      "position": 1,
      "created_at": "2021-10-18T05:55:20.763Z"
    },
    {
      "id": 443078,
      "language_id": 2,
      "user_id": 99828,
      "position": 2,
      "created_at": "2021-10-18T05:55:20.818Z"
    }
  ],
  "achievements": [
    {
      "id": 41,
      "name": "All work and no play makes Jack a dull boy",
      "description": "Logged for a total of 90 hours over a week.",
      "tier": "none",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/41/SCO001.svg",
      "nbr_of_success": null,
      "users_url": "https://api.intra.42.fr/v2/achievements/41/users"
    },
    {
      "id": 54,
      "name": "Attendee",
      "description": "Attended 1 event.",
      "tier": "none",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/54/SCO003.svg",
      "nbr_of_success": 1,
      "users_url": "https://api.intra.42.fr/v2/achievements/54/users"
    },
    {
      "id": 55,
      "name": "Attendee",
      "description": "Attended 3 events.",
      "tier": "none",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/55/SCO003.svg",
      "nbr_of_success": 3,
      "users_url": "https://api.intra.42.fr/v2/achievements/55/users"
    },
    {
      "id": 56,
      "name": "Attendee",
      "description": "Attended 10 events.",
      "tier": "easy",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/56/SCO003.svg",
      "nbr_of_success": 10,
      "users_url": "https://api.intra.42.fr/v2/achievements/56/users"
    },
    {
      "id": 57,
      "name": "Attendee",
      "description": "Attended 21 events.",
      "tier": "medium",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/57/SCO003.svg",
      "nbr_of_success": 21,
      "users_url": "https://api.intra.42.fr/v2/achievements/57/users"
    },
    {
      "id": 169,
      "name": "Bill Gates",
      "description": "Donated 1 evaluation point to the pool.",
      "tier": "none",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/169/BADGE_SCOLARITY_billgates.svg",
      "nbr_of_success": 2,
      "users_url": "https://api.intra.42.fr/v2/achievements/169/users"
    },
    {
      "id": 170,
      "name": "Bill Gates",
      "description": "Donated 10 evaluation points to the pool.",
      "tier": "none",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/170/BADGE_SCOLARITY_billgates.svg",
      "nbr_of_success": 10,
      "users_url": "https://api.intra.42.fr/v2/achievements/170/users"
    },
    {
      "id": 171,
      "name": "Bill Gates",
      "description": "Donated 21 evaluation points to the pool.",
      "tier": "none",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/171/BADGE_SCOLARITY_billgates.svg",
      "nbr_of_success": 21,
      "users_url": "https://api.intra.42.fr/v2/achievements/171/users"
    },
    {
      "id": 17,
      "name": "Bonus Hunter",
      "description": "Validated 1 project with the maximum score.",
      "tier": "easy",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/17/PRO005.svg",
      "nbr_of_success": 1,
      "users_url": "https://api.intra.42.fr/v2/achievements/17/users"
    },
    {
      "id": 18,
      "name": "Bonus Hunter",
      "description": "Validated 3 projects with the maximum score.",
      "tier": "medium",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/18/PRO005.svg",
      "nbr_of_success": 3,
      "users_url": "https://api.intra.42.fr/v2/achievements/18/users"
    },
    {
      "id": 19,
      "name": "Bonus Hunter",
      "description": "Validated 10 projects with the maximum score.",
      "tier": "hard",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/19/PRO005.svg",
      "nbr_of_success": 10,
      "users_url": "https://api.intra.42.fr/v2/achievements/19/users"
    },
    {
      "id": 20,
      "name": "Bonus Hunter",
      "description": "Validated 21 projects with the maximum score.",
      "tier": "challenge",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/20/PRO005.svg",
      "nbr_of_success": 21,
      "users_url": "https://api.intra.42.fr/v2/achievements/20/users"
    },
    {
      "id": 4,
      "name": "Code Explorer",
      "description": "Valided your first project.",
      "tier": "none",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/4/PRO002.svg",
      "nbr_of_success": 1,
      "users_url": "https://api.intra.42.fr/v2/achievements/4/users"
    },
    {
      "id": 5,
      "name": "Code Explorer",
      "description": "Validated 3 projects",
      "tier": "none",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/5/PRO002.svg",
      "nbr_of_success": 3,
      "users_url": "https://api.intra.42.fr/v2/achievements/5/users"
    },
    {
      "id": 6,
      "name": "Code Explorer",
      "description": "Validated 10 projects.",
      "tier": "none",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/6/PRO002.svg",
      "nbr_of_success": 10,
      "users_url": "https://api.intra.42.fr/v2/achievements/6/users"
    },
    {
      "id": 7,
      "name": "Code Explorer",
      "description": "Validated 21 projects.",
      "tier": "none",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/7/PRO002.svg",
      "nbr_of_success": 21,
      "users_url": "https://api.intra.42.fr/v2/achievements/7/users"
    },
    {
      "id": 50,
      "name": "Film buff",
      "description": "Watched 42 videos from the e-learning.",
      "tier": "none",
      "kind": "pedagogy",
      "visible": true,
      "image": "/uploads/achievement/image/50/PED005.svg",
      "nbr_of_success": 42,
      "users_url": "https://api.intra.42.fr/v2/achievements/50/users"
    },
    {
      "id": 45,
      "name": "Home is where the code is",
      "description": "Logged into the same cluster for a month in a row",
      "tier": "none",
      "kind": "scolarity",
      "visible": true,
      "image": "/uploads/achievement/image/45/SCO002.svg",
      "nbr_of_success": null,
      "users_url": "https://api.intra.42.fr/v2/achievements/45/users"
    },
    {
      "id": 82,
      "name": "I have no idea what I'm doing",
      "description": "Made a defense without having validated the project.",
      "tier": "none",
      "kind": "pedagogy",
      "visible": true,
      "image": "/uploads/achievement/image/82/PED011.svg",
      "nbr_of_success": null,
      "users_url": "https://api.intra.42.fr/v2/achievements/82/users"
    },
    {
      "id": 84,
      "name": "I'm reliable !",
      "description": "Participated in 21 defenses in a row without missing any.",
      "tier": "easy",
      "kind": "pedagogy",
      "visible": true,
      "image": "/uploads/achievement/image/84/PED009.svg",
      "nbr_of_success": 21,
      "users_url": "https://api.intra.42.fr/v2/achievements/84/users"
    },
    {
      "id": 36,
      "name": "It's a rich man's world",
      "description": "Collected 100 wallet points.",
      "tier": "none",
      "kind": "social",
      "visible": true,
      "image": "/uploads/achievement/image/36/SOC004.svg",
      "nbr_of_success": 100,
      "users_url": "https://api.intra.42.fr/v2/achievements/36/users"
    },
    {
      "id": 37,
      "name": "It's a rich man's world",
      "description": "Collected 200 wallet points.",
      "tier": "none",
      "kind": "social",
      "visible": true,
      "image": "/uploads/achievement/image/37/SOC004.svg",
      "nbr_of_success": 200,
      "users_url": "https://api.intra.42.fr/v2/achievements/37/users"
    },
    {
      "id": 38,
      "name": "It's a rich man's world",
      "description": "Collected 500 wallet points.",
      "tier": "none",
      "kind": "social",
      "visible": true,
      "image": "/uploads/achievement/image/38/SOC004.svg",
      "nbr_of_success": 500,
      "users_url": "https://api.intra.42.fr/v2/achievements/38/users"
    },
    {
      "id": 25,
      "name": "Rigorous Basterd",
      "description": "Validated 3 projects in a row (Piscine days included).",
      "tier": "none",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/25/PRO010.svg",
      "nbr_of_success": 3,
      "users_url": "https://api.intra.42.fr/v2/achievements/25/users"
    },
    {
      "id": 26,
      "name": "Rigorous Basterd",
      "description": "Validated 10 projects in a row (Piscine days included).",
      "tier": "easy",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/26/PRO010.svg",
      "nbr_of_success": 10,
      "users_url": "https://api.intra.42.fr/v2/achievements/26/users"
    },
    {
      "id": 1,
      "name": "Welcome, Cadet !",
      "description": "You have passed the C Piscine! Welcome to 42!",
      "tier": "none",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/1/PRO001.svg",
      "nbr_of_success": null,
      "users_url": "https://api.intra.42.fr/v2/achievements/1/users"
    },
    {
      "id": 218,
      "name": "Welcome, Learner !",
      "description": "You passed the C Piscine. Welcome at 42!",
      "tier": "none",
      "kind": "project",
      "visible": true,
      "image": "/uploads/achievement/image/218/PRO001-2.svg",
      "nbr_of_success": null,
      "users_url": "https://api.intra.42.fr/v2/achievements/218/users"
    },
    {
      "id": 77,
      "name": "Writer's soul",
      "description": "Wrote 42 comments with more than 180 characters in corrections. Make sure you put in a constructive feedback.",
      "tier": "none",
      "kind": "pedagogy",
      "visible": true,
      "image": "/uploads/achievement/image/77/PED013.svg",
      "nbr_of_success": null,
      "users_url": "https://api.intra.42.fr/v2/achievements/77/users"
    }
  ],
  "titles": [
    {
      "id": 55,
      "name": "Mastermind %login"
    },
    {
      "id": 1170,
      "name": "%login Developer of 42polar 🚀"
    },
    {
      "id": 1328,
      "name": "%login, Writer's soul"
    }
  ],
  "titles_users": [
    {
      "id": 27154,
      "user_id": 99828,
      "title_id": 55,
      "selected": true,
      "created_at": "2023-05-16T06:54:32.922Z",
      "updated_at": "2023-12-25T06:55:07.499Z"
    },
    {
      "id": 17560,
      "user_id": 99828,
      "title_id": 1170,
      "selected": false,
      "created_at": "2022-11-07T06:35:11.484Z",
      "updated_at": "2023-12-25T06:55:07.488Z"
    },
    {
      "id": 23183,
      "user_id": 99828,
      "title_id": 1328,
      "selected": false,
      "created_at": "2023-03-08T12:41:08.551Z",
      "updated_at": "2023-03-08T12:41:08.551Z"
    }
  ],
  "partnerships": [],
  "patroned": [],
  "patroning": [],
  "expertises_users": [
    {
      "id": 61612,
      "expertise_id": 36,
      "interested": true,
      "value": 2,
      "contact_me": false,
      "created_at": "2021-10-16T04:15:35.408Z",
      "user_id": 99828
    },
    {
      "id": 61596,
      "expertise_id": 6,
      "interested": true,
      "value": 4,
      "contact_me": false,
      "created_at": "2021-10-15T12:56:41.379Z",
      "user_id": 99828
    }
  ],
  "roles": [],
  "campus": [
    {
      "id": 29,
      "name": "Seoul",
      "time_zone": "Asia/Seoul",
      "language": {
        "id": 14,
        "name": "Korean",
        "identifier": "ko",
        "created_at": "2020-01-08T10:56:47.481Z",
        "updated_at": "2024-08-20T06:37:56.686Z"
      },
      "users_count": 6174,
      "vogsphere_id": 19,
      "country": "Korea, Republic of",
      "address": "Gaepo Digital Innovation Park, 416, Gaepo-ro, Gangnam-gu",
      "zip": "06324",
      "city": "Seoul",
      "website": "https://www.42seoul.kr",
      "facebook": "https://www.facebook.com/inno.aca/  ",
      "twitter": "",
      "active": true,
      "public": true,
      "email_extension": "42seoul.kr",
      "default_hidden_phone": false
    },
    {
      "id": 26,
      "name": "Tokyo",
      "time_zone": "Asia/Tokyo",
      "language": {
        "id": 13,
        "name": "Japanese",
        "identifier": "ja",
        "created_at": "2019-11-15T13:34:10.581Z",
        "updated_at": "2024-09-06T13:36:11.416Z"
      },
      "users_count": 5938,
      "vogsphere_id": 17,
      "country": "Japan",
      "address": "Sumitomo Fudosan Roppongi Grand Tower 3-2-1 Roppongi Minato-ku reception: 24F",
      "zip": "106-6224",
      "city": "Tokyo",
      "website": "https://42tokyo.jp",
      "facebook": "https://www.facebook.com/42tokyo/",
      "twitter": "https://twitter.com/42_tokyo",
      "active": true,
      "public": true,
      "email_extension": "42tokyo.jp",
      "default_hidden_phone": true
    }
  ],
  "campus_users": [
    {
      "id": 91458,
      "user_id": 99828,
      "campus_id": 29,
      "is_primary": false,
      "created_at": "2021-10-04T03:06:02.745Z",
      "updated_at": "2021-10-04T03:06:02.745Z"
    },
    {
      "id": 144549,
      "user_id": 99828,
      "campus_id": 26,
      "is_primary": true,
      "created_at": "2023-06-01T05:06:40.776Z",
      "updated_at": "2023-06-01T07:50:28.917Z"
    }
  ]
}
*/
