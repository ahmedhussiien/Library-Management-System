import _ from 'lodash';
const { assign, pick } = _;

import db from '../../db/database.js';
import NotFoundError from '../../utils/exceptions/notFoundError.js';
import BadRequestError from '../../utils/exceptions/badRequestError.js';
import { userRoles } from '../user/user.enum.js';

import * as bookLoanService from '../bookLoan/bookLoan.service.js';

import {
  getPaginationInfo,
  getPagingData,
} from '../../utils/paginationHelper.js';

const { Borrower, User } = db;

async function findAll(query) {
  // set pagination
  const { limit, offset, page } = getPaginationInfo(query.page, query.limit);

  const data = await Borrower.findAndCountAll({
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

  const borrower = await Borrower.findOne({
    where: { id },
    include: [User],
  });

  if (!borrower) throw new NotFoundError('_BorrowerNotfound');
  return borrower;
}

async function findOneByUserId(userId) {
  if (!userId) throw new BadRequestError('_ProvideId');

  const borrower = await Borrower.findOne({
    where: { userId },
  });

  if (!borrower) throw new NotFoundError('_BorrowerNotfound');
  return borrower;
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

async function deleteOne(id, transaction) {
  if (!id) throw new BadRequestError('_ProvideId');

  // check if borrower has active loans -> throw an error
  const numActiveLoans = await bookLoanService.getBorrowerNumActiveLoans(
    id,
    transaction,
  );

  if (numActiveLoans) throw new BadRequestError('_BorrowerHasActiveLoans');

  // check if borrower has any loans -> soft delete
  const numLoans = await bookLoanService.getBorrowerNumLoans(id, transaction);
  if (numLoans) return false;

  const borrower = await Borrower.destroy({ where: { id }, transaction });
  if (!borrower) throw new NotFoundError('_BorrowerNotfound');
  return true;
}

export {
  findAll,
  findOne,
  findOneByUserId,
  createOne,
  deleteOne,
  updateOneByUserId,
};
