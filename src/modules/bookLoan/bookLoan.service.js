import db from '../../db/database.js';
import NotFoundError from '../../utils/exceptions/notFoundError.js';
import BadRequestError from '../../utils/exceptions/badRequestError.js';

import {
  getPaginationInfo,
  getPagingData,
} from '../../utils/paginationHelper.js';

const { BookLoan, BookAuthor, Book, sequelize } = db;

async function findAllBorrowerLoans(query, borrowerId) {
  // set pagination
  const { limit, offset, page } = getPaginationInfo(query.page, query.limit);

  const data = await BookLoan.findAndCountAll({
    where: { borrowerId },
    include: [Book],
    limit,
    offset,
  });

  // format response
  const result = getPagingData(data, page, limit);
  return result;
}

async function getBorrowerNumLoans(borrowerId, transaction) {
  return BookLoan.count({
    where: { borrowerId },
    transaction,
  });
}

async function findAllActiveBorrowerLoans(query, borrowerId) {
  // set pagination
  const { limit, offset, page } = getPaginationInfo(query.page, query.limit);

  const data = await BookLoan.findAndCountAll({
    where: { borrowerId, checkInDate: null },
    include: [Book],
    limit,
    offset,
  });

  // format response
  const result = getPagingData(data, page, limit);
  return result;
}

async function getBorrowerNumActiveLoans(borrowerId, transaction) {
  return BookLoan.count({
    where: { borrowerId, checkInDate: null },
    transaction,
  });
}

async function findOne(id, borrowerId) {
  if (!id || !borrowerId) throw new BadRequestError('_ProvideId');

  const bookLoan = await BookLoan.findOne({
    where: { id, borrowerId },
    include: [Book],
  });
  if (!bookLoan) throw new NotFoundError('_BookLoanNotfound');

  return bookLoan;
}

async function createOne(data, borrowerId) {
  if (!data.bookId) throw new BadRequestError('_ProvideBookId');

  const bookLoan = await sequelize.transaction(async (t) => {
    // get book and check available quantity
    const book = await Book.findOne({
      where: { id: data.bookId },
      transaction: t,
    });

    if (!book) throw new NotFoundError('_BookNotFound');

    if (book.availableQuantity <= 0)
      throw new BadRequestError('_NoEnoughQuantity');

    // decrease available quantity
    book.availableQuantity -= 1;
    await book.save({ transaction: t });

    // create loan
    data.borrowerId = borrowerId;
    data.checkInDate = null;
    data.checkOutDate = new Date();

    const bookLoan = await BookLoan.create(data, { transaction: t });
    return bookLoan;
  });

  return bookLoan;
}

async function checkIn(id, borrowerId) {
  if (!id) throw new BadRequestError('_ProvideId');

  const bookLoan = await sequelize.transaction(async (t) => {
    const bookLoan = await BookLoan.findOne({
      where: { id, borrowerId },
      transaction: t,
    });

    if (!bookLoan) throw new NotFoundError('_BookLoanNotfound');

    if (bookLoan.checkInDate)
      throw new BadRequestError('_LoanAlreadyCheckedIn');

    const book = await Book.findOne({
      where: { id: bookLoan.bookId },
      transaction: t,
    });

    book.availableQuantity += 1;
    await book.save({ transaction: t });

    bookLoan.checkInDate = new Date();
    return bookLoan.save({ transaction: t });
  });

  return bookLoan;
}

export {
  findAllBorrowerLoans,
  findAllActiveBorrowerLoans,
  getBorrowerNumActiveLoans,
  getBorrowerNumLoans,
  findOne,
  createOne,
  checkIn,
};
