"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.PaymentRequiredError = exports.InternalServerError = exports.NotAcceptableError = exports.ForbiddenError = exports.NotFoundError = exports.BadRequestError = exports.UnauthorizedError = void 0;
const winston_1 = __importDefault(require("winston"));
const APIError_1 = __importDefault(require("./APIError"));
const ServerResponseStatus_1 = __importDefault(require("../constant/ServerResponseStatus"));
const env_1 = require("../../config/env");
class UnauthorizedError extends APIError_1.default {
    constructor(message) {
        super(ServerResponseStatus_1.default.UNAUTHORIZED, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class BadRequestError extends APIError_1.default {
    constructor(message) {
        super(ServerResponseStatus_1.default.BAD_REQUEST, message);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends APIError_1.default {
    constructor(message) {
        super(ServerResponseStatus_1.default.NOT_FOUND, message || 'Not Found');
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends APIError_1.default {
    constructor(message) {
        super(ServerResponseStatus_1.default.FORBIDDEN, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotAcceptableError extends APIError_1.default {
    constructor(message) {
        super(ServerResponseStatus_1.default.NOT_ACCEPTABLE, message);
    }
}
exports.NotAcceptableError = NotAcceptableError;
class InternalServerError extends APIError_1.default {
    constructor(message) {
        super(ServerResponseStatus_1.default.INTERNAL_SERVER_ERROR, message);
    }
}
exports.InternalServerError = InternalServerError;
class PaymentRequiredError extends APIError_1.default {
    constructor(message) {
        super(ServerResponseStatus_1.default.PAYMENT_REQUIRED, message);
    }
}
exports.PaymentRequiredError = PaymentRequiredError;
const errorHandler = (error, request, response, next) => {
    /**
     * log the error message, and meta object
     */
    let respondWith = {
        errors: [error.message ? error.message : 'Something went wrong'],
        statusCode: error.statusCode
            ? error.statusCode
            : ServerResponseStatus_1.default.INTERNAL_SERVER_ERROR,
        status: ServerResponseStatus_1.default.RESPONSE_STATUS_FAILURE,
    };
    if (env_1.NODE_ENV === 'development' && !(error instanceof APIError_1.default)) {
        respondWith = Object.assign({}, respondWith, { stack: error.stack });
    }
    if (env_1.NODE_ENV === 'production' && !(error instanceof APIError_1.default)) {
        // Push to logger in production
        // Pubsub.emit('error', { respondWith, error })
    }
    if (env_1.NODE_ENV === 'development') {
        winston_1.default.error(error.message, error);
    }
    response
        .status(error.statusCode
        ? error.statusCode
        : ServerResponseStatus_1.default.INTERNAL_SERVER_ERROR)
        .json(respondWith);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL3V0aWxzL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsMERBQWtDO0FBQ2xDLDRGQUFvRTtBQUNwRSwwQ0FBNEM7QUFFNUMsTUFBYSxpQkFBa0IsU0FBUSxrQkFBUTtJQUM3QyxZQUFZLE9BQWU7UUFDekIsS0FBSyxDQUFDLDhCQUFvQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0Y7QUFKRCw4Q0FJQztBQUVELE1BQWEsZUFBZ0IsU0FBUSxrQkFBUTtJQUMzQyxZQUFZLE9BQWU7UUFDekIsS0FBSyxDQUFDLDhCQUFvQixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUFKRCwwQ0FJQztBQUVELE1BQWEsYUFBYyxTQUFRLGtCQUFRO0lBQ3pDLFlBQVksT0FBZTtRQUN6QixLQUFLLENBQUMsOEJBQW9CLENBQUMsU0FBUyxFQUFFLE9BQU8sSUFBSSxXQUFXLENBQUMsQ0FBQztJQUNoRSxDQUFDO0NBQ0Y7QUFKRCxzQ0FJQztBQUVELE1BQWEsY0FBZSxTQUFRLGtCQUFRO0lBQzFDLFlBQVksT0FBZTtRQUN6QixLQUFLLENBQUMsOEJBQW9CLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRjtBQUpELHdDQUlDO0FBRUQsTUFBYSxrQkFBbUIsU0FBUSxrQkFBUTtJQUM5QyxZQUFZLE9BQWU7UUFDekIsS0FBSyxDQUFDLDhCQUFvQixDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0Y7QUFKRCxnREFJQztBQUVELE1BQWEsbUJBQW9CLFNBQVEsa0JBQVE7SUFDL0MsWUFBWSxPQUFlO1FBQ3pCLEtBQUssQ0FBQyw4QkFBb0IsQ0FBQyxxQkFBcUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7QUFKRCxrREFJQztBQUVELE1BQWEsb0JBQXFCLFNBQVEsa0JBQVE7SUFDaEQsWUFBWSxPQUFlO1FBQ3pCLEtBQUssQ0FBQyw4QkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0Y7QUFKRCxvREFJQztBQUVNLE1BQU0sWUFBWSxHQUFHLENBQzFCLEtBQVUsRUFDVixPQUFZLEVBQ1osUUFBYSxFQUNiLElBQVMsRUFDVCxFQUFFO0lBQ0Y7O09BRUc7SUFDSCxJQUFJLFdBQVcsR0FBRztRQUNoQixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztRQUNoRSxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7WUFDMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVO1lBQ2xCLENBQUMsQ0FBQyw4QkFBb0IsQ0FBQyxxQkFBcUI7UUFDOUMsTUFBTSxFQUFFLDhCQUFvQixDQUFDLHVCQUF1QjtLQUNyRCxDQUFDO0lBRUYsSUFBSSxjQUFRLEtBQUssYUFBYSxJQUFJLENBQUMsQ0FBQyxLQUFLLFlBQVksa0JBQVEsQ0FBQyxFQUFFO1FBQzlELFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDdEU7SUFFRCxJQUFJLGNBQVEsS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxrQkFBUSxDQUFDLEVBQUU7UUFDN0QsK0JBQStCO1FBQy9CLCtDQUErQztLQUNoRDtJQUVELElBQUksY0FBUSxLQUFLLGFBQWEsRUFBRTtRQUM5QixpQkFBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsUUFBUTtTQUNMLE1BQU0sQ0FDTCxLQUFLLENBQUMsVUFBVTtRQUNkLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVTtRQUNsQixDQUFDLENBQUMsOEJBQW9CLENBQUMscUJBQXFCLENBQy9DO1NBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQztBQXJDVyxRQUFBLFlBQVksZ0JBcUN2QiJ9