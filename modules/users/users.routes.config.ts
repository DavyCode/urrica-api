import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import usersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import UsersValidationMiddleware from './middleware/users.validation.middleware';
// import JwtMiddleware from '../auth/middleware/jwt.middleware';
// import AuthMiddleware from '../auth/middleware/auth.middleware';
import { API_BASE_URI } from '../../config/env';
import accessAuthMiddleware from '../../common/middleware/accessAuth.middleware';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  /**
   * Execute default abstract class from parent
   */
  configureRoutes(): express.Application {
    this.app
      .route(`${API_BASE_URI}/users`)
      .get
      // jwtMiddleware.validJWTNeeded,
      // permissionMiddleware.onlyAdminCanDoThisAction,
      // usersController.listUsers
      ()
      .post(
        UsersValidationMiddleware.CreateUserValidator,
        usersController.createUser,
      );

    // this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`${API_BASE_URI}/users/:userId`)
      .all(accessAuthMiddleware.ensureAuth)
      .get(
        accessAuthMiddleware.grantRoleAccess('readOwn', 'User'),
        usersController.getUserById,
      );

    this.app.put(`${API_BASE_URI}/users/:userId`, [
      // JwtMiddleware.validJWTNeeded,
      UsersValidationMiddleware.UpdateUserValidator,
      // AuthMiddleware.verifyUserPassword,
      usersController.put,
    ]);

    this.app
      .route(`${API_BASE_URI}/users/verify/otp`)
      .all(UsersValidationMiddleware.verifyEmailOtpValidator)
      .get(usersController.verifyUserOtp);

    return this.app;
  }
}
