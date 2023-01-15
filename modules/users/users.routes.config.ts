import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import UserValidationMiddleware from './middleware/users.middleware.validation';
import JwtMiddleware from '../auth/middleware/jwt.middleware';
import AuthMiddleware from '../auth/middleware/auth.middleware';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  /**
   * Execute default abstract class from parent
   */
  configureRoutes() {
    this.app
      .route(`/users`)
      .post(
        UserValidationMiddleware.CreateUserValidator,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser,
      );

    // this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(UsersMiddleware.validateUserExists, JwtMiddleware.validJWTNeeded)
      .get(UsersController.getUserById);

    this.app.put(`/users/:userId`, [
      JwtMiddleware.validJWTNeeded,
      UserValidationMiddleware.UpdateUserValidator,
      AuthMiddleware.verifyUserPassword,
      UsersController.put,
    ]);

    return this.app;
  }
}
