"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
/**
 * Random number generator
 */
class Utils {
    RandomInteger(min = 0, max = Number.MAX_SAFE_INTEGER) {
        return Math.floor(Math.random() * max + min);
    }
    generateReferralCode() {
        const digits = `URR${this.RandomInteger().toString().substring(1, 7)}`;
        return digits;
    }
    generateUniqueId() {
        return (0, uuid_1.v4)();
    }
    parseToJSON(item) {
        return JSON.parse(JSON.stringify(item));
    }
    escapeRegex(text) {
        if (!text || typeof text !== 'string') {
            return false;
        }
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
}
exports.default = new Utils();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBb0M7QUFDcEM7O0dBRUc7QUFDSCxNQUFNLEtBQUs7SUFDVCxhQUFhLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxNQUFjLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDMUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkUsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBQSxTQUFNLEdBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVM7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVk7UUFDdEIsSUFBSSxDQUFDLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLEtBQUssRUFBRSxDQUFDIn0=