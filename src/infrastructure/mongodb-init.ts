import mongoose from 'mongoose';
import {
  dbName,
  dbHost,
  dbPort,
  dbUsername,
  dbPassword,
  dbAuthSource
} from '../config';

export default class MongoDb {
  static uri = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authsource=${dbAuthSource}`;

  static init() {
    mongoose.connect(MongoDb.uri).catch((e) => {
      console.log('[*] Database Error  ', e);
      process.exit(1);
    });

    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to db');
    });

    mongoose.connection.on('error', (err) => {
      console.log(err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose connection is disconnected.');
    });

    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }
}
