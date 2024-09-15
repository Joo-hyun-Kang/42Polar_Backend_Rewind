import { ROLES } from '../enum/roles.enum';

export interface JwtInfo {
  id: string;
  intraId: string;
  role: ROLES;
}

export interface JwtInfoAndJoin {
  jwtinfo: JwtInfo;
  isJoined: boolean;
}
