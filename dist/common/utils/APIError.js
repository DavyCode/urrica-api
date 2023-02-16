"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
class APIError extends Error {
    constructor(statusCode = 500, message = `Unknown Server Error.`, data = {}) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = APIError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVBJRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vdXRpbHMvQVBJRXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxRQUFTLFNBQVEsS0FBSztJQUUxQixZQUFZLFVBQVUsR0FBRyxHQUFHLEVBQUUsT0FBTyxHQUFHLHVCQUF1QixFQUFFLElBQUksR0FBRyxFQUFFO1FBQ3hFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQUVvQiwyQkFBTyJ9