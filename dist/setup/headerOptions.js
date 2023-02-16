"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Request headers
 */
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    // res.header('Access-Control-Max-Age', 600);
    /**
     * Cache-Control
     * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
     */
    res.header('Content-Type', 'application/json');
    res.header('Connection', 'keep-alive');
    res.header('Keep-Alive', 'timeout=200');
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    else {
        next();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyT3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NldHVwL2hlYWRlck9wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFFQTs7R0FFRztBQUNILGtCQUFlLENBQ2IsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEIsRUFDMUIsRUFBRTtJQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xFLEdBQUcsQ0FBQyxNQUFNLENBQUMsOEJBQThCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztJQUNuRSw2Q0FBNkM7SUFDN0M7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN2QyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN4QyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQzVCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztLQUM5QjtTQUFNO1FBQ0wsSUFBSSxFQUFFLENBQUM7S0FDUjtBQUNILENBQUMsQ0FBQSxDQUFDIn0=