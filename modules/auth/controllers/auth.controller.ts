import { Request, Response } from "express";
import debug from "debug";
import { JWT_SECRET, JWT_REFRESH_TIME } from "../../../config/env";
import JWTMiddleware from "../middleware/jwt.middleware";
import CacheService from "../../../setup/cache.service";
import UserService from "../../users/services/user.services";

const log: debug.IDebugger = debug("app:auth-controller");

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;
const refreshExpiry: number | undefined = Number(JWT_REFRESH_TIME);

class AuthController {
	async createJWT(req: Request, res: Response) {
		const user = res.locals.user;
		try {
			const { token, refresh } = JWTMiddleware.genToken(user);

			return res.status(200).send({
				status: "success",
				data: { accessToken: token, refreshToken: refresh },
			});
		} catch (err: any) {
			log("createJWT error: %O", err);
			return res
				.status(500)
				.send({ status: "error", message: "Failed to generate Token" });
		}
	}

	async refreshToken(req: Request, res: Response) {
		const email = res.locals.email;
		try {
			const user: any = await UserService.getUserByEmail(email);
			if (!user) {
				return res.status(500).send({
					status: "error",
					message: "User refresh user does not exist",
				});
			}
			const refreshToken = req.body.refreshToken;
			await CacheService.setCache(refreshToken, "1", refreshExpiry);

			const { token, refresh } = JWTMiddleware.genToken(user);

			return res.status(200).send({
				status: "success",
				data: { accessToken: token, refreshToken: refresh },
			});
		} catch (err: any) {
			log("createJWT error: %O", err);
			return res
				.status(500)
				.send({ status: "error", message: "Failed to generate refresh Token" });
		}
	}
}

export default new AuthController();
