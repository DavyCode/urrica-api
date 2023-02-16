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
const users_dao_1 = __importDefault(require("../daos/users.dao"));
const errors_1 = require("../../../common/utils/errors");
const errorMessages_1 = require("../../../common/constant/errorMessages");
const user_events_1 = __importDefault(require("../events/user.events"));
const utils_1 = __importDefault(require("../../../common/utils/utils"));
class UsersService {
    /**
     * Create User
     * @param resource CreateUserDto
     * @returns
     */
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            // first check if user exist
            const user = yield users_dao_1.default.findOne({ email: resource.email });
            if (user && user.verified) {
                throw new errors_1.ForbiddenError(errorMessages_1.emailErrors.emailTakenAndVerified);
            }
            if (user && !user.verified) {
                const updatedUser = yield users_dao_1.default.put({ _id: user._id }, {
                    verifyEmailOtp: utils_1.default.RandomInteger().toString().substring(2, 8),
                    'meta.updatedAt': Date.now(),
                }, {
                    new: true,
                    upsert: false,
                });
                // send verification email
                user_events_1.default.emit('user_signup_otp', {
                    firstName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.firstName,
                    email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
                    otp: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.verifyEmailOtp,
                });
                return { message: 'Check your email for verification OTP' };
            }
            const { referredBy } = resource, rest = __rest(resource, ["referredBy"]);
            let referrer = undefined;
            if (referredBy) {
                const refUser = yield users_dao_1.default.findOne({ referredBy });
                if (refUser) {
                    referrer = refUser._id;
                }
            }
            const newUser = yield users_dao_1.default.addUser(Object.assign({ referredBy: referrer }, rest));
            user_events_1.default.emit('welcome_to_urrica', {
                firstName: newUser.firstName,
                email: newUser === null || newUser === void 0 ? void 0 : newUser.email,
                otp: newUser === null || newUser === void 0 ? void 0 : newUser.verifyEmailOtp,
            });
            return { message: 'Check your email for verification OTP' };
        });
    }
    /**
     * putById
     * @param id
     * @param resource
     * @returns
     */
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_dao_1.default.putById(id, resource, {
                new: true,
                upsert: false,
            });
            if (!user) {
                throw new errors_1.NotFoundError(`User ${id} not found`); //TODO: don't send user ID to frontend
            }
            return { user, message: 'Update successful' };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_dao_1.default.getUserById(id);
            if (!user) {
                throw new errors_1.NotFoundError(`User ${id} not found`);
            }
            return {
                user,
            };
        });
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.getAllUsers(query);
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.findOne({ email });
        });
    }
    getUserTotalCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return users_dao_1.default.getUserTotalCount();
        });
    }
    /**
     * verifyUserOtp
     * @param {string} verifyEmailOtp
     * @returns {}
     */
    verifyUserOtp(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!otp) {
                throw new errors_1.BadRequestError('OTP required!');
            }
            const otpUser = yield users_dao_1.default.put({ verifyEmailOtp: otp }, {
                verified: true,
                active: true,
                verifyEmailOtp: '',
                'meta.updatedAt': Date.now(),
            }, { new: true, upsert: false });
            if (!otpUser) {
                throw new errors_1.NotFoundError('Wrong verification OTP');
            }
            user_events_1.default.emit('user_signup_otp_confirmed', {
                email: otpUser.email,
                firstName: otpUser.firstName,
            });
            return { message: 'Email verified' };
        });
    }
    /**
     *
     * @param email
     * @returns
     */
    getVerifyUserOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_dao_1.default.findOne({ email });
            if (!user)
                throw new errors_1.NotFoundError(`User does not exist`);
            if (user && user.verified) {
                throw new errors_1.ForbiddenError(errorMessages_1.emailErrors.emailTakenAndVerified);
            }
            const updatedUser = yield users_dao_1.default.put({ _id: user._id }, {
                verifyEmailOtp: utils_1.default.RandomInteger().toString().substring(2, 8),
                'meta.updatedAt': Date.now(),
            }, {
                new: true,
                upsert: false,
            });
            // send verification email
            user_events_1.default.emit('user_signup_otp', {
                firstName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.firstName,
                email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
                otp: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.verifyEmailOtp,
            });
            return { message: 'Check your email for verification OTP' };
        });
    }
    /**
     * getPasswordResetOtp
     * @param email
     * @returns
     */
    getPasswordResetOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new errors_1.BadRequestError('OTP required!');
            }
            const otpUser = yield users_dao_1.default.put({ email }, {
                verified: true,
                active: true,
                resetPasswordPin: utils_1.default.RandomInteger().toString().substring(2, 8),
                'meta.updatedAt': Date.now(),
            }, { new: true, upsert: false });
            if (!otpUser) {
                throw new errors_1.NotFoundError('User not found');
            }
            user_events_1.default.emit('reset_password_otp', {
                email: otpUser.email,
                firstName: otpUser.firstName,
                otp: otpUser === null || otpUser === void 0 ? void 0 : otpUser.resetPasswordPin,
            });
            return { message: 'Check your email for reset OTP' };
        });
    }
    /**
     * resetPassword
     * @param otp
     * @param password
     * @returns
     */
    resetPassword(otp, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!otp || !password) {
                throw new errors_1.BadRequestError('OTP and new password required!');
            }
            const passwordHash = yield users_dao_1.default.hashPassword(password);
            const user = yield users_dao_1.default.put({ resetPasswordPin: otp }, {
                passwordHash,
                resetPasswordPin: '',
                'meta.updatedAt': Date.now(),
            }, { new: true, upsert: false });
            if (!user) {
                throw new errors_1.NotFoundError('Wrong OTP');
            }
            user_events_1.default.emit('password_reset_success', {
                email: user.email,
                firstName: user.firstName,
            });
            return { message: 'Good to go', user };
        });
    }
    changePassword(oldPassword, newPassword, confirmPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_dao_1.default.findOne({ _id: userId });
            if (!user) {
                throw new errors_1.NotFoundError('User not found');
            }
            const isPasswordMatch = yield users_dao_1.default.comparePasswords(user, oldPassword);
            if (!isPasswordMatch) {
                throw new errors_1.BadRequestError('Wrong password');
            }
            if (confirmPassword !== newPassword) {
                throw new errors_1.BadRequestError("Password don't match");
            }
            user.passwordHash = yield users_dao_1.default.hashPassword(newPassword);
            user.meta.updatedAt = Date.now();
            yield users_dao_1.default.save(user);
            const _a = utils_1.default.parseToJSON(user), { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
            return {
                user: userData,
                message: 'Password change successful',
            };
        });
    }
}
exports.default = new UsersService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvdXNlcnMvc2VydmljZXMvdXNlci5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0VBQXlDO0FBS3pDLHlEQUlzQztBQUN0QywwRUFHZ0Q7QUFDaEQsd0VBQTJDO0FBQzNDLHdFQUFnRDtBQUdoRCxNQUFNLFlBQVk7SUFDaEI7Ozs7T0FJRztJQUNHLE1BQU0sQ0FBQyxRQUF1Qjs7WUFDbEMsNEJBQTRCO1lBQzVCLE1BQU0sSUFBSSxHQUFHLE1BQU0sbUJBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDL0QsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDekIsTUFBTSxJQUFJLHVCQUFjLENBQUMsMkJBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2FBQzdEO1lBRUQsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMxQixNQUFNLFdBQVcsR0FBRyxNQUFNLG1CQUFRLENBQUMsR0FBRyxDQUNwQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQ2pCO29CQUNFLGNBQWMsRUFBRSxlQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ2hFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7aUJBQzdCLEVBQ0Q7b0JBQ0UsR0FBRyxFQUFFLElBQUk7b0JBQ1QsTUFBTSxFQUFFLEtBQUs7aUJBQ2QsQ0FDRixDQUFDO2dCQUNGLDBCQUEwQjtnQkFDMUIscUJBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7b0JBQzdCLFNBQVMsRUFBRSxXQUFXLGFB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