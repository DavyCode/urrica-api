import mongoose from 'mongoose';
import debug from 'debug';
import { DBURL } from '../../config/env';

const log: debug.IDebugger = debug('app:mongoose-service');

// @ts-expect-error
const dburi: string = DBURL;

mongoose.Promise = require('bluebird');

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 0,
    keepAlive: true,
  };

  db: any;

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  connectWithRetry = () => {
    log('Attempting MongoDB connection (will retry if needed)');

    mongoose.connect(dburi, this.mongooseOptions);
    this.db = mongoose.connection;

    this.db.on('error', (err: any) => {
      const retrySeconds = 5;
      log('There was a db connection error', err);

      log(
        `MongoDB connection unsuccessful (will retry #${++this
          .count} after ${retrySeconds} seconds):`,
        err,
      );
      setTimeout(this.connectWithRetry, retrySeconds * 1000);
    });

    this.db.once('connected', () => {
      log('DB connection created successfully!');
    });

    this.db.once('disconnected', () => {
      log('DB connection disconnected!');
    });

    process.on('SIGINT', () => {
      mongoose.connection.close((err: any) => {
        log('DB connection closed due to app termination');
        process.exit(err ? 1 : 0);
      });
    });
  };
}

export default new MongooseService();
