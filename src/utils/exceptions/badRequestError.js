import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

export default class BadRequestError extends AppError {
  statusCode = httpStatus.BAD_REQUEST;

  constructor(message) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
