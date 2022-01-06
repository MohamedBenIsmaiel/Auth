import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const serverPort = process.env.SERVER_PORT;
export const dbHost = process.env.DB_HOST;
export const dbPort = process.env.DB_PORT;
export const dbName = process.env.DB_NAME;
export const dbUsername = process.env.DB_USERNAME;
export const dbPassword = process.env.DB_PASSWORD;
export const dbAuthSource = process.env.DB_AUTH_SOURCE;
