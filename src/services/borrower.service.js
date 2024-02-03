import _ from 'lodash';
const { assign, pick } = _;

import db from '../db/database.js';
import userRoles from '../db/enums/userRoles.js';
import NotFoundError from '../utils/exceptions/notFoundError.js';
import BadRequestError from '../utils/exceptions/badRequestError.js';

import { getPaginationInfo, getPagingData } from '../utils/paginationHelper.js';

const { User } = db;

async function findAll(query) {
  // set pagination
  const { limit, offset, page } = getPaginationInfo(query.page, query.limit);

  const data = await User.findAndCountAll({
    where: { role: userRoles.BORROWER },
    limit,
    offset,
  });

  // format response
  const result = getPagingData(data, page, limit);
  return result;
}

async function findOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await User.findOne({ where: { id, role: userRoles.BORROWER } });
  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

async function updateOne(id, data) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await User.findOne({ where: { id, role: userRoles.BORROWER } });
  if (!user) throw new NotFoundError('_UserNotfound');

  data = pick(data, ['email', 'firstName', 'lastName', 'isActive']);
  assign(user, data);

  return user.save();
}

async function deleteOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  // TODO: check if borrower has active loans: throw an error

  // TODO: check if borrower has any loans: soft delete

  const user = await User.destroy({ where: { id, role: userRoles.BORROWER } });
  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

export { findAll, findOne, updateOne, deleteOne };
