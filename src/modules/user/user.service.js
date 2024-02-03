import { hash } from 'bcrypt';

import _ from 'lodash';
const { assign, pick } = _;

import db from '../../db/database.js';
import Config from '../../config.js';
import { userRoles } from './user.enum.js';

import NotFoundError from '../../utils/exceptions/notFoundError.js';
import BadRequestError from '../../utils/exceptions/badRequestError.js';

const { User } = db;

async function signup(data) {
  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: userRoles.BORROWER,
    password: hashedPassword,
  });

  user.password = undefined;
  return user;
}

async function hashPassword(password) {
  return hash(password, Config.PASSWORD_HASH_SALT_ROUNDS);
}

async function updateOne(id, data) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await User.findOne({ where: { id } });
  if (!user) throw new NotFoundError('_UserNotfound');

  // filter data
  data = pick(data, ['email', 'firstName', 'lastName', 'password']);

  // hash password
  if (data.password) data.password = await hashPassword(data.password);

  assign(user, data);
  await user.save();

  user.password = undefined;
  return user;
}

async function findOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await User.findOne({ where: { id } });
  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

async function findOneIncludePassword(email) {
  if (!email) throw new BadRequestError('_ProvideEmail');

  const user = User.scope('withPassword').findOne({ where: { email } });
  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

export { signup, updateOne, findOne, findOneIncludePassword };
