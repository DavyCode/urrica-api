"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const ServerResponseStatus = {
    RESPONSE_STATUS_FAILURE: 'failure',
    RESPONSE_STATUS_SUCCESS: 'success',
    OK: http_status_1.default.OK,
    CREATED: http_status_1.default.CREATED,
    INTERNAL_SERVER_ERROR: http_status_1.default.INTERNAL_SERVER_ERROR,
    NOT_FOUND: http_status_1.default.NOT_FOUND,
    FAILED: http_status_1.default.BAD_REQUEST,
    BAD_REQUEST: http_status_1.default.BAD_REQUEST,
    UNAUTHORIZED: http_status_1.default.UNAUTHORIZED,
    FORBIDDEN: http_status_1.default.FORBIDDEN,
    NOT_ACCEPTABLE: http_status_1.default.NOT_ACCEPTABLE,
    PAYMENT_REQUIRED: http_status_1.default.PAYMENT_REQUIRED,
};
exports.default = ServerResponseStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyUmVzcG9uc2VTdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vY29uc3RhbnQvU2VydmVyUmVzcG9uc2VTdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4REFBcUM7QUFFckMsTUFBTSxvQkFBb0IsR0FBRztJQUMzQix1QkFBdUIsRUFBRSxTQUFTO0lBQ2xDLHVCQUF1QixFQUFFLFNBQVM7SUFDbEMsRUFBRSxFQUFFLHFCQUFVLENBQUMsRUFBRTtJQUNqQixPQUFPLEVBQUUscUJBQVUsQ0FBQyxPQUFPO0lBQzNCLHFCQUFxQixFQUFFLHFCQUFVLENBQUMscUJBQXFCO0lBQ3ZELFNBQVMsRUFBRSxxQkFBVSxDQUFDLFNBQVM7SUFDL0IsTUFBTSxFQUFFLHFCQUFVLENBQUMsV0FBVztJQUM5QixXQUFXLEVBQUUscUJBQVUsQ0FBQyxXQUFXO0lBQ25DLFlBQVksRUFBRSxxQkFBVSxDQUFDLFlBQVk7SUFDckMsU0FBUyxFQUFFLHFCQUFVLENBQUMsU0FBUztJQUMvQixjQUFjLEVBQUUscUJBQVUsQ0FBQyxjQUFjO0lBQ3pDLGdCQUFnQixFQUFFLHFCQUFVLENBQUMsZ0JBQWdCO0NBQzlDLENBQUM7QUFFRixrQkFBZSxvQkFBb0IsQ0FBQyJ9