import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

/**
 * @apiDefine UnauthenticatedError
 *
 * @apiError UnauthenticatedError The request doesn't contain the user's credential.
 *
 * @apiErrorExample UnauthenticatedError-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Credentials are missing!"
 *     }
 */
export default class UnauthenticatedError extends AppError {
  statusCode = httpStatus.UNAUTHORIZED;

  constructor(message = '_UnauthenticatedUser') {
    super(message);
  }
}
