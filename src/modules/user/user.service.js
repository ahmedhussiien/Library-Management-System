import { hash } from 'bcrypt';

import _ from 'lodash';
const { assign, pick } = _;

import db from '../../db/database.js';
import Config from '../../config.js';
import { userRoles } from './user.enum.js';

import NotFoundError from '../../utils/exceptions/notFoundError.js';
import BadRequestError from '../../utils/exceptions/badRequestError.js';

import * as borrowerService from '../borrower/borrower.service.js';

const { User, sequelize } = db;

async function signup(data) {
  if (!data.borrower) throw new BadRequestError('_ProvideBorrowerInfo');
  if (!data.user) throw new BadRequestError('_ProvideUserInfo');

  const hashedPassword = await hashPassword(data.user.password);

  const [user, borrower] = await sequelize.transaction(async (t) => {
    // create user
    const user = await User.create(
      {
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: userRoles.BORROWER, // INFO: only borrowers can sign up.
        password: hashedPassword,
      },
      { transaction: t },
    );

    // create borrower
    data.borrower.userId = user.id;
    const borrower = await borrowerService.createOne(data.borrower, t);

    return [user, borrower];
  });

  user.password = undefined; // do not return the password
  return { user, borrower };
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

async function updateOneByStaff(id, data) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await User.findOne({ where: { id, role: userRoles.BORROWER } });
  if (!user) throw new NotFoundError('_UserNotfound');

  data = pick(data, ['email', 'firstName', 'lastName', 'isActive']);
  assign(user, data);

  // TODO: check for borrower entity

  return user.save();
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

async function deleteOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  // TODO: check if borrower has active loans: throw an error

  // TODO: check if borrower has any loans: soft delete

  const user = await User.destroy({ where: { id } });
  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

export {
  signup,
  updateOne,
  findOne,
  deleteOne,
  updateOneByStaff,
  findOneIncludePassword,
};
