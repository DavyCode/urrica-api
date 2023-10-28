import express from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import ValidationMiddleware from "./middleware/auth.validation.middleware";
import AuthValidationMiddleware from "./middleware/auth.middleware";
import authController from "./controllers/auth.controller";
import { API_VERSION } from "../../config/env";
import JwtMiddleware from "./middleware/jwt.middleware";
export class AuthRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "AuthRoutes");
	}

	configureRoutes(): express.Application {
		this.app.post(`${API_VERSION}/auth`, [
			ValidationMiddleware.LoginValidator,
			AuthValidationMiddleware.verifyUserPassword,
			authController.createJWT,
		]);

		this.app.post(`${API_VERSION}/auth/refresh`, [
			ValidationMiddleware.RefreshValidator,
			JwtMiddleware.refresh,
			authController.refreshToken,
		]);

		return this.app;
	}
}
