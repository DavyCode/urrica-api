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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const ServerResponseStatus_1 = __importDefault(require("../../../common/constant/ServerResponseStatus"));
class UsersValidationMiddleware {
    //create user validation
    CreateUserValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object()
                .keys({
                password: joi_1.default.string().min(8).required(),
                email: joi_1.default.string().email().required(),
                firstName: joi_1.default.string().min(2).required(),
                lastName: joi_1.default.string().min(2).required(),
                howDidYouHearAboutUs: joi_1.default.string().min(2).required(),
                referredBy: joi_1.default.string(),
            })
                .with('email', 'password');
            try {
                yield schema.validateAsync(req.body);
                if (req.body.password == '00000000' ||
                    req.body.password == 11111111 ||
                    req.body.password == '11111111') {
                    return res.status(ServerResponseStatus_1.default.BAD_REQUEST).json({
                        status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                        errors: ['Kindly choose a stronger password'],
                        statusCode: ServerResponseStatus_1.default.BAD_REQUEST,
                    });
                }
                return next();
            }
            catch (err) {
                return res.status(400).json({
                    status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                    errors: [`${err.details[0].message}`],
                });
            }
        });
    }
    otpValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                otp: joi_1.default.string().min(4).max(10).pattern(new RegExp('^[0-9]')).required(),
            });
            try {
                yield schema.validateAsync(req.params);
                return next();
            }
            catch (err) {
                return res.status(400).json({
                    status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                    errors: [`${err.details[0].message}`],
                });
            }
        });
    }
    emailParamsValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                email: joi_1.default.string().email().required(),
            });
            try {
                yield schema.validateAsync(req.params);
                return next();
            }
            catch (err) {
                return res.status(400).json({
                    status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                    errors: [`${err.details[0].message}`],
                });
            }
        });
    }
    emailValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                email: joi_1.default.string().email().required(),
            });
            try {
                yield schema.validateAsync(req.body);
                return next();
            }
            catch (err) {
                return res.status(400).json({
                    status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                    errors: [`${err.details[0].message}`],
                });
            }
        });
    }
    passwordResetConfirmValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                otp: joi_1.default.string().min(4).max(10).pattern(new RegExp('^[0-9]')).required(),
                password: joi_1.default.string().min(8).required(),
            });
            try {
                yield schema.validateAsync(req.params);
                return next();
            }
            catch (err) {
                return res.status(400).json({
                    status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                    errors: [`${err.details[0].message}`],
                });
            }
        });
    }
    changePasswordValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                confirmPassword: joi_1.default.string().min(8).required(),
                newPassword: joi_1.default.string().min(8).required(),
                oldPassword: joi_1.default.string().min(8).required(),
            });
            try {
                yield schema.validateAsync(req.body);
                if (req.body.newPassword != req.body.confirmPassword) {
                    return res.status(400).send({
                        status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                        errors: [
                            `newPassword ${req.body.newPassword} and confirmPassword ${req.body.confirmPassword} do not match`,
                        ],
                    });
                }
                return next();
            }
            catch (err) {
                return res.status(400).json({
                    status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                    errors: [`${err.details[0].message}`],
                });
            }
        });
    }
    UpdateUserValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object().keys({
                firstName: joi_1.default.string().min(2).required(),
                lastName: joi_1.default.string().min(2).required(),
            });
            try {
                yield schema.validateAsync(req.body);
                if (req.body.newPassword != req.body.confirmPassword) {
                    return res.status(400).send({
                        status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                        errors: [
                            `newPassword ${req.body.newPassword} and confirmPassword ${req.body.confirmPassword} do not match`,
                        ],
                    });
                }
                return next();
            }
            catch (err) {
                return res.status(400).json({
                    status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
                    errors: [`${err.details[0].message}`],
                });
            }
        });
    }
}
exports.default = new UsersValidationMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudmFsaWRhdGlvbi5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy91c2Vycy9taWRkbGV3YXJlL3VzZXJzLnZhbGlkYXRpb24ubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUFzQjtBQUN0Qix5R0FBaUY7QUFHakYsTUFBTSx5QkFBeUI7SUFDN0Isd0JBQXdCO0lBQ2xCLG1CQUFtQixDQUN2QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxNQUFNLEdBQUcsYUFBRyxDQUFDLE1BQU0sRUFBRTtpQkFDeEIsSUFBSSxDQUFDO2dCQUNKLFFBQVEsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDeEMsS0FBSyxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RDLFNBQVMsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDekMsUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUN4QyxvQkFBb0IsRUFBRSxhQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDcEQsVUFBVSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUU7YUFDekIsQ0FBQztpQkFDRCxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRTdCLElBQUk7Z0JBQ0YsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsSUFDRSxHQUFH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