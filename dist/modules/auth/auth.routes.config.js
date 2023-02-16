"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const auth_middleware_validation_1 = __importDefault(require("./middleware/auth.middleware.validation"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const env_1 = require("../../config/env");
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'AuthRoutes');
    }
    configureRoutes() {
        this.app.post(`${env_1.API_BASE_URI}/auth`, [
            auth_middleware_validation_1.default.AuthUserValidator,
            auth_controller_1.default.authUser,
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbW9kdWxlcy9hdXRoL2F1dGgucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSw0RUFBdUU7QUFDdkUseUdBQStFO0FBQy9FLG9GQUEyRDtBQUMzRCwwQ0FBZ0Q7QUFFaEQsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBQ2hELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsa0JBQVksT0FBTyxFQUFFO1lBQ3BDLG9DQUF3QixDQUFDLGlCQUFpQjtZQUMxQyx5QkFBYyxDQUFDLFFBQVE7U0FDeEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQWJELGdDQWFDIn0=