import httpStatus from '../httpStatus.js';
import AppError from './appError.js';

export default class ForeignKeyError extends AppError {
  statusCode = httpStatus.BAD_REQUEST;

  constructor(err) {
    super(err.message);
    this.message = `${err.fields} does not exists`;
  }

  static canCast(err) {
    return err.name === 'SequelizeForeignKeyConstraintError';
  }
}
