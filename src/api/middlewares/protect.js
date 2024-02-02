import Config from '../../config.js';
import UnauthenticatedError from '../../utils/exceptions/unauthenticatedError.js';

import * as authService from '../../services/auth.service.js';

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies[Config.ACCESS_TOKEN_COOKIE_NAME]) {
    token = req.cookies[Config.ACCESS_TOKEN_COOKIE_NAME];
  } else {
    throw new UnauthenticatedError('_MissingCredentials');
  }

  const payload = await authService.protect(token);
  req.session = payload;
  next();
};

export default protect;
