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
