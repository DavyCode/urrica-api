import express from "express";
import { CommonRoutesConfig } from "../../common/common.routes.config";
import UsersController from "./controllers/users.controller";
import UsersMiddleware from "./middleware/users.middleware";
import ValidationMiddleware from "./middleware/users.validation.middleware";
import JwtMiddleware from "../auth/middleware/jwt.middleware";
import AuthMiddleware from "../auth/middleware/auth.middleware";
import { API_VERSION } from "../../config/env";

export class UsersRoutes extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, "UsersRoutes");
	}

	/**
	 * Execute default abstract class from parent
	 */
	configureRoutes() {
		this.app
			.route(`${API_VERSION}/users`)
			.post(
				ValidationMiddleware.CreateUserValidator,
				UsersMiddleware.validateSameEmailDoesntExist,
				UsersController.createUser
			)
			.get(
				AuthMiddleware.ensureAdmin,
				UsersMiddleware.validateAuthUserExist,
				AuthMiddleware.grantRoleAccess("readAny", "User"),
				UsersController.getAllUsers
			);

		this.app
			.route(`${API_VERSION}/users/:userId`)
			.all(
				AuthMiddleware.ensureAuth,
				UsersMiddleware.validateAuthUserExist,
				JwtMiddleware.validJWTNeeded
			)
			.get(
				AuthMiddleware.grantRoleAccess("readOwn", "User"),
				UsersController.getUserById
			);

		this.app
			.route(`${API_VERSION}/transaction/transfer`)
			.all(
				AuthMiddleware.ensureAuth,
				UsersMiddleware.validateAuthUserExist,
				JwtMiddleware.validJWTNeeded,
				ValidationMiddleware.TransferValidator
			)
			.post(UsersController.transferMoney);

		return this.app;
	}
}
