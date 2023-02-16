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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../../config/env");
const errors_1 = require("../utils/errors");
// @ts-expect-error
const jwtSecret = env_1.JWT_SECRET;
const tokenExpirationInSeconds = env_1.JWT_EXPIRATION_MINUTES;
class JwtUtils {
    /**
     * generateLoginToken
     * @param user
     * @returns {string} token
     */
    generateLoginToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield jsonwebtoken_1.default.sign({
                    id: user.id,
                    role: user.role,
                    userId: user._id,
                    iat: Date.now(),
                }, jwtSecret, { expiresIn: tokenExpirationInSeconds });
                return token;
            }
            catch (e) {
                throw new errors_1.InternalServerError(e);
            }
        });
    }
    /**
     * generateRefreshToken
     * @param user
     * @returns {} refreshKey hash
     */
    generateRefreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            const refreshId = user.id + jwtSecret;
            const salt = crypto_1.default.createSecretKey(crypto_1.default.randomBytes(16));
            const hash = crypto_1.default
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            const refreshKey = salt.export();
            return { refreshKey, hash };
        });
    }
    /**
     * verifyToken
     * @param accessToken
     * @returns
     */
    verifyToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = accessToken.split(' ')[1];
            if (token) {
                try {
                    const decode = (yield jsonwebtoken_1.default.verify(token, jwtSecret));
                    return decode;
                }
                catch (err) {
                    return undefined;
                }
            }
            else {
                return undefined;
            }
        });
    }
}
exports.default = new JwtUtils();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnd0LnV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL3V0aWxzL0p3dC51dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGdFQUErQjtBQUMvQixvREFBNEI7QUFFNUIsMENBQXNFO0FBRXRFLDRDQUFzRDtBQUV0RCxtQkFBbUI7QUFDbkIsTUFBTSxTQUFTLEdBQVcsZ0JBQVUsQ0FBQztBQUNyQyxNQUFNLHdCQUF3QixHQUFHLDRCQUFzQixDQUFDO0FBRXhELE1BQU0sUUFBUTtJQUNaOzs7O09BSUc7SUFDRyxrQkFBa0IsQ0FBQyxJQUFhOztZQUNwQyxJQUFJO2dCQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sc0JBQUcsQ0FBQyxJQUFJLENBQzFCO29CQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHO29CQUNoQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtpQkFDaEIsRUFDRCxTQUFTLEVBQ1QsRUFBRSxTQUFTLEVBQUUsd0JBQXdCLEVBQUUsQ0FDeEMsQ0FBQztnQkFDRixPQUFPLEtBQUssQ0FBQzthQUNkO1lBQUMsT0FBTyxDQUFNLEVBQUU7Z0JBQ2YsTUFBTSxJQUFJLDRCQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xDO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNHLG9CQUFvQixDQUFDLElBQWE7O1lBQ3RDLFFBQVE7WUFDUixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUN0QyxNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLGVBQWUsQ0FBQyxnQkFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVELE1BQU0sSUFBSSxHQUFHLGdCQUFNO2lCQUNoQixVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztpQkFDMUIsTUFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO1FBQzlCLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDRyxXQUFXLENBQUMsV0FBbUI7O1lBQ25DLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSTtvQkFDRixNQUFNLE1BQU0sR0FBRyxDQUFDLE1BQU0sc0JBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFTLENBQUM7b0JBQzVELE9BQU8sTUFBTSxDQUFDO2lCQUNmO2dCQUFDLE9BQU8sR0FBRyxFQUFFO29CQUNaLE9BQU8sU0FBUyxDQUFDO2lCQUNsQjthQUNGO2lCQUFNO2dCQUNMLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLFFBQVEsRUFBRSxDQUFDIn0=