import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

export default class UnauthenticatedError extends AppError {
  statusCode = httpStatus.UNAUTHORIZED;

  constructor(message = '_UnauthenticatedUser') {
    super(message);
  }
}
