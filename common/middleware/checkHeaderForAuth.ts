// import Userauth from '../utils/Userauth';
import express from "express";
import { JWT_BEARER } from "../../config/env";

export default async (
	request: express.Request,
	response: express.Response,
	next: express.NextFunction
) => {
	if (
		request.headers &&
		request.headers.authorization &&
		request.headers.authorization.split(" ")[0] === JWT_BEARER
	) {
		const user = ""; // await Userauth.verifyToken(request.headers.authorization);

		if (user) {
			// request.user = user as any;
			next();
		} else {
			// request.user = undefined;
			next();
		}
	} else {
		// request.user = undefined;
		next();
	}
};
