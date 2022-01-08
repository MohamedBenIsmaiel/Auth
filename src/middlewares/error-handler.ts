import { NextFunction, Request, Response } from 'express';

import { ErrorCodes, ErrorException } from '../errors-handler';

const errorHandler = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('Path:', req.path);
  console.error('Error occured:', err);

  res.setHeader('Content-type', 'application/json');
  if (err instanceof ErrorException) {
    res.json({
      message: err.message,
      statusCode: err.statusCode,
      code: err.code
    });
  } else {
    // For unhandled errors.
    res.json({
      code: ErrorCodes.UnknownError,
      statusCode: 500,
      message: err.message
    });
  }
};

export default errorHandler;
