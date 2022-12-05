import "express-async-errors";
import express from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import helmet from "helmet";
import hpp from "hpp";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import { CommonRoutesConfig } from "./common/common.routes.config";
import { UsersRoutes } from "./modules/users/users.routes.config";
import { AuthRoutes } from "./modules/auth/auth.routes.config";
import headerOptions from "./setup/headerOptions";
import checkHeaderForAuth from "./common/middleware/checkHeaderForAuth";
import { PORT } from "./config/env";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(cors());
app.use(helmet());

/**
 * HPP puts array parameters in req.query and/or req.body aside and just selects the last parameter value. You add the middleware and you are done.
 * Checking req.query may be turned off by using app.use(hpp({ checkQuery: false })).
 */
app.use(hpp()); // <- THIS IS THE NEW LINE

app.use(cors());
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
app.enable("trust proxy");

/**
 * If you don’t want to use Helmet, then at least disable the X-Powered-By header
 * Attackers can use this header (which is enabled by default) to detect apps running Express and then launch specifically-targeted attacks.
 */
// app.disable('x-powered-by'); // If you use helmet.js, it takes care of this for you.
app.use(helmet());

// To remove data, use:
/**
 * Add as a piece of express middleware, before defining your routes.
 * sanitizes user-supplied data to prevent MongoDB Operator Injection.
 * Or, to replace prohibited characters with _, use: app.use(mongoSanitize({ replaceWith: '_' }))
 */
app.use(mongoSanitize());

// Prevent XSS attacks
/* make sure this comes before any routes */
// app.use(xss());

const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
};

if (process.env.DEBUG) {
	process.on("unhandledRejection", function (reason) {
		debugLog("Unhandled Rejection:", reason);
		process.exit(1);
	});
} else {
	loggerOptions.meta = false; // when not debugging, make terse
	// if (typeof global.it === "function") {
	// 	loggerOptions.level = "http"; // for non-debug test runs, squelch entirely
	// }
}

/**
 * Header options
 */
app.use(headerOptions);

app.all("/*", checkHeaderForAuth);

// app.all('/*', checkHeader)
app.use(expressWinston.logger(loggerOptions));

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

app.get("/", (req: express.Request, res: express.Response) => {
	res
		.status(200)
		.send({ message: `Server running at http://localhost:${PORT}` });
});

export default server.listen(PORT, () => {
	debugLog(`Server running at http://localhost:${PORT}`);
	routes.forEach((route: CommonRoutesConfig) => {
		debugLog(`Routes configured for ${route.getName()}`);
	});
});
