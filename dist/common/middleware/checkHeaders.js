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
const Jwt_utils_1 = __importDefault(require("../utils/Jwt.utils"));
const env_1 = require("../../config/env");
class checkHeaders {
    /**
     * checkHeadersForAuthorization
     * @param request
     * @param response
     * @param next
     */
    checkHeadersForAuthorization(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request.headers &&
                request.headers.authorization &&
                request.headers.authorization.split(' ')[0] === env_1.JWT_BEARER) {
                const userJWT = yield Jwt_utils_1.default.verifyToken(request.headers.authorization);
                if (userJWT) {
                    response.locals.jwt = userJWT;
                    next();
                }
                else {
                    response.locals.jwt = undefined;
                    next();
                }
            }
            else {
                response.locals.jwt = undefined;
                next();
            }
        });
    }
}
exports.default = new checkHeaders();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tIZWFkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL21pZGRsZXdhcmUvY2hlY2tIZWFkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUVBQTBDO0FBRTFDLDBDQUE4QztBQUU5QyxNQUFNLFlBQVk7SUFDaEI7Ozs7O09BS0c7SUFDRyw0QkFBNEIsQ0FDaEMsT0FBZ0IsRUFDaEIsUUFBa0IsRUFDbEIsSUFBa0I7O1lBRWxCLElBQ0UsT0FBTyxDQUFDLE9BQU87Z0JBQ2YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhO2dCQUM3QixPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQVUsRUFDMUQ7Z0JBQ0EsTUFBTSxPQUFPLEdBQUcsTUFBTSxtQkFBUSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLE9BQU8sRUFBRTtvQkFDWCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7b0JBQzlCLElBQUksRUFBRSxDQUFDO2lCQUNSO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQztvQkFDaEMsSUFBSSxFQUFFLENBQUM7aUJBQ1I7YUFDRjtpQkFBTTtnQkFDTCxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUM7Z0JBQ2hDLElBQUksRUFBRSxDQUFDO2FBQ1I7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksWUFBWSxFQUFFLENBQUMifQ==