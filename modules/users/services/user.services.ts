import UsersDao from "../daos/users.dao";
import { CRUD } from "../../../common/interfaces/crud.interface";
import { CreateUserDto } from "../dto/create.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { BadRequestError, NotFoundError } from "../../../common/utils/errors";

class UsersService implements CRUD {
	async create(resource: CreateUserDto) {
		return UsersDao.addUser(resource);
	}

	async putById(id: string, resource: PutUserDto): Promise<any> {
		return UsersDao.putUserById(id, resource);
	}

	async getById(id: string) {
		return UsersDao.getUserById(id);
	}

	async getAll(limit: number, page: number) {
		return UsersDao.getAllUsers();
	}

	async getUserByEmail(email: string) {
		return UsersDao.getUserByEmail(email);
	}
	async transferMoney(
		userId: string,
		payload: { amount: number; email: string }
	) {
		const sender: any = await UsersDao.getUserById(userId);
		if (!sender) {
			throw new NotFoundError("Sender not found");
		}

		const receiver: any = await UsersDao.getUserByEmail(payload.email);
		if (!receiver) {
			throw new NotFoundError("recipient not found");
		}

		const amt = Number(payload.amount);
		if (sender.balance < amt) {
			throw new BadRequestError("balance too low for this transaction");
		}

		const senderBal = Number(sender.balance) - amt;
		const receiverBalance = Number(receiver.balance) + amt;

		await UsersDao.putUserById(userId, { balance: senderBal });
		await UsersDao.putUserById(receiver._id, { balance: receiverBalance });

		return { senderBal: senderBal, message: "Transaction complete" };
	}
}

export default new UsersService();
