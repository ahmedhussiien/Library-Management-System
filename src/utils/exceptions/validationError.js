import httpStatus from '../httpStatus.js';
import AppError from './appError.js';
import sequelize from 'sequelize';

/**
 * @apiDefine ValidationError
 *
 * @apiError ValidationError The input data is not valid.
 *
 * @apiErrorExample ValidationError-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Validation error!"
 *     }
 */
export default class ValidationError extends AppError {
  statusCode = httpStatus.UNPROCESSABLE_ENTITY;

  constructor(err) {
    super(err.message);
    this.message = err.errors.map((er) => er.message).join('. ');
  }

  static canCast(err) {
    return err instanceof sequelize.ValidationError;
  }
}
