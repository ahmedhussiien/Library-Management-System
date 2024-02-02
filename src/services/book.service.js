import _ from 'lodash';
const { assign, omit } = _;

import db from '../db/database.js';
import NotFoundError from '../utils/exceptions/notFoundError.js';
import BadRequestError from '../utils/exceptions/badRequestError.js';

const { Book } = db;

async function findAll() {
  return Book.findAll();
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
