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
const debug_1 = __importDefault(require("debug"));
const user_services_1 = __importDefault(require("../services/user.services"));
const errors_1 = require("../../../common/utils/errors");
const errorMessages_1 = require("../../../common/constant/errorMessages");
const log = (0, debug_1.default)('app:users-controller-middleware');
class UsersMiddleware {
    validateUserExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.default.getById(req.params.userId);
            if (user) {
                next();
            }
            else {
                throw new errors_1.NotFoundError(errorMessages_1.userErrors.userIdNotFound);
            }
        });
    }
    validateSameEmailExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.default.getUserByEmail(req.body.email);
            if (user) {
                throw new errors_1.NotFoundError(errorMessages_1.emailErrors.emailTaken);
            }
            else {
                next();
            }
        });
    }
    validateSameEmailAndVerified(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_services_1.default.getUserByEmail(req.body.email);
            if (user && user.verified) {
                throw new errors_1.ForbiddenError(errorMessages_1.emailErrors.emailTakenAndVerified);
            }
            else {
                next();
            }
        });
    }
    extractUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.userId = req.params.userId;
            next();
        });
    }
}
exports.default = new UsersMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvdXNlcnMvbWlkZGxld2FyZS91c2Vycy5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLDhFQUFxRDtBQUVyRCx5REFJc0M7QUFDdEMsMEVBR2dEO0FBRWhELE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBRXRFLE1BQU0sZUFBZTtJQUNiLGtCQUFrQixDQUN0QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNELElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLHNCQUFhLENBQUMsMEJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNwRDtRQUNILENBQUM7S0FBQTtJQUVLLHNCQUFzQixDQUMxQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9ELElBQUksSUFBSSxFQUFFO2dCQUNSLE1BQU0sSUFBSSxzQkFBYSxDQUFDLDJCQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDakQ7aUJBQU07Z0JBQ0wsSUFBSSxFQUFFLENBQUM7YUFDUjtRQUNILENBQUM7S0FBQTtJQUVLLDRCQUE0QixDQUNoQyxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9ELElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pCLE1BQU0sSUFBSSx1QkFBYyxDQUFDLDJCQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUM3RDtpQkFBTTtnQkFDTCxJQUFJLEVBQUUsQ0FBQzthQUNSO1FBQ0gsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUNqQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDcEMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==