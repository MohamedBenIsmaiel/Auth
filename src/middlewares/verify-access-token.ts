import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ErrorCodes, ErrorException } from '../errors-handler';
import { accessTokenSecret } from '../config';

const verifyAccessToken = function (
  req: any,
  res: Response,
  next: NextFunction
) {
  if (!req.headers['authorization'])
    return next(
      new ErrorException(
        'Please provide a access token ',
        ErrorCodes.Unauthenticated
      )
    );

  const accessToken = req.headers['authorization'];
  jwt.verify(
    accessToken,
    accessTokenSecret as string,
    (err: any, payload: any) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(new ErrorException(message, ErrorCodes.Unauthenticated));
      }
      req.user = payload;
      next();
    }
  );
};

export default verifyAccessToken;
