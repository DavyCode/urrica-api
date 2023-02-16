"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.default = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const users_routes_config_1 = require("../modules/users/users.routes.config");
const auth_routes_config_1 = require("../modules/auth/auth.routes.config");
const headerOptions_1 = __importDefault(require("../setup/headerOptions"));
const checkHeaders_1 = __importDefault(require("../common/middleware/checkHeaders"));
const errors_1 = require("../common/utils/errors");
const app = (0, express_1.default)();
exports.default = app;
const routes = [];
exports.routes = routes;
const debugLog = (0, debug_1.default)('app');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
/**
 * HPP puts array parameters in req.query and/or req.body aside and just selects the last parameter value. You add the middleware and you are done.
 * Checking req.query may be turned off by using app.use(hpp({ checkQuery: false })).
 */
app.use((0, hpp_1.default)()); // <- THIS IS THE NEW LINE
app.use((0, cors_1.default)());
/**
    * req.ip and req.protocol are now set to ip and protocol of the client, not the ip and protocol of the reverse proxy server       req.headers['x-forwarded-for'] is not changed
     req.headers['x-forwarded-for'] contains more than 1 forwarder when
     there are more forwarders between the client and nodejs.
     Forwarders can also be spoofed by the client, but
     app.set('trust proxy') selects the correct client ip from the list
     if the nodejs server is called directly, bypassing the trusted proxies,
     then 'trust proxy' ignores x-forwarded-for headers and
     sets req.ip to the remote client ip address
     app.enable('trust proxy');
    * only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
    */
app.enable('trust proxy');
/**
 * If you don’t want to use Helmet, then at least disable the X-Powered-By header
 * Attackers can use this header (which is enabled by default) to detect apps running Express and then launch specifically-targeted attacks.
 */
// app.disable('x-powered-by'); // If you use helmet.js, it takes care of this for you.
app.use((0, helmet_1.default)());
// To remove data, use:
/**
 * Add as a piece of express middleware, before defining your routes.
 * sanitizes user-supplied data to prevent MongoDB Operator Injection.
 * Or, to replace prohibited characters with _, use: app.use(mongoSanitize({ replaceWith: '_' }))
 */
app.use((0, express_mongo_sanitize_1.default)());
// Prevent XSS attacks
/* make sure this comes before any routes */
// app.use(xss());
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
if (process.env.DEBUG) {
    process.on('unhandledRejection', function (reason) {
        debugLog('Unhandled Rejection:', reason);
        process.exit(1);
    });
}
else {
    loggerOptions.meta = false; // when not debugging, make terse
}
/**
 * Header options
 */
app.use(headerOptions_1.default);
app.all('/*', checkHeaders_1.default.checkHeadersForAuthorization);
app.use(expressWinston.logger(loggerOptions));
routes.push(new users_routes_config_1.UsersRoutes(app));
routes.push(new auth_routes_config_1.AuthRoutes(app));
app.get(`/`, (req, res) => {
    res.status(200).send('Full authentication is required');
});
/**
 * error handler
 */
app.use(errors_1.errorHandler);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2V0dXAvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0NBQThCO0FBQzlCLHNEQUE4QjtBQUU5QixpREFBbUM7QUFDbkMsZ0VBQWtEO0FBQ2xELGdEQUF3QjtBQUN4QixrREFBMEI7QUFDMUIsb0RBQTRCO0FBQzVCLDhDQUFzQjtBQUV0QixvRkFBbUQ7QUFFbkQsOEVBQW1FO0FBQ25FLDJFQUFnRTtBQUNoRSwyRUFBbUQ7QUFDbkQscUZBQTZEO0FBQzdELG1EQUFzRDtBQUV0RCxNQUFNLEdBQUcsR0FBd0IsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFzRjNCLHNCQUFPO0FBckZ2QixNQUFNLE1BQU0sR0FBOEIsRUFBRSxDQUFDO0FBcUZwQix3QkFBTTtBQXBGL0IsTUFBTSxRQUFRLEdBQW9CLElBQUEsZUFBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBRS9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRWhEOzs7R0FHRztBQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxhQUFHLEdBQUUsQ0FBQyxDQUFDLENBQUMsMEJBQTBCO0FBRTFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0FBQ2hCOzs7Ozs7Ozs7OztNQVdHO0FBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUUxQjs7O0dBR0c7QUFDSCx1RkFBdUY7QUFDdkYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdCQUFNLEdBQUUsQ0FBQyxDQUFDO0FBRWxCLHVCQUF1QjtBQUN2Qjs7OztHQUlHO0FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGdDQUFhLEdBQUUsQ0FBQyxDQUFDO0FBRXpCLHNCQUFzQjtBQUN0Qiw0Q0FBNEM7QUFDNUMsa0JBQWtCO0FBRWxCLE1BQU0sYUFBYSxHQUFpQztJQUNsRCxVQUFVLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUM1QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUN2QztDQUNGLENBQUM7QUFFRixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO0lBQ3JCLE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxNQUFNO1FBQy9DLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0NBQ0o7S0FBTTtJQUNMLGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsaUNBQWlDO0NBQzlEO0FBRUQ7O0dBRUc7QUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLHVCQUFhLENBQUMsQ0FBQztBQUV2QixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxzQkFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFFekQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFFOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlDQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksK0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRWpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBb0IsRUFBRSxHQUFxQixFQUFFLEVBQUU7SUFDM0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUMxRCxDQUFDLENBQUMsQ0FBQztBQUVIOztHQUVHO0FBQ0gsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBWSxDQUFDLENBQUMifQ==