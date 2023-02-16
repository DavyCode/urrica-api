"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCreatedResponse = exports.apiOKResponse = void 0;
const APIResponse_1 = __importDefault(require("./APIResponse"));
const ServerResponseStatus_1 = __importDefault(require("../constant/ServerResponseStatus"));
class apiOKResponse extends APIResponse_1.default {
    constructor(data, message) {
        super(ServerResponseStatus_1.default.OK, message, data);
    }
}
exports.apiOKResponse = apiOKResponse;
class apiCreatedResponse extends APIResponse_1.default {
    constructor(message, data) {
        super(ServerResponseStatus_1.default.CREATED, message, data);
    }
}
exports.apiCreatedResponse = apiCreatedResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpUmVzcG9uc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL3V0aWxzL2FwaVJlc3BvbnNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRUFBd0M7QUFDeEMsNEZBQW9FO0FBRXBFLE1BQWEsYUFBYyxTQUFRLHFCQUFXO0lBQzVDLFlBQVksSUFBOEIsRUFBRSxPQUFnQjtRQUMxRCxLQUFLLENBQUMsOEJBQW9CLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUFKRCxzQ0FJQztBQUVELE1BQWEsa0JBQW1CLFNBQVEscUJBQVc7SUFDakQsWUFBWSxPQUFnQixFQUFFLElBQThCO1FBQzFELEtBQUssQ0FBQyw4QkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7Q0FDRjtBQUpELGdEQUlDIn0=