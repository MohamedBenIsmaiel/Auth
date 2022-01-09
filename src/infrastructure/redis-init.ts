import { createClient } from 'redis';

import { redisHost, redisPort } from '../config';
import { ErrorCodes, ErrorException } from '../errors-handler';
import { logger } from '../middlewares/indext';

let redisClient: any;
(async () => {
  redisClient = createClient({ url: `redis://${redisHost}:${redisPort}` });

  redisClient.on('error', (err: any) => {
    logger.error('Redis Client Error', err);
    throw new ErrorException(err.message, ErrorCodes.UnknownError);
  });

  await redisClient.connect();

  redisClient.on('connect', () => {
    logger.info('Client connected to redis...');
  });

  redisClient.on('ready', () => {
    logger.info('Client connected to redis and ready to use...');
  });

  redisClient.on('end', () => {
    logger.error('Client disconnected from redis');
  });

  process.on('SIGINT', () => {
    redisClient.quit();
  });
})();

export default redisClient;
