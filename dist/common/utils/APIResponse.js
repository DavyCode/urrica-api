"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const ServerResponseStatus_1 = __importDefault(require("../constant/ServerResponseStatus"));
class APIResponse {
    constructor(statusCode = 200, message = `Successful`, data = {}) {
        this.statusCode = statusCode;
        this.status = ServerResponseStatus_1.default.RESPONSE_STATUS_SUCCESS;
        this.message = message;
        this.data = data;
    }
}
exports.default = APIResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVBJUmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vdXRpbHMvQVBJUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEZBQW9FO0FBRXBFLE1BQU0sV0FBVztJQU1mLFlBQVksVUFBVSxHQUFHLEdBQUcsRUFBRSxPQUFPLEdBQUcsWUFBWSxFQUFFLElBQUksR0FBRyxFQUFFO1FBQzdELElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsOEJBQW9CLENBQUMsdUJBQXVCLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBRXVCLDhCQUFPIn0=