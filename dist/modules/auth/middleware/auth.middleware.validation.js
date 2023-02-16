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
class AuthValidationMiddleware {
    AuthUserValidator(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = joi_1.default.object()
                .keys({
                password: joi_1.default.string().min(8).required(),
                email: joi_1.default.string().email().required(),
            })
                .with('email', 'password');
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
}
exports.default = new AuthValidationMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5taWRkbGV3YXJlLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL2F1dGgvbWlkZGxld2FyZS9hdXRoLm1pZGRsZXdhcmUudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDhDQUFzQjtBQUN0Qix5R0FBaUY7QUFHakYsTUFBTSx3QkFBd0I7SUFDdEIsaUJBQWlCLENBQ3JCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLE1BQU0sR0FBRyxhQUFHLENBQUMsTUFBTSxFQUFFO2lCQUN4QixJQUFJLENBQUM7Z0JBQ0osUUFBUSxFQUFFLGFBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO2dCQUN4QyxLQUFLLEVBQUUsYUFBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTthQUN2QyxDQUFDO2lCQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFN0IsSUFBSTtnQkFDRixNQUFNLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFBQyxPQUFPLEdBQVEsRUFBRTtnQkFDakIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDMUIsTUFBTSxFQUFFLDhCQUFvQixDQUFDLHVCQUF1QjtvQkFDcEQsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUN0QyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSx3QkFBd0IsRUFBRSxDQUFDIn0=