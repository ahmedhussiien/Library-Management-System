import { hash } from 'bcrypt';

import _ from 'lodash';
const { assign, pick } = _;

import db from '../../db/database.js';
import Config from '../../config.js';
import { userRoles } from './user.enum.js';

import NotFoundError from '../../utils/exceptions/notFoundError.js';
import BadRequestError from '../../utils/exceptions/badRequestError.js';

import * as borrowerService from '../borrower/borrower.service.js';

const { User, Borrower, sequelize } = db;

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

async function createStaffUser(data) {
  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: userRoles.STAFF,
    password: hashedPassword,
  });

  user.password = undefined; // do not return the password
  return user;
}

async function hashPassword(password) {
  return hash(password, Config.PASSWORD_HASH_SALT_ROUNDS);
}

async function findOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await User.findOne({ where: { id }, include: [Borrower] });
  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

async function findOneIncludePassword(email) {
  if (!email) throw new BadRequestError('_ProvideEmail');

  const user = await User.scope('withPassword').findOne({
    where: { email },
    include: [Borrower],
  });

  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

async function updateOne(id, data) {
  if (!id) throw new BadRequestError('_ProvideId');
  if (!data.borrower) throw new BadRequestError('_ProvideBorrowerInfo');
  if (!data.user) throw new BadRequestError('_ProvideUserInfo');

  const user = await sequelize.transaction(async (t) => {
    const user = await User.findOne({ where: { id }, transaction: t });
    if (!user) throw new NotFoundError('_UserNotfound');

    // filter data
    const userData = pick(data.user, [
      'email',
      'firstName',
      'lastName',
      'password',
    ]);

    // hash password
    if (userData.password)
      userData.password = await hashPassword(userData.password);

    assign(user, userData);
    await user.save({ transaction: t });

    // update borrower data
    if (user.role === userRoles.BORROWER) {
      await borrowerService.updateOneByUserId(id, data.borrower, t);
    }

    return user;
  });

  user.password = undefined;
  return user;
}

async function updateOneByStaff(id, data) {
  if (!id) throw new BadRequestError('_ProvideId');
  if (!data.borrower) throw new BadRequestError('_ProvideBorrowerInfo');
  if (!data.user) throw new BadRequestError('_ProvideUserInfo');

  const user = await sequelize.transaction(async (t) => {
    const user = await User.findOne({
      where: { id },
      transaction: t,
    });

    if (!user) throw new NotFoundError('_UserNotfound');

    // filter data
    const userData = pick(data.user, [
      'email',
      'firstName',
      'lastName',
      'isActive',
    ]);

    assign(user, userData);
    user.save({ transaction: t });

    // update borrower data
    if (user.role === userRoles.BORROWER) {
      await borrowerService.updateOneByUserId(id, data.borrower, t);
    }

    return user;
  });

  return user;
}

async function deleteOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await sequelize.transaction(async (t) => {
    const user = await User.findOne({ where: { id }, transaction: t });
    if (!user) throw new NotFoundError('_UserNotfound');
    if (user.isDeleted) throw new BadRequestError('_UserAlreadyDeleted');

    let isUserRoleDeleted = true;

    if (user.role === userRoles.BORROWER) {
      const borrower = await borrowerService.findOneByUserId(user.id);
      isUserRoleDeleted = await borrowerService.deleteOne(borrower.id, t);
    }

    if (isUserRoleDeleted) {
      return user.destroy({ transaction: t });
    } else {
      user.isDeleted = true;
      return user.save({ transaction: t });
    }
  });

  return user;
}

export {
  signup,
  updateOne,
  findOne,
  deleteOne,
  updateOneByStaff,
  findOneIncludePassword,
  createStaffUser,
};
