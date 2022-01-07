import { Request, Response } from 'express';

import { ErrorCodes, ErrorException } from '../errors-handler';

const errorHandler = (err: Error, req: Request, res: Response) => {
  console.log('Path:', req.path);
  console.error('Error occured:', err);
  if (err instanceof ErrorException) {
    res.status(err.status).send(err);
  } else {
    // For unhandled errors.
    res.status(500).send({ code: ErrorCodes.UnknownError, status: 500 });
  }
};

export default errorHandler;
