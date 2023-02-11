import shortid from 'shortid';
import { v4 as uuidv4 } from 'uuid';
/**
 * Random number generator
 */
class Utils {
  RandomInteger(min = 0, max: number = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * max + min);
  }

  generateReferralCode() {
    const digits = `URR${this.RandomInteger().toString().substring(1, 7)}`;
    return digits;
  }

  generateUniqueId() {
    return uuidv4();
  }

  parseToJSON(item: any): any {
    return JSON.parse(JSON.stringify(item));
  }
}

export default new Utils();
