"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
const users_validation_middleware_1 = __importDefault(require("./middleware/users.validation.middleware"));
const env_1 = require("../../config/env");
const accessAuth_middleware_1 = __importDefault(require("../../common/middleware/accessAuth.middleware"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    /**
     * Execute default abstract class from parent
     */
    configureRoutes() {
        this.app
            .route(`${env_1.API_BASE_URI}/users`)
            .get(accessAuth_middleware_1.default.ensureSupport, users_controller_1.default.getAllUsers)
            .post(users_validation_middleware_1.default.CreateUserValidator, users_controller_1.default.createUser);
        // this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app.param(`${env_1.API_BASE_URI}/userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`${env_1.API_BASE_URI}/users/:userId`)
            .all(accessAuth_middleware_1.default.ensureAuth)
            .get(accessAuth_middleware_1.default.grantRoleAccess('readOwn', 'User'), accessAuth_middleware_1.default.allowSameUserOrAdmin, users_controller_1.default.getUser);
        this.app.put(`${env_1.API_BASE_URI}/users/:userId`, [
            accessAuth_middleware_1.default.ensureAuth,
            accessAuth_middleware_1.default.grantRoleAccess('updateOwn', 'User'),
            accessAuth_middleware_1.default.allowSameUserOrAdmin,
            users_validation_middleware_1.default.UpdateUserValidator,
            users_controller_1.default.updateUser,
        ]);
        this.app.patch(`${env_1.API_BASE_URI}/users/:userId`, [
            accessAuth_middleware_1.default.ensureAuth,
            accessAuth_middleware_1.default.grantRoleAccess('updateOwn', 'User'),
            accessAuth_middleware_1.default.allowSameUserOrAdmin,
            users_validation_middleware_1.default.UpdateUserValidator,
            users_controller_1.default.patchUser,
        ]);
        this.app.get(`${env_1.API_BASE_URI}/users/verify/otp/:email`, [
            users_validation_middleware_1.default.emailParamsValidator,
            users_controller_1.default.getVerifyUserOtp,
        ]);
        this.app.get(`${env_1.API_BASE_URI}/users/verify/:otp`, [
            users_validation_middleware_1.default.otpValidator,
            users_controller_1.default.verifyUserOtp,
        ]);
        this.app.put(`${env_1.API_BASE_URI}/users/password/:userId`, [
            accessAuth_middleware_1.default.ensureAuth,
            accessAuth_middleware_1.default.grantRoleAccess('updateOwn', 'User'),
            accessAuth_middleware_1.default.allowSameUserOrAdmin,
            users_validation_middleware_1.default.changePasswordValidator,
            users_controller_1.default.changePassword,
        ]);
        this.app
            .route(`${env_1.API_BASE_URI}/users/password/reset/:email`)
            .all(users_validation_middleware_1.default.emailParamsValidator)
            .get(users_controller_1.default.getPasswordResetOtp);
        this.app
            .route(`${env_1.API_BASE_URI}/users/password/reset/:otp/:password`)
            .all(users_validation_middleware_1.default.passwordResetConfirmValidator)
            .get(users_controller_1.default.resetPassword);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL21vZHVsZXMvdXNlcnMvdXNlcnMucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSw0RUFBdUU7QUFDdkUsc0ZBQTZEO0FBQzdELHFGQUE0RDtBQUM1RCwyR0FBaUY7QUFDakYsMENBQWdEO0FBQ2hELDBHQUFpRjtBQUVqRixNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFDakQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxHQUFHLGtCQUFZLFFBQVEsQ0FBQzthQUM5QixHQUFHLENBQUMsK0JBQW9CLENBQUMsYUFBYSxFQUFFLDBCQUFlLENBQUMsV0FBVyxDQUFDO2FBQ3BFLElBQUksQ0FDSCxxQ0FBeUIsQ0FBQyxtQkFBbUIsRUFDN0MsMEJBQWUsQ0FBQyxVQUFVLENBQzNCLENBQUM7UUFFSiwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxrQkFBWSxTQUFTLEVBQUUsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxHQUFHLGtCQUFZLGdCQUFnQixDQUFDO2FBQ3RDLEdBQUcsQ0FBQywrQkFBb0IsQ0FBQyxVQUFVLENBQUM7YUFDcEMsR0FBRyxDQUNGLCtCQUFvQixDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQ3ZELCtCQUFvQixDQUFDLG9CQUFvQixFQUN6QywwQkFBZSxDQUFDLE9BQU8sQ0FDeEIsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQVksZ0JBQWdCLEVBQUU7WUFDNUMsK0JBQW9CLENBQUMsVUFBVTtZQUMvQiwrQkFBb0IsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQztZQUN6RCwrQkFBb0IsQ0FBQyxvQkFBb0I7WUFDekMscUNBQXlCLENBQUMsbUJBQW1CO1lBQzdDLDBCQUFlLENBQUMsVUFBVTtTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLGtCQUFZLGdCQUFnQixFQUFFO1lBQzlDLCtCQUFvQixDQUFDLFVBQVU7WUFDL0IsK0JBQW9CLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7WUFDekQsK0JBQW9CLENBQUMsb0JBQW9CO1lBQ3pDLHFDQUF5QixDQUFDLG1CQUFtQjtZQUM3QywwQkFBZSxDQUFDLFNBQVM7U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBWSwwQkFBMEIsRUFBRTtZQUN0RCxxQ0FBeUIsQ0FBQyxvQkFBb0I7WUFDOUMsMEJBQWUsQ0FBQyxnQkFBZ0I7U0FDakMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBWSxvQkFBb0IsRUFBRTtZQUNoRCxxQ0FBeUIsQ0FBQyxZQUFZO1lBQ3RDLDBCQUFlLENBQUMsYUFBYTtTQUM5QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFZLHlCQUF5QixFQUFFO1lBQ3JELCtCQUFvQixDQUFDLFVBQVU7WUFDL0IsK0JBQW9CLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7WUFDekQsK0JBQW9CLENBQUMsb0JBQW9CO1lBQ3pDLHFDQUF5QixDQUFDLHVCQUF1QjtZQUNqRCwwQkFBZSxDQUFDLGNBQWM7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsR0FBRyxrQkFBWSw4QkFBOEIsQ0FBQzthQUNwRCxHQUFHLENBQUMscUNBQXlCLENBQUMsb0JBQW9CLENBQUM7YUFDbkQsR0FBRyxDQUFDLDBCQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxHQUFHLGtCQUFZLHNDQUFzQyxDQUFDO2FBQzVELEdBQUcsQ0FBQyxxQ0FBeUIsQ0FBQyw2QkFBNkIsQ0FBQzthQUM1RCxHQUFHLENBQUMsMEJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV0QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBMUVELGtDQTBFQyJ9