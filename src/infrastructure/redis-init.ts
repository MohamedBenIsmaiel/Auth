import { createClient } from 'redis';

import { redisHost, redisPort } from '../config';
import { ErrorCodes, ErrorException } from '../errors-handler';

let redisClient: any;
(async () => {
  redisClient = createClient({ url: `redis://${redisHost}:${redisPort}` });

  redisClient.on('error', (err: any) => {
    console.log('Redis Client Error', err);
    throw new ErrorException(err.message, ErrorCodes.UnknownError);
  });

  await redisClient.connect();

  redisClient.on('connect', () => {
    console.log('Client connected to redis...');
  });

  redisClient.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
  });

  redisClient.on('end', () => {
    console.log('Client disconnected from redis');
  });

  process.on('SIGINT', () => {
    redisClient.quit();
  });
})();

export default redisClient;
