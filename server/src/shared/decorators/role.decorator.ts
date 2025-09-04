import { SetMetadata } from '@nestjs/common';

export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',

  SUPER_ADMIN = 'SUPER_ADMIN',
}

export const ROLE_KEY = 'roles';

export const AllowRoles = (...roles: ROLE[]) => {
  return SetMetadata(ROLE_KEY, roles);
};
