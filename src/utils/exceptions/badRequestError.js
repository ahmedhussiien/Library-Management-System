import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

/**
 * @apiDefine BadRequestError
 *
 * @apiError BadRequestError Invalid request framing.
 *
 * @apiErrorExample BadRequestError-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "message": "Bad request!"
 *     }
 */
export default class BadRequestError extends AppError {
  statusCode = httpStatus.BAD_REQUEST;

  constructor(message) {
    super(message);
  }
}
