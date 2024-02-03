import httpStatus from '../httpStatus.js';
import AppError from './appError.js';
import sequelize from 'sequelize';

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
