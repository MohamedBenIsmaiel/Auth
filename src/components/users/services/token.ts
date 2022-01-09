import jwt from 'jsonwebtoken';

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
          console.log(err.message);
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
          console.log(err.message);
          reject(new ErrorException(err.message, ErrorCodes.UnknownError));
        }
        resolve(token as string);
      });
    });
  }
}
