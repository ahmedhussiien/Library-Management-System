import db from '../db/database.js';
import NotFoundError from '../utils/exceptions/notFoundError.js';
import BadRequestError from '../utils/exceptions/badRequestError.js';

const { BookAuthor } = db;

async function findAll() {
  return BookAuthor.findAll();
}

async function findOne(id) {
  if (!id) throw new BadRequestError('_ProvideId');

  const author = await BookAuthor.findOne({ where: { id } });
  if (!author) throw new NotFoundError('_AuthorNotfound');

  return author;
}

async function createOne(data) {
  return BookAuthor.create(data);
}

export { findAll, findOne, createOne };
