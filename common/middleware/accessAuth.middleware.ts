import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors';
import { rolesEnum } from '../constant/enum';
import accessRolesControl from './accessRolesControl';

class AccessAuthMiddleware {
  /**
   * ensureAuth
   * @param request
   * @param response
   * @param next
   */
  async ensureAuth(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!response.locals.jwt) {
      throw new UnauthorizedError('Unauthorized');
    }

    next();
  }

  async ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!response.locals.jwt) {
      throw new UnauthorizedError('Unauthorized');
    }
    if (response.locals.jwt.role !== rolesEnum.SUPERADMIN) {
      if (response.locals.jwt.role !== rolesEnum.ADMIN) {
        throw new UnauthorizedError('Access denied!');
      }
    }
    next();
  }

  async ensureSuperAdmin(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!response.locals.jwt) {
      throw new UnauthorizedError('Unauthorized');
    }
    if (response.locals.jwt.role !== rolesEnum.SUPERADMIN) {
      throw new UnauthorizedError('Access denied!');
    }
    next();
  }

  grantRoleAccess(action: string, resource: string) {
    return async (request: Request, response: Response, next: NextFunction) => {
      const permission = accessRolesControl
        .can(response.locals.jwt.role)
        [action](resource);
      if (!permission.granted) {
        throw new UnauthorizedError(
          "You don't have enough permission to perform this action",
        );
      }
      next();
    };
  }

  async ensureSupport(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!response.locals.jwt) {
      throw new UnauthorizedError('Unauthorized');
    }
    if (response.locals.jwt.role !== rolesEnum.SUPERADMIN) {
      if (response.locals.jwt.role !== rolesEnum.ADMIN) {
        if (response.locals.jwt.role !== rolesEnum.SUPPORT) {
          throw new UnauthorizedError('Access denied');
        }
      }
    }
    next();
  }
}

export default new AccessAuthMiddleware();
