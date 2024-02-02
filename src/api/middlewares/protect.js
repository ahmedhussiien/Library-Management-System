import Config from '../../config';
import UnauthenticatedError from '../../utils/exceptions/unauthenticatedError';

import * as authService from '../../services/auth.service'

const protect = (req, res, next) => {
    let token;

    if (
      req.cookies &&
      req.cookies[Config.ACCESS_TOKEN_COOKIE_NAME]
    )
      token = req.cookies[Config.ACCESS_TOKEN_COOKIE_NAME]

    else throw new UnauthenticatedError('_MissingCredentials');

    const payload = authService.protect(token);
    req.session = payload;
    next();
  }
);

export default protect;
