import jwt from 'jsonwebtoken';
import { redisClient } from '../../../infrastructure';
import { logger } from '../../../middlewares/indext';

import {
  accessTokenSecret,
  accessTokenExpire,
  refreshTokenExpire,
  refreshTokenSecret
} from '../../../config';

import { ErrorCodes, ErrorException } from '../../../errors-handler';
import { issuer } from '../config';

export default class Token {
  static signeAccessToken(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn: accessTokenExpire,
        issuer
      };

      jwt.sign(payload, accessTokenSecret as string, options, (err, token) => {
        if (err) {
          logger.error(err.message);
          reject(new ErrorException(err.message, ErrorCodes.UnknownError));
        }
        resolve(token as string);
      });
    });
  }

  static signeRefreshToken(payload: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const options = {
        expiresIn: refreshTokenExpire,
        issuer
      };

      jwt.sign(payload, refreshTokenSecret as string, options, (err, token) => {
        if (err) {
          logger.error(err.message);
          reject(new ErrorException(err.message, ErrorCodes.UnknownError));
        }

        redisClient.SET(
          payload.userId,
          token,
          'EX',
          365 * 24 * 60 * 60,
          (err: any, reply: any) => {
            if (err) {
              logger.error(err.message);
              reject(new ErrorException(err.message, ErrorCodes.UnknownError));
              return;
            }
          }
        );
        resolve(token as string);
      });
    });
  }

  static verifyRefreshToken(refreshToken: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        refreshTokenSecret as string,
        async (err, payload) => {
          if (err)
            return reject(
              new ErrorException('Unauthenticated', ErrorCodes.Unauthenticated)
            );

          const { userId, role }: any = payload;
          const result = await redisClient.GET(userId);
          if (!result) {
            reject(
              new ErrorException('unauthorizedzed ', ErrorCodes.Unauthenticated)
            );
          }

          resolve({ userId, role });
        }
      );
    });
  }
}
