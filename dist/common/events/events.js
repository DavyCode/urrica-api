"use strict";
/**
 *  Use Pub/Sub layer to handle background event/processes
 * npm i event-dispatch
 * Allows to dispatch events across the application.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:event-background-process');
class ServerEventEmitter extends events_1.default {
}
const Pubsub = new ServerEventEmitter();
Pubsub.on('event', (info) => {
    log('an event occurred!', info);
});
Pubsub.on('error', (err) => {
    log('Log unknown error to logger/file', { err });
    log('Pubsub - whoops! there was an error');
});
exports.default = Pubsub;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL2V2ZW50cy9ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7O0FBRUgsb0RBQWtDO0FBQ2xDLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsOEJBQThCLENBQUMsQ0FBQztBQUVuRSxNQUFNLGtCQUFtQixTQUFRLGdCQUFZO0NBQUc7QUFFaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0FBRXhDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDMUIsR0FBRyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUN6QixHQUFHLENBQUMsa0NBQWtDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2pELEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=