import express from 'express';
import * as bookController from './book.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();

/**
 * @apiDefine BookSuccess
 *
 * @apiSuccess {Number} id ID of the Book.
 * @apiSuccess {Number} authorId ID of the Author.
 * @apiSuccess {String} title Title of the Book.
 * @apiSuccess {String} ISBN ISBN number of the Book.
 * @apiSuccess {Number} availableQuantity Available quantity from the Book.
 * @apiSuccess {Number} shelfNumber Shelf number of the Book.
 * @apiSuccess {Date} createdAt Date of Book creation.
 * @apiSuccess {Date} updatedAt Date of last Book update.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 3,
 *         "authorId": 37,
 *         "title": "Assumenda nostrum corpus crastinus audio cogito comparo.",
 *         "ISBN": "9781970439441",
 *         "availableQuantity": 1000,
 *         "shelfNumber": 30,
 *         "createdAt": "2024-02-03T07:54:10.000Z",
 *         "updatedAt": "2024-02-03T07:54:10.000Z"
 *     }
 */

router
  .route('/')

  /**
   * @api {get} /v1/books Get all Books data
   * @apiName GetAllBooks
   * @apiGroup Book
   *
   * @apiQuery {Number} limit The number of items per page.
   * @apiQuery {Number} page The page number.
   * @apiQuery {String} title The book title.
   * @apiQuery {String} ISBN The book ISBN.
   * @apiQuery {String} authorName The book author name.
   *
   *
   * @apiSuccess {Number} totalItems Total number of the Books.
   * @apiSuccess {Number} totalPages Total number of the pages.
   * @apiSuccess {Number} currentPage Current page.
   * @apiSuccess {Object[]} items Books.
   *
   * @apiSuccess {Number} items.id ID of the Book.
   * @apiSuccess {Number} items.authorId ID of the Author.
   * @apiSuccess {String} items.title Title of the Book.
   * @apiSuccess {String} items.ISBN ISBN number of the Book.
   * @apiSuccess {Number} items.availableQuantity Available quantity from the Book.
   * @apiSuccess {Number} items.shelfNumber Shelf number of the Book.
   * @apiSuccess {Date} items.createdAt Date of Book creation.
   * @apiSuccess {Date} items.updatedAt Date of last Book update.
   *
   * @apiSuccess {Object} items.bookAuthor Author info.
   * @apiSuccess {String} items.bookAuthor.id ID of the Author.
   * @apiSuccess {Boolean} items.bookAuthor.name Name of the Author.
   * @apiSuccess {Boolean} items.bookAuthor.createdAt Date of Author creation
   * @apiSuccess {String} items.bookAuthor.updatedAt Date of last Author update.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *         "totalItems": 3,
   *         "totalPages": 3,
   *         "currentPage": 1,
   *         "items": [
   *             {
   *                 "id": 258,
   *                 "authorId": 89,
   *                 "title": "Vindico terra cohibeo carbo ago suppono.",
   *                 "ISBN": "9780661635704",
   *                 "availableQuantity": 1000,
   *                 "shelfNumber": 13,
   *                 "createdAt": "2024-02-03T07:54:13.000Z",
   *                 "updatedAt": "2024-02-03T07:54:13.000Z",
   *                 "bookAuthor": {
   *                     "id": 89,
   *                     "name": "Jeremiah Price",
   *                     "createdAt": "2024-02-03T07:54:10.000Z",
   *                     "updatedAt": "2024-02-03T07:54:10.000Z"
   *                 }
   *             }
   *         ]
   *     }
   *
   */
  .get(bookController.getAll)

  /**
   * @api {post} /v1/books Create a new Book
   * @apiName CreateBook
   * @apiGroup Book
   *
   * @apiBody  {String} title Title of the Book
   * @apiBody  {String} authorId ID of the Author.
   * @apiBody  {Number} shelfNumber Shelf number of the Book .
   * @apiBody  {Number} availableQuantity Available quantity from the book.
   * @apiBody  {String} ISBN ISBN of the Book.
   *
   * @apiUse BookSuccess
   * @apiUse ValidationError
   * @apiUse UnauthenticatedError
   * @apiUse UnauthorizedError
   * @apiUse BadRequestError
   */
  .post(protect, restrictTo(userRoles.STAFF), bookController.createOne);

router
  .route('/:bookId')

  /**
   * @api {get} /v1/books/:id Get Book data
   * @apiParam {Number} id Book unique ID.
   * @apiName GetBook
   * @apiGroup Book
   *
   * @apiUse BookSuccess
   * @apiUse NotFoundError
   * @apiUse UnauthenticatedError
   * @apiUse UnauthorizedError
   */
  .get(bookController.getOne)

  /**
   * @api {patch} /v1/books/:id Update Book data
   * @apiParam {Number} id Book unique ID.
   * @apiName UpdateBook
   * @apiGroup Book
   *
   * @apiBody  {String} [title] Title of the Book
   * @apiBody  {String} [authorId] ID of the Author.
   * @apiBody  {Number} [shelfNumber] Shelf number of the Book .
   * @apiBody  {Number} [availableQuantity] Available quantity from the book.
   * @apiBody  {String} [ISBN] ISBN of the Book.
   *
   * @apiUse BookSuccess
   * @apiUse NotFoundError
   * @apiUse UnauthorizedError
   * @apiUse UnauthenticatedError
   * @apiUse ValidationError
   * @apiUse BadRequestError
   */
  .patch(protect, restrictTo(userRoles.STAFF), bookController.updateOne)

  /**
   * @api {delete} /v1/books/:id Delete Book
   * @apiParam {Number} id Book unique ID.
   * @apiName DeleteBook
   * @apiGroup Book
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 204 No Content
   *
   * @apiUse BadRequestError
   * @apiUse NotFoundError
   * @apiUse UnauthenticatedError
   * @apiUse UnauthorizedError
   */
  .delete(protect, restrictTo(userRoles.STAFF), bookController.deleteOne);

export default router;
