import express from "express";
import Joi from "joi";

class AuthValidationMiddleware {
	async LoginValidator(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const schema = Joi.object()
			.keys({
				password: Joi.string().min(8).required(),
				email: Joi.string().email().required(),
			})
			.with("email", "password");

		try {
			await schema.validateAsync(req.body);
			return next();
		} catch (err: any) {
			return res
				.status(400)
				.json({ status: "error", message: `${err.details[0].message}` });
		}
	}
	async RefreshValidator(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const schema = Joi.object().keys({
			refreshToken: Joi.string().required(),
			email: Joi.string().email().required(),
		});

		try {
			await schema.validateAsync(req.body);
			return next();
		} catch (err: any) {
			return res
				.status(400)
				.json({ status: "error", message: `${err.details[0].message}` });
		}
	}
}

export default new AuthValidationMiddleware();
