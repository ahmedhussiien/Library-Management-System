import _ from 'lodash';
const { assign, omit } = _;

import db from '../db/database.js';
import NotFoundError from '../utils/exceptions/notFoundError.js';
import BadRequestError from '../utils/exceptions/badRequestError.js';
import { getPaginationInfo, getPagingData } from '../utils/paginationHelper.js';

const { Book } = db;

async function findAll(query) {
  // search with params
  const { title, authorName, ISBN } = query;

  // set pagination
  const { limit, offset, page } = getPaginationInfo(query.page, query.limit);
  const data = await Book.findAndCountAll({ limit, offset });

  // format response
  const result = getPagingData(data, page, limit);
  return result;
}

async function findOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const book = await Book.findOne({ where: { id } });
  if (!book) throw new NotFoundError('_BookNotfound');

  return book;
}

async function createOne(data) {
  return Book.create(data);
}

async function deleteOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const book = await Book.destroy({ where: { id } });
  if (!book) throw new NotFoundError('_BookNotfound');

  return book;
}

async function updateOne(id, data) {
  if (!id) throw new BadRequestError('_ProvideId');

  const book = await Book.findOne({ where: { id } });
  if (!book) throw new NotFoundError('_BookNotfound');

  data = omit(data, ['id']);
  console.log(data);
  assign(book, data);

  return book.save();
}

export { findAll, findOne, createOne, deleteOne, updateOne };
