import httpStatus from '../../utils/httpStatus.js';
import * as bookLoanService from './bookLoan.service.js';

async function getAllBorrowerLoans(req, res) {
  const { borrowerId } = req.session;
  const { query } = req;

  const result = await bookLoanService.findAllBorrowerLoans(query, borrowerId);
  res.status(httpStatus.OK).send(result);
}

async function getAllActiveBorrowerLoans(req, res) {
  const { borrowerId } = req.session;
  const { query } = req;

  const result = await bookLoanService.findAllActiveBorrowerLoans(
    query,
    borrowerId,
  );

  res.status(httpStatus.OK).send(result);
}

async function getOne(req, res) {
  const { loanId } = req.params;
  const { borrowerId } = req.session;

  const result = await bookLoanService.findOne(loanId, borrowerId);
  res.status(httpStatus.OK).send(result);
}

async function createOne(req, res) {
  const data = req.body;
  const { borrowerId } = req.session;

  const result = await bookLoanService.createOne(data, borrowerId);
  res.status(httpStatus.CREATED).send(result);
}

async function checkIn(req, res) {
  const { loanId } = req.params;
  const { borrowerId } = req.session;

  const result = await bookLoanService.checkIn(loanId, borrowerId);
  res.status(httpStatus.OK).send(result);
}

export {
  getAllBorrowerLoans,
  getAllActiveBorrowerLoans,
  getOne,
  createOne,
  checkIn,
};
