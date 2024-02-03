import _ from 'lodash';
const { assign, pick } = _;

import db from '../../db/database.js';
import NotFoundError from '../../utils/exceptions/notFoundError.js';
import BadRequestError from '../../utils/exceptions/badRequestError.js';
import { userRoles } from '../user/user.enum.js';

import {
  getPaginationInfo,
  getPagingData,
} from '../../utils/paginationHelper.js';

const { Borrower, User } = db;

async function findAll(query) {
  // set pagination
  const { limit, offset, page } = getPaginationInfo(query.page, query.limit);

  const data = await User.findAndCountAll({
    where: { role: userRoles.BORROWER },
    include: [User],
    limit,
    offset,
  });

  // format response
  const result = getPagingData(data, page, limit);
  return result;
}

async function findOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const user = await User.findOne({
    where: { id, role: userRoles.BORROWER },
    include: [User],
  });

  if (!user) throw new NotFoundError('_UserNotfound');

  return user;
}

async function createOne(data, transaction) {
  return Borrower.create(data, { transaction });
}

async function updateOneByUserId(userId, data, transaction) {
  if (!userId) throw new BadRequestError('_ProvideId');

  const borrower = await Borrower.findOne({ where: { userId }, transaction });
  if (!borrower) throw new NotFoundError('_BorrowerNotfound');

  data = pick(data, ['contactNumber']);
  assign(borrower, data);

  return borrower.save({ transaction });
}

async function deleteOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  // TODO: check if borrower has active loans: throw an error

  // TODO: check if borrower has any loans: soft delete

  const borrower = await Borrower.destroy({ where: { id } });
  if (!borrower) throw new NotFoundError('_BorrowerNotfound');

  return borrower;
}

export { findAll, findOne, createOne, deleteOne, updateOneByUserId };
