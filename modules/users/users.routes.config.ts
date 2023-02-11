import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import usersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import UsersValidationMiddleware from './middleware/users.validation.middleware';
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
      .get(accessAuthMiddleware.ensureSupport, usersController.getAllUsers)
      .post(
        UsersValidationMiddleware.CreateUserValidator,
        usersController.createUser,
      );

    // this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app.param(`${API_BASE_URI}/userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`${API_BASE_URI}/users/:userId`)
      .all(accessAuthMiddleware.ensureAuth)
      .get(
        accessAuthMiddleware.grantRoleAccess('readOwn', 'User'),
        accessAuthMiddleware.allowSameUserOrAdmin,
        usersController.getUser,
      );

    this.app.put(`${API_BASE_URI}/users/:userId`, [
      accessAuthMiddleware.ensureAuth,
      accessAuthMiddleware.grantRoleAccess('updateOwn', 'User'),
      accessAuthMiddleware.allowSameUserOrAdmin,
      UsersValidationMiddleware.UpdateUserValidator,
      usersController.updateUser,
    ]);

    this.app.patch(`${API_BASE_URI}/users/:userId`, [
      accessAuthMiddleware.ensureAuth,
      accessAuthMiddleware.grantRoleAccess('updateOwn', 'User'),
      accessAuthMiddleware.allowSameUserOrAdmin,
      UsersValidationMiddleware.UpdateUserValidator,
      usersController.patchUser,
    ]);

    this.app
      .route(`${API_BASE_URI}/users/verify/:otp`)
      .all(UsersValidationMiddleware.otpValidator)
      .get(usersController.verifyUserOtp);

    this.app.put(`${API_BASE_URI}/users/password/:userId`, [
      accessAuthMiddleware.ensureAuth,
      accessAuthMiddleware.grantRoleAccess('updateOwn', 'User'),
      accessAuthMiddleware.allowSameUserOrAdmin,
      UsersValidationMiddleware.changePasswordValidator,
      usersController.changePassword,
    ]);

    this.app
      .route(`${API_BASE_URI}/users/password/reset/:email`)
      .all(UsersValidationMiddleware.emailValidator)
      .get(usersController.getPasswordResetOtp);

    this.app
      .route(`${API_BASE_URI}/users/password/reset/confirm/:otp/:password`)
      .all(UsersValidationMiddleware.passwordResetConfirmValidator)
      .get(usersController.resetPassword);

    return this.app;
  }
}
