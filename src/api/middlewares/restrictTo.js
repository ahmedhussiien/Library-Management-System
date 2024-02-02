import UnauthorizedError from '../../utils/exceptions/unauthorizedError';

const restrictTo = (...roles) => {
  return (req, res, next) => {
    const { userRole } = req.session;
    if (!roles.includes(userRole)) throw new UnauthorizedError();
    next();
  };
};

export default restrictTo;