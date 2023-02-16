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
const env_1 = require("../../../config/env");
const auth_services_1 = __importDefault(require("../services/auth.services"));
const apiResponses_1 = require("../../../common/utils/apiResponses");
const log = (0, debug_1.default)('app:auth-controller');
// @ts-expect-error
const jwtSecret = env_1.JWT_SECRET;
const tokenExpirationInSeconds = env_1.JWT_EXPIRATION_MINUTES;
class AuthController {
    // async createJWT(req: Request, res: Response) {
    //   try {
    //     const token = await jwt.sign(req.body, jwtSecret, {
    //       expiresIn: tokenExpirationInSeconds,
    //     });
    //     return res.status(201).send({
    //       status: 'success',
    //       data: { accessToken: token, user: req.body },
    //     });
    //   } catch (error) {
    //     log('createJWT error: %O', error);
    //     return res
    //       .status(500)
    //       .send({ status: 'error', message: 'Failed to generate Token' });
    //   }
    // }
    /**
     * authUser
     * @param req
     * @param res
     */
    authUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rest = __rest(yield auth_services_1.default.login(req.body.email, req.body.password), []);
            const controllerRes = new apiResponses_1.apiOKResponse(rest);
            res.status(controllerRes.statusCode).json(controllerRes);
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbW9kdWxlcy9hdXRoL2NvbnRyb2xsZXJzL2F1dGguY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBRTFCLDZDQUF5RTtBQUN6RSw4RUFBb0Q7QUFDcEQscUVBQW1FO0FBRW5FLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRTFELG1CQUFtQjtBQUNuQixNQUFNLFNBQVMsR0FBVyxnQkFBVSxDQUFDO0FBQ3JDLE1BQU0sd0JBQXdCLEdBQUcsNEJBQXNCLENBQUM7QUFFeEQsTUFBTSxjQUFjO0lBQ2xCLGlEQUFpRDtJQUNqRCxVQUFVO0lBQ1YsMERBQTBEO0lBQzFELDZDQUE2QztJQUM3QyxVQUFVO0lBQ1Ysb0NBQW9DO0lBQ3BDLDJCQUEyQjtJQUMzQixzREFBc0Q7SUFDdEQsVUFBVTtJQUNWLHNCQUFzQjtJQUN0Qix5Q0FBeUM7SUFDekMsaUJBQWlCO0lBQ2pCLHFCQUFxQjtJQUNyQix5RUFBeUU7SUFDekUsTUFBTTtJQUNOLElBQUk7SUFFSjs7OztPQUlHO0lBQ0csUUFBUSxDQUFDLEdBQVksRUFBRSxHQUFhOztZQUN4QyxNQUFXLElBQUksVUFBSyxNQUFNLHVCQUFXLENBQUMsS0FBSyxDQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDZCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FDbEIsRUFISyxFQUFXLENBR2hCLENBQUM7WUFDRixNQUFNLGFBQWEsR0FBRyxJQUFJLDRCQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNELENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxjQUFjLEVBQUUsQ0FBQyJ9