import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

export default class UnauthorizedError extends AppError {
  statusCode = httpStatus.FORBIDDEN;

  constructor(message = '_PermissionDenied') {
    super(message);
  }
}
