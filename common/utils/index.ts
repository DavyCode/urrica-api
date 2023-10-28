import { UserDto } from "../../modules/users/dto/user.dto";

class Utils {
	getObjectValues(object: Record<string, any> = {}): Array<any> {
		return Object.values(object);
	}

	cleanUserResponseData(user: any) {
		const { passwordHash, __v, ...userData } = JSON.parse(JSON.stringify(user));
		return userData;
	}
}

export default new Utils();
