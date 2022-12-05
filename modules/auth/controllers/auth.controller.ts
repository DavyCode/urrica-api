import express from "express";
import debug from "debug";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION_MINUTES } from "../../../config/env";

const log: debug.IDebugger = debug("app:auth-controller");

// @ts-expect-error
const jwtSecret: string = JWT_SECRET;
const tokenExpirationInSeconds = JWT_EXPIRATION_MINUTES;

class AuthController {
	async createJWT(req: express.Request, res: express.Response) {
		try {
			const token = await jwt.sign(req.body, jwtSecret, {
				expiresIn: tokenExpirationInSeconds,
			});
			return res.status(201).send({
				status: "success",
				data: { accessToken: token, user: req.body },
			});
		} catch (error) {
			log("createJWT error: %O", error);
			return res
				.status(500)
				.send({ status: "error", message: "Failed to generate Token" });
		}
	}
}

export default new AuthController();
