import mongoose from 'mongoose';
import {
  dbName,
  dbHost,
  dbPort,
  dbUsername,
  dbPassword,
  dbAuthSource
} from '../config';
import { logger } from '../middlewares/indext';

export default class MongoDb {
  static uri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authsource=${dbAuthSource}`;

  static init() {
    mongoose.connect(MongoDb.uri).catch((e) => {
      logger.error('[*] Database Error  ', e);
      process.exit(1);
    });

    mongoose.connection.on('connected', () => {
      logger.info('Mongoose connected to db');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(err.message);
    });

    mongoose.connection.on('disconnected', () => {
      logger.error('Mongoose connection is disconnected.');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }
}
