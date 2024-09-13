import { ROLES } from '../enum/roles.enum';

export class AuthResponse {
  jwt: string;
  user: {
    intraId: string;
    role: ROLES;
    join: boolean;
  };
}
