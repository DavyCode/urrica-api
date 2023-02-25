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
      .all()
      .get(
        UsersMiddleware.validateAuthUserExist,
        accessAuthMiddleware.ensureSupport,
        accessAuthMiddleware.grantRoleAccess('readAny', 'User'),
        usersController.getAllUsers,
      )
      .post(
        UsersValidationMiddleware.CreateUserValidator,
        usersController.createUser,
      );

    // this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app.param(`${API_BASE_URI}/userId`, UsersMiddleware.extractUserId);

    this.app
      .route(`${API_BASE_URI}/users/:userId`)
      .all(
        accessAuthMiddleware.ensureAuth,
        UsersMiddleware.validateAuthUserExist,
        accessAuthMiddleware.allowSameUserOrAdmin,
      )
      .get(
        accessAuthMiddleware.grantRoleAccess('readOwn', 'User'),
        usersController.getUser,
      )
      .put(
        accessAuthMiddleware.grantRoleAccess('updateOwn', 'User'),
        UsersValidationMiddleware.UpdateUserValidator,
        usersController.updateUser,
      )
      .patch(
        accessAuthMiddleware.grantRoleAccess('updateOwn', 'User'),
        UsersValidationMiddleware.UpdateUserValidator,
        usersController.patchUser,
      );

    this.app.get(`${API_BASE_URI}/users/verify/otp/:email`, [
      UsersValidationMiddleware.emailParamsValidator,
      usersController.getVerifyUserOtp,
    ]);

    this.app.get(`${API_BASE_URI}/users/verify/:otp`, [
      UsersValidationMiddleware.otpValidator,
      usersController.verifyUserOtp,
    ]);

    this.app.put(`${API_BASE_URI}/users/password/:userId`, [
      accessAuthMiddleware.ensureAuth,
      UsersMiddleware.validateAuthUserExist,
      accessAuthMiddleware.allowSameUserOrAdmin,
      accessAuthMiddleware.grantRoleAccess('updateOwn', 'User'),
      UsersValidationMiddleware.changePasswordValidator,
      usersController.changePassword,
    ]);

    this.app
      .route(`${API_BASE_URI}/users/password/reset/:email`)
      .all(UsersValidationMiddleware.emailParamsValidator)
      .get(usersController.getPasswordResetOtp);

    this.app
      .route(`${API_BASE_URI}/users/password/reset/:otp/:password`)
      .all(UsersValidationMiddleware.passwordResetConfirmValidator)
      .get(usersController.resetPassword);

    return this.app;
  }
}
