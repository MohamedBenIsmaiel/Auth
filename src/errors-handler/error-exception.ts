import ErrorCodes from './error-codes';

export default class ErrorException extends Error {
  public status: number;
  public code: string;

  constructor(message: string = ErrorCodes.UnknownError, code: string) {
    super(message);
    this.message = message;
    this.status = 500;
    this.code = code;

    switch (code) {
      case ErrorCodes.Unauthenticated:
        this.status = 401;
        break;
      case ErrorCodes.NotFound:
        this.status = 404;
        break;
      case ErrorCodes.Validation:
        this.status = 422;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
