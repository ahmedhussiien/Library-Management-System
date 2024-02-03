import Config from '../config.js';
import logger from '../logger.js';
import AppError from '../utils/exceptions/appError.js';

const sendErrorDev = (err, res) => {
  const statusCode = 'statusCode' in err ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendOperationalError = (err, res) => {
  return res.status(err.statusCode).send({
    message: err.message,
    errors: err.serializeErrors(),
  });
};

const castToAppError = (err) => {
  if (err instanceof AppError) return err;
  return err;
};

const errorController = (err, req, res, next) => {
  if (Config.NODE_ENV !== 'prod') {
    logger.error(err);
    return sendErrorDev(err, res);
  }

  // trying to cast error
  err = castToAppError(err);
  if (err instanceof AppError) return sendOperationalError(err, res);

  // return generic error
  logger.error(err);
  res.status(500).send({
    message: 'something went wrong!',
    errors: [{ message: 'something went wrong!' }],
  });
};

export default errorController;
