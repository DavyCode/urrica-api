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
const debug_1 = __importDefault(require("debug"));
const user_services_1 = __importDefault(require("../services/user.services"));
const apiResponses_1 = require("../../../common/utils/apiResponses");
const log = (0, debug_1.default)('app:users-controller');
class UsersController {
    /**
     * getAllUsers
     * @param req
     * @param res
     */
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rest = __rest(yield user_services_1.default.getAll(req.query), []);
            const controllerRes = new apiResponses_1.apiOKResponse(rest);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.default.getById(req.params.userId);
            res.status(200).send({ status: 'success', data: user });
        });
    }
    /**
     * getUser
     * @param req
     * @param res
     */
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rest = __rest(yield user_services_1.default.getById(req.params.userId), []);
            const controllerRes = new apiResponses_1.apiOKResponse(rest);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    /**
     * createUser
     * @param req
     * @param res
     */
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield user_services_1.default.create(req.body), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    /**
     * updateUser
     * @param req
     * @param res
     */
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield user_services_1.default.putById(req.params.userId, req.body), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    /**
     * patchUser
     * @param req
     * @param res
     */
    patchUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield user_services_1.default.putById(req.params.userId, req.body), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    /**
     * verifyUserOtp
     * @param req
     * @param res
     */
    verifyUserOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield user_services_1.default.verifyUserOtp(req.params.otp), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    getVerifyUserOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield user_services_1.default.getVerifyUserOtp(req.params.email), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    /**
     * getPasswordResetOtp
     * @param req
     * @param res
     */
    getPasswordResetOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = yield user_services_1.default.getPasswordResetOtp(req.params.email), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp, password } = req.params;
            const _a = yield user_services_1.default.resetPassword(otp, password), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { oldPassword, newPassword, confirmPassword } = req.body;
            const _a = yield user_services_1.default.changePassword(oldPassword, newPassword, confirmPassword, res.locals.jwt.userId), { message } = _a, rest = __rest(_a, ["message"]);
            const controllerRes = new apiResponses_1.apiOKResponse(rest, message);
            res.status(controllerRes.statusCode).send(controllerRes);
        });
    }
}
exports.default = new UsersController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvdXNlcnMvY29udHJvbGxlcnMvdXNlcnMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLDhFQUFxRDtBQUNyRCxxRUFHNEM7QUFFNUMsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBQ25COzs7O09BSUc7SUFDRyxXQUFXLENBQUMsR0FBWSxFQUFFLEdBQWE7O1lBQzNDLE1BQVcsSUFBSSxVQUFLLE1BQU0sdUJBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFsRCxFQUFXLENBQXVDLENBQUM7WUFDekQsTUFBTSxhQUFhLEdBQUcsSUFBSSw0QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQUE7SUFFSyxXQUFXLENBQUMsR0FBWSxFQUFFLEdBQWE7O1lBQzNDLE1BQU0sSUFBSSxHQUFHLE1BQU0sdUJBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNHLE9BQU8sQ0FBQyxHQUFZLEVBQUUsR0FBYTs7WUFDdkMsTUFBVyxJQUFJLFVBQUssTUFBTSx1QkFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMs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