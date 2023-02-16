"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGS_MAIL = exports.MAILER_FROM_OPTION = exports.SES_AWS_CONFIG_SET = exports.BUCKET_AWS_REGION = exports.SECRET_AWS_ACCESS_KEY = exports.ACCESS_AWS_KEY_ID = exports.ENVIRONMENT = exports.PLATFORM_ENVIRONMENT = exports.NODE_ENV = exports.API_BASE_URI = exports.DBURL = exports.JWT_BEARER = exports.JWT_EXPIRATION_MINUTES = exports.JWT_SECRET = exports.PORT = exports.HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.RAILWAY_ENVIRONMENT !== 'production') {
    const dotenvResult = dotenv_1.default.config();
    // if (dotenvResult.error) {
    //   throw dotenvResult.error;
    // }
}
_a = process.env, exports.HOST = _a.HOST, exports.PORT = _a.PORT, exports.JWT_SECRET = _a.JWT_SECRET, exports.JWT_EXPIRATION_MINUTES = _a.JWT_EXPIRATION_MINUTES, exports.JWT_BEARER = _a.JWT_BEARER, exports.DBURL = _a.DBURL, exports.API_BASE_URI = _a.API_BASE_URI, exports.NODE_ENV = _a.NODE_ENV, exports.PLATFORM_ENVIRONMENT = _a.PLATFORM_ENVIRONMENT, exports.ENVIRONMENT = _a.ENVIRONMENT, 
// aws
exports.ACCESS_AWS_KEY_ID = _a.ACCESS_AWS_KEY_ID, exports.SECRET_AWS_ACCESS_KEY = _a.SECRET_AWS_ACCESS_KEY, exports.BUCKET_AWS_REGION = _a.BUCKET_AWS_REGION, exports.SES_AWS_CONFIG_SET = _a.SES_AWS_CONFIG_SET, exports.MAILER_FROM_OPTION = _a.MAILER_FROM_OPTION, exports.LOGS_MAIL = _a.LOGS_MAIL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29uZmlnL2Vudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsS0FBSyxZQUFZLEVBQUU7SUFDcEQsTUFBTSxZQUFZLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyQyw0QkFBNEI7SUFDNUIsOEJBQThCO0lBQzlCLElBQUk7Q0FDTDtBQUVZLEtBa0JULE9BQU8sQ0FBQyxHQUFHLEVBakJiLFlBQUksWUFDSixZQUFJLFlBQ0osa0JBQVUsa0JBQ1YsOEJBQXNCLDhCQUN0QixrQkFBVSxrQkFDVixhQUFLLGFBQ0wsb0JBQVksb0JBQ1osZ0JBQVEsZ0JBQ1IsNEJBQW9CLDRCQUNwQixtQkFBVztBQUNYLE1BQU07QUFDTix5QkFBaUIseUJBQ2pCLDZCQUFxQiw2QkFDckIseUJBQWlCLHlCQUNqQiwwQkFBa0IsMEJBQ2xCLDBCQUFrQiwwQkFDbEIsaUJBQVMsZ0JBQ0sifQ==