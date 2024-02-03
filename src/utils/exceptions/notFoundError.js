import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

/**
 * @apiDefine NotFoundError
 *
 * @apiError NotFoundError The id of the resource was not found.
 *
 * @apiErrorExample NotFoundError-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Resource not found!"
 *     }
 */
export default class NotFoundError extends AppError {
  statusCode = httpStatus.NOT_FOUND;

  constructor(message) {
    super(message);
  }
}
