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
const http = __importStar(require("http"));
const debug_1 = __importDefault(require("debug"));
const app_1 = __importStar(require("./setup/app"));
const env_1 = require("./config/env");
//@ts-expect-error
const host = env_1.HOST;
const port = env_1.PORT;
const server = http.createServer(app_1.default);
const debugLog = (0, debug_1.default)('server');
server.listen(port, () => {
    debugLog(`Server running at ${host}:${port}`);
    app_1.routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFDN0Isa0RBQTBCO0FBQzFCLG1EQUEwQztBQUMxQyxzQ0FBMEM7QUFHMUMsa0JBQWtCO0FBQ2xCLE1BQU0sSUFBSSxHQUFXLFVBQUksQ0FBQztBQUMxQixNQUFNLElBQUksR0FBRyxVQUFJLENBQUM7QUFFbEIsTUFBTSxNQUFNLEdBQWdCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBRyxDQUFDLENBQUM7QUFDbkQsTUFBTSxRQUFRLEdBQW9CLElBQUEsZUFBSyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWxELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN2QixRQUFRLENBQUMscUJBQXFCLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLFlBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUF5QixFQUFFLEVBQUU7UUFDM0MsUUFBUSxDQUFDLHlCQUF5QixLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==