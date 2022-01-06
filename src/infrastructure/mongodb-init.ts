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
  static dbName = dbName;
  static dbPort = dbPort;
  static dbHost = dbHost;
  static dbUsername = dbUsername;
  static dbPassword = dbPassword;
  static dbAutSource = dbAuthSource;
  static uri = `mongodb://ismaiel:fk_system();@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

  static init() {
    mongoose.connect(MongoDb.uri, (err) => {
      if (err) {
        throw new Error('[*] Database Error  while Connection ${err}');
      }
      console.log('[*] Database Connected sucessfuly');
    });
  }
}
