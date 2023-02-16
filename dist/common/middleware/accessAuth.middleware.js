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
const errors_1 = require("../utils/errors");
const enum_1 = require("../constant/enum");
const accessRolesControl_1 = __importDefault(require("./accessRolesControl"));
class AccessAuthMiddleware {
    /**
     * ensureAuth
     * @param request
     * @param response
     * @param next
     */
    ensureAuth(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.locals.jwt) {
                throw new errors_1.UnauthorizedError('Unauthorized');
            }
            return next();
        });
    }
    ensureAdmin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.locals.jwt) {
                throw new errors_1.UnauthorizedError('Unauthorized');
            }
            if (response.locals.jwt.role !== enum_1.rolesEnum.SUPER_ADMIN) {
                if (response.locals.jwt.role !== enum_1.rolesEnum.ADMIN) {
                    throw new errors_1.UnauthorizedError('Access denied!');
                }
            }
            return next();
        });
    }
    ensureSuperAdmin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.locals.jwt) {
                throw new errors_1.UnauthorizedError('Unauthorized');
            }
            if (response.locals.jwt.role !== enum_1.rolesEnum.SUPER_ADMIN) {
                throw new errors_1.UnauthorizedError('Access denied!');
            }
            return next();
        });
    }
    /**
     * grantRoleAccess
     * @param action
     * @param resource
     * @returns NextFunction
     */
    grantRoleAccess(action, resource) {
        return (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const permission = accessRolesControl_1.default
                .can(response.locals.jwt.role)[action](resource);
            if (!permission.granted) {
                throw new errors_1.UnauthorizedError("You don't have enough permission to perform this action");
            }
            return next();
        });
    }
    ensureSupport(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.locals.jwt) {
                throw new errors_1.UnauthorizedError('Unauthorized');
            }
            if (response.locals.jwt.role !== enum_1.rolesEnum.SUPER_ADMIN) {
                if (response.locals.jwt.role !== enum_1.rolesEnum.ADMIN) {
                    if (response.locals.jwt.role !== enum_1.rolesEnum.SUPPORT) {
                        throw new errors_1.UnauthorizedError('Access denied');
                    }
                }
            }
            return next();
        });
    }
    allowSameUserOrAdmin(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.params &&
                request.params.userId &&
                request.params.userId === response.locals.jwt.userId) {
                return next();
            }
            else {
                const role = response.locals.jwt.role;
                if (role !== enum_1.rolesEnum.SUPER_ADMIN) {
                    if (role !== enum_1.rolesEnum.ADMIN) {
                        if (role !== enum_1.rolesEnum.SUPPORT) {
                            throw new errors_1.UnauthorizedError('Access denied');
                        }
                    }
                }
                return next();
            }
        });
    }
}
exports.default = new AccessAuthMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzQXV0aC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL21pZGRsZXdhcmUvYWNjZXNzQXV0aC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNENBQW9EO0FBQ3BELDJDQUE2QztBQUM3Qyw4RUFBc0Q7QUFFdEQsTUFBTSxvQkFBb0I7SUFDeEI7Ozs7O09BS0c7SUFDRyxVQUFVLENBQ2QsT0FBZ0IsRUFDaEIsUUFBa0IsRUFDbEIsSUFBa0I7O1lBRWxCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDeEIsTUFBTSxJQUFJLDBCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzdDO1lBRUQsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFSyxXQUFXLENBQ2YsT0FBZ0IsRUFDaEIsUUFBa0IsRUFDbEIsSUFBa0I7O1lBRWxCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtnQkFDeEIsTUFBTSxJQUFJLDBCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssZ0JBQVMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RELElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLGdCQUFTLENBQUMsS0FBSyxFQUFFO29CQUNoRCxNQUFNLElBQUksMEJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDL0M7YUFDRjtZQUNELE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQ3BCLE9BQWdCLEVBQ2hCLFFBQWtCLEVBQ2xCLElBQWtCOztZQUVsQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7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