import * as dotenv from 'dotenv';
import path from 'path';
import { ErrorCodes, ErrorException } from '../errors-handler';

const config = dotenv.config({ path: path.join(__dirname, '../../.env') });
if (config && config.error)
  throw new ErrorException(".env file doesn't exist ", ErrorCodes.NotFound);

export const serverPort = process.env.SERVER_PORT;
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbName = process.env.DB_NAME;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
export const dbAuthSource = process.env.DB_AUTH_SOURCE;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
export const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE;
export const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRE;
