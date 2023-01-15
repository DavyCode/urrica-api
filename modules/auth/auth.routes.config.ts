import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import AuthValidationMiddleware from './middleware/auth.middleware.validation';
import authMiddleware from './middleware/auth.middleware';
import authController from './controllers/auth.controller';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      AuthValidationMiddleware.AuthUserValidator,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);

    return this.app;
  }
}
