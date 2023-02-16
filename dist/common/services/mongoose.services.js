"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const env_1 = require("../../config/env");
const log = (0, debug_1.default)('app:mongoose-service');
// @ts-expect-error
const dburi = env_1.DBURL;
mongoose_1.default.Promise = require('bluebird');
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 0,
            keepAlive: true,
        };
        this.connectWithRetry = () => {
            log('Attempting MongoDB connection (will retry if needed)');
            mongoose_1.default.connect(dburi, this.mongooseOptions);
            this.db = mongoose_1.default.connection;
            this.db.on('error', (err) => {
                const retrySeconds = 5;
                log('There was a db connection error', err);
                log(`MongoDB connection unsuccessful (will retry #${++this
                    .count} after ${retrySeconds} seconds):`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
            this.db.once('connected', () => {
                log('DB connection created successfully!');
            });
            this.db.once('disconnected', () => {
                log('DB connection disconnected!');
            });
            process.on('SIGINT', () => {
                mongoose_1.default.connection.close((err) => {
                    log('DB connection closed due to app termination');
                    process.exit(err ? 1 : 0);
                });
            });
        };
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
    validMongooseObjectId(id) {
        return mongoose_1.default.Types.ObjectId.isValid(id);
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvbW9uZ29vc2Uuc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBZ0M7QUFDaEMsa0RBQTBCO0FBQzFCLDBDQUF5QztBQU16QyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxtQkFBbUI7QUFDbkIsTUFBTSxLQUFLLEdBQVcsV0FBSyxDQUFDO0FBRTVCLGtCQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUV2QyxNQUFNLGVBQWU7SUFZbkI7UUFYUSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1Ysb0JBQWUsR0FBRztZQUN4QixlQUFlLEVBQUUsSUFBSTtZQUNyQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLHdCQUF3QixFQUFFLElBQUk7WUFDOUIsZUFBZSxFQUFFLENBQUM7WUFDbEIsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQztRQWdCRixxQkFBZ0IsR0FBRyxHQUFHLEVBQUU7WUFDdEIsR0FBRyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7WUFFNUQsa0JBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsRUFBRSxHQUFHLGtCQUFRLENBQUMsVUFBVSxDQUFDO1lBRTlCLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUMvQixNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFNUMsR0FBRyxDQUNELGdEQUFnRCxFQUFFLElBQUk7cUJBQ25ELEtBQUssVUFBVSxZQUFZLFlBQVksRUFDMUMsR0FBRyxDQUNKLENBQUM7Z0JBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO2dCQUM3QixHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7Z0JBQ2hDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUN4QixrQkFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDckMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7b0JBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBM0NBLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxrQkFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxFQUE2QjtRQUNqRCxPQUFPLGtCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztDQW1DRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==