"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../../users/daos/users.dao"));
const errors_1 = require("../../../common/utils/errors");
const utils_1 = __importDefault(require("../../../common/utils/utils"));
const Jwt_utils_1 = __importDefault(require("../../../common/utils/Jwt.utils"));
const env_1 = require("../../../config/env");
class AuthService {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_dao_1.default.findOne({ email });
            if (!user) {
                throw new errors_1.NotFoundError('User not found');
            }
            const isUserProfile = user.passwordHash ? user.passwordHash : undefined;
            if (!isUserProfile) {
                throw new errors_1.ForbiddenError('User profile not found');
            }
            if (!user.verified) {
                throw new errors_1.ForbiddenError('Email needs verification');
            }
            if (user.lock) {
                throw new errors_1.ForbiddenError('Access denied, contact support');
            }
            const isPasswordMatch = yield users_dao_1.default.comparePasswords(user, password);
            if (!isPasswordMatch) {
                throw new errors_1.BadRequestError('Wrong password or email');
            }
            const token = yield Jwt_utils_1.default.generateLoginToken(user);
            const _a = utils_1.default.parseToJSON(user), { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
            return {
                user: userData,
                access_token: token,
                token_type: env_1.JWT_BEARER,
                expiresIn: env_1.JWT_EXPIRATION_MINUTES,
            };
        });
    }
}
exports.default = new AuthService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvYXV0aC9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRUFBa0Q7QUFDbEQseURBSXNDO0FBS3RDLHdFQUFnRDtBQUNoRCxnRkFBdUQ7QUFDdkQsNkNBQXlFO0FBRXpFLE1BQU0sV0FBVztJQUNULEtBQUssQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7O1lBQ3pDLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1QsTUFBTSxJQUFJLHNCQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUMzQztZQUVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUN4RSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNsQixNQUFNLElBQUksdUJBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2FBQ3BEO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSx1QkFBYyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDdEQ7WUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLHVCQUFjLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzthQUM1RDtZQUVELE1BQU0sZUFBZSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDcEIsTUFBTSxJQUFJLHdCQUFlLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUN0RDtZQUVELE1BQU0sS0FBSyxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RCxNQUFNLEtBQWdDLGVBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQXZELEVBQUUsWUFBWSxPQUF5QyxFQUFwQyxRQUFRLGNBQTNCLGdCQUE2QixDQUEwQixDQUFDO1lBQzlELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLFVBQVUsRUFBRSxnQkFBVTtnQkFDdEIsU0FBUyxFQUFFLDRCQUFzQjthQUNsQyxDQUFDO1FBQ0osQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLFdBQVcsRUFBRSxDQUFDIn0=