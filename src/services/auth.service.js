import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

import db from '../db/database.js';
import Config from '../config.js';

import NotFoundError from '../utils/exceptions/notFoundError.js';
import UnauthenticatedError from '../utils/exceptions/unauthenticatedError.js';

const { User } = db;

async function login(email, password) {
  if (!email || !password)
    throw new UnauthenticatedError('_MissingCredentials');

  // get user
  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) throw new NotFoundError('_UserNotFound');

  // check for password
  const isValidPassword = await isCorrectPassword(password, user.password);

  if (!isValidPassword)
    throw new UnauthenticatedError('_UsernamePasswordWrong');

  // check if active
  if (!user.isActive) throw new UnauthorizedError('_UserSuspended');

  // generate access token
  const accessToken = getAccessToken(user);
  user.password = undefined;

  return {
    accessToken,
    user,
  };
}

async function isCorrectPassword(candidatePassword, password) {
  return await compare(candidatePassword, password);
}

function getAccessToken(user) {
  const expiresIn = moment(new Date()).add(
    Config.ACCESS_TOKEN_EXPIRES_IN_MINUTES,
    'minutes',
  );

  const payload = {
    userId: user.id,
    userRole: user.role,
    exp: expiresIn.unix(),
  };

  const token = jwt.sign(payload, Config.ACCESS_TOKEN_SECRET);

  return {
    token,
    expiresIn: expiresIn.toDate(),
  };
}

async function protect(accessToken) {
  return jwt.verify(accessToken, Config.ACCESS_TOKEN_SECRET);
}

export { login, protect };
