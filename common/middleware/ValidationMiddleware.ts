import express from "express";
import Joi from "joi";

class ValidationMiddleware {
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

	async CreateUserValidator(
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

	async UpdateUserValidator(
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) {
		const schema = Joi.object().keys({
			confirmPassword: Joi.string().min(8).required(),
			newPassword: Joi.string().min(8).required(),
			password: Joi.string().min(8).required(),
			email: Joi.string().email().required(),
		});

		try {
			await schema.validateAsync(req.body);
			if (req.body.newPassword != req.body.confirmPassword) {
				return res.status(400).send({
					status: "error",
					errors: `newPassword ${req.body.newPassword} and confirmPassword ${req.body.confirmPassword} do not match`,
				});
			}
			return next();
		} catch (err: any) {
			return res
				.status(400)
				.json({ status: "error", error: `${err.details[0].message}` });
		}
	}
}

export default new ValidationMiddleware();
