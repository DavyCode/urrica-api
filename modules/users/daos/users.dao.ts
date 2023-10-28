import mongooseService from "../../../setup/db/mongoose.services";
import debug from "debug";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { UserDto } from "../dto/user.dto";
import { RolesType } from "../../../common/constant";
import Utils from "../../../common/utils";
import bcrypt from "bcryptjs";
import CacheService from "../../../setup/cache.service";

const log: debug.IDebugger = debug("app:user-dao");

const MongooseSchema = mongooseService.getMongoose().Schema;

class UsersDao {
	Schema = MongooseSchema;
	/**
	 * USER SCHEMA
	 */
	userSchema = new this.Schema({
		firstName: { type: String, trim: true },
		lastName: { type: String, trim: true },
		email: { type: String, trim: true },
		passwordHash: { type: String },
		balance: { type: Number, default: 0 },
		role: {
			type: String,
			default: RolesType.USER,
			enum: [...Utils.getObjectValues(RolesType)],
		},
	});

	User = mongooseService.getMongoose().model("Users", this.userSchema);

	constructor() {
		log("Created new instance of UsersDao");

		this.userSchema.virtual("password").set(function (val: any) {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(val, salt);
			this.passwordHash = hash;
		});
	}

	/**
	 * comparePasswords
	 * @param userInstance
	 * @param password
	 * @returns
	 */
	async comparePasswords(userInstance: any, password: string) {
		return bcrypt.compareSync(password, userInstance.passwordHash);
	}

	/**
	 * hashPassword
	 * @param password
	 * @returns hash string
	 */
	async hashPassword(password: string) {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		return hash;
	}

	/**
	 * addUser
	 * @param userFields
	 * @returns <CreateUserDto>
	 * @public
	 */
	async addUser(userFields: CreateUserDto) {
		const user = new this.User({
			...userFields,
		});

		// clear cache when new user is created
		await CacheService.clearCache(["users-all"]);

		const newUser = await user.save();
		return newUser;
	}

	/**
	 * getAllUsers
	 * @returns UserDto[]
	 * @public
	 */
	async getAllUsers(limit = 25, page = 0) {
		return this.User.find()
			.select("-passwordHash")
			.limit(limit)
			.skip(limit * page)
			.cache({ key: "users-all" }); // set cache with cache key
	}

	/**
	 * putUserById
	 * @param userId
	 * @param userFields
	 * @returns UserDto
	 * @public
	 */
	async putUserById(userId: string, userFields: PutUserDto | PatchUserDto) {
		const existingUser = await this.User.findOneAndUpdate(
			{ _id: userId },
			{ $set: userFields },
			{ new: true }
		).exec();

		return existingUser;
	}

	/**
	 * getUserById
	 * @param userId
	 * @returns UserDto
	 * @public
	 */
	async getUserById(userId: string) {
		return this.User.findOne({ _id: userId }).exec();
	}

	/**
	 * getUserByEmail
	 * @param email
	 * @returns UserDto
	 * @public
	 */
	async getUserByEmail(email: string) {
		return this.User.findOne({ email: email }).exec();
	}
}

export default new UsersDao();
