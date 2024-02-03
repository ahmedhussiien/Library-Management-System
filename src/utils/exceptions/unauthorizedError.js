import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

/**
 * @apiDefine UnauthorizedError
 *
 * @apiError UnauthorizedError The user doesn't have the needed permission.
 *
 * @apiErrorExample UnauthorizedError-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Permission Denied!"
 *     }
 */
export default class UnauthorizedError extends AppError {
  statusCode = httpStatus.FORBIDDEN;

  constructor(message = '_PermissionDenied') {
    super(message);
  }
}
