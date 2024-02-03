import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

export default class NotFoundError extends AppError {
  statusCode = httpStatus.NOT_FOUND;

  constructor(message) {
    super(message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
