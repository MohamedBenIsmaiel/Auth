import mongoose from 'mongoose';
import { dbName, dbHost, dbPort } from '../config';

export default class MongoDb {
  static dbName = dbName;
  static dbPort = dbPort;
  static dbHost = dbHost;
  static uri = `mongodb://${dbHost}:${dbPort}/${dbName}`;

  static init() {
    mongoose.connect(MongoDb.uri, (err) => {
      if (err) {
        throw new Error('[*] Database Error  while Connection ${err}');
      }
      console.log('[*] Database Connected sucessfuly');
    });
  }
}
