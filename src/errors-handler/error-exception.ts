import ErrorCodes from './error-codes';

export default class ErrorException extends Error {
  public statusCode: number;
  public code: string;

  constructor(message: string = ErrorCodes.UnknownError, code: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = 500;
    this.code = code;

    switch (code) {
      case ErrorCodes.Unauthenticated:
        this.statusCode = 401;
        break;
      case ErrorCodes.NotFound:
        this.statusCode = 404;
        break;
      case ErrorCodes.Validation:
        this.statusCode = 422;
        break;
      case ErrorCodes.Permission:
        this.statusCode = 403;
        break;
      default:
        this.statusCode = 500;
        break;
    }
  }
}
