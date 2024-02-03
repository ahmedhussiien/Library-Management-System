import express from 'express';
import * as bookLoanController from './bookLoan.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();
router.use(protect, restrictTo(userRoles.BORROWER));

/**
 * @apiDefine LoanSuccess
 *
 * @apiSuccess {Number} id ID of the Loan.
 * @apiSuccess {Number} borrowerId ID of the Borrower.
 * @apiSuccess {Number} bookId ID of the Book.
 * @apiSuccess {Date} checkOutDate Date of Book checking out of the library.
 * @apiSuccess {Date} checkInDate Date of Book checking in to the library.
 * @apiSuccess {Date} dueDate Date Loan due.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 101,
 *         "bookId": 1,
 *         "dueDate": "2024-12-12",
 *         "borrowerId": 2,
 *         "checkInDate": null,
 *         "checkOutDate": "2024-02-03"
 *     }
 */

/**
 * @apiDefine LoansListSuccess
 *
 * @apiSuccess {Number} totalItems Total number of the Books.
 * @apiSuccess {Number} totalPages Total number of the pages.
 * @apiSuccess {Number} currentPage Current page.
 * @apiSuccess {Object[]} items Loans.
 *
 * @apiSuccess {Number} items.id ID of the Loan.
 * @apiSuccess {Number} items.borrowerId ID of the Borrower.
 * @apiSuccess {Number} items.bookId ID of the Book.
 * @apiSuccess {Date} items.checkOutDate Date of Book checking out of the library.
 * @apiSuccess {Date} items.checkInDate Date of Book checking in to the library.
 * @apiSuccess {Date} items.dueDate Date Loan due.
 *
 * @apiSuccess {Object} items.book Book info.
 * @apiSuccess {Number} items.book.id ID of the Book.
 * @apiSuccess {Number} items.book.authorId ID of the Author.
 * @apiSuccess {Boolean} items.book.title title of the Author.
 * @apiSuccess {String} items.book.ISBN ISBN number of the Book.
 * @apiSuccess {Number} items.book.availableQuantity Available quantity from the Book.
 * @apiSuccess {Number} items.book.shelfNumber Shelf number of the Book.
 * @apiSuccess {Date} items.book.createdAt Date of Book creation.
 * @apiSuccess {Date} items.book.updatedAt Date of last Book update.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "totalItems": 1,
 *         "totalPages": 1,
 *         "currentPage": 1,
 *         "items": [
 *             {
 *                 "id": 99,
 *                 "borrowerId": 2,
 *                 "bookId": 1222,
 *                 "checkOutDate": "2024-02-03",
 *                 "checkInDate": null,
 *                 "dueDate": "2024-07-07",
 *                 "createdAt": "2024-02-03T07:54:35.000Z",
 *                 "updatedAt": "2024-02-03T07:54:35.000Z",
 *                 "book": {
 *                     "id": 1222,
 *                     "authorId": 81,
 *                     "title": "Pax damnatio consectetur vivo.",
 *                     "ISBN": "9780138347895",
 *                     "availableQuantity": 999,
 *                     "shelfNumber": 15,
 *                     "createdAt": "2024-02-03T07:54:22.000Z",
 *                     "updatedAt": "2024-02-03T07:54:35.000Z"
 *                 }
 *             }
 *         ]
 *     }
 *
 */

router
  .route('/')
  /**
   * @api {get} /v1/loans Get all Loans data
   * @apiName GetAllLoans
   * @apiGroup Loan
   *
   * @apiQuery {Number} limit The number of items per page.
   * @apiQuery {Number} page The page number.
   *
   * @apiUse LoansListSuccess
   * @apiUse UnauthenticatedError
   * @apiUse UnauthorizedError
   */
  .get(bookLoanController.getAllBorrowerLoans)

  /**
   * @api {post} /v1/loans Create a new Loan
   * @apiName CreateLoan
   * @apiGroup Loan
   *
   * @apiBody  {Number} bookId ID of the Book
   * @apiBody  {Date} dueDate Loan due date.
   *
   * @apiUse LoanSuccess
   * @apiUse ValidationError
   * @apiUse UnauthenticatedError
   * @apiUse UnauthorizedError
   * @apiUse BadRequestError
   */
  .post(bookLoanController.createOne);

/**
 * @api {get} /v1/loans/active Get all Active Loans data
 * @apiName GetAllActiveLoans
 * @apiGroup Loan
 *
 * @apiQuery {Number} limit The number of items per page.
 * @apiQuery {Number} page The page number.
 *
 * @apiUse LoansListSuccess
 * @apiUse UnauthenticatedError
 * @apiUse UnauthorizedError
 */
router.route('/active').get(bookLoanController.getAllActiveBorrowerLoans);

/**
 * @api {get} /v1/loans/:id Get Loan data
 * @apiParam {Number} id Loan unique ID.
 * @apiName GetLoan
 * @apiGroup Loan
 *
 * @apiUse LoanSuccess
 * @apiUse NotFoundError
 * @apiUse UnauthenticatedError
 * @apiUse UnauthorizedError
 */
router.route('/:loanId').get(bookLoanController.getOne);

/**
 * @api {post} /v1/loans/:id Check in a Loan
 * @apiParam {Number} id Loan unique ID.
 * @apiName CheckInLoan
 * @apiGroup Loan
 *
 * @apiUse LoanSuccess
 * @apiUse ValidationError
 * @apiUse UnauthenticatedError
 * @apiUse UnauthorizedError
 * @apiUse BadRequestError
 */
router.route('/:loanId/check_in').post(bookLoanController.checkIn);

export default router;
