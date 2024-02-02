import Config from '../../config.js';
import httpStatus from '../utils/httpStatus.js';
import defaultCookieOptions from '../utils/defaultCookieOptions.js';

import * as authService from '../../services/auth.service.js';

/**
 * Function which logs out a user by clearing the cookie.
 * NOTE: in more advanced systems the access token should
 * be black listed in a distributed store. Or if using a
 * refresh token the refresh token version should be incremented.
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
async function logout(req, res) {
  res.clearCookie(Config.ACCESS_TOKEN_COOKIE_NAME);
  res.status(httpStatus.NO_CONTENT).end();
}

/**
 * Function which logs a user in and attaches
 * a cookie with the access token to the response.
 *
 * @param {*} req - express HTTP request object
 * @param {*} res - express HTTP response object
 */
async function login(req, res) {
  const { email, password } = req.body;

  const userData = await authService.login(email, password);

  res.cookie(Config.ACCESS_TOKEN_COOKIE_NAME, userData.accessToken.token, {
    ...defaultCookieOptions,
    expires: userData.accessToken.expiresIn,
  });

  res.status(httpStatus.OK).send(userData.user);
}

export { login, logout };
