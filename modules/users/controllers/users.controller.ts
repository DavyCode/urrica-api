import express from "express";
import usersService from "../services/user.services";
import debug from "debug";
import Utils from "../../../common/utils/";

const log: debug.IDebugger = debug("app:users-controller");

class UsersController {
	async getAllUsers(req: express.Request, res: express.Response) {
		const users = await usersService.getAll(10, 0);
		res.status(200).send({ status: "success", data: users });
	}

	async getUserById(req: express.Request, res: express.Response) {
		const user = await usersService.getById(req.params.userId);
		const userData = Utils.cleanUserResponseData(user);
		res.status(200).send({ status: "success", data: userData });
	}

	async createUser(req: express.Request, res: express.Response) {
		const user = await usersService.create(req.body);
		const userData = Utils.cleanUserResponseData(user);
		res.status(200).send({ status: "success", data: userData });
	}

	async transferMoney(req: express.Request, res: express.Response) {
		const transaction = await usersService.transferMoney(
			res.locals.jwt.userId,
			req.body
		);
		res.status(200).send({ status: "success", data: transaction });
	}
}

export default new UsersController();
