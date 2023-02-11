import express from 'express';
import { CommonRoutesConfig } from '../../common/common.routes.config';
import AuthValidationMiddleware from './middleware/auth.middleware.validation';
import authController from './controllers/auth.controller';
import { API_BASE_URI } from '../../config/env';

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post(`${API_BASE_URI}/auth`, [
      AuthValidationMiddleware.AuthUserValidator,
      authController.authUser,
    ]);

    return this.app;
  }
}
