import express from 'express';

import * as borrowerController from './borrower.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();
router.use(protect, restrictTo(userRoles.STAFF));

/**
 * @api {get} /v1/borrowers Get all Borrowers data
 * @apiName GetAllBorrowers
 * @apiGroup Borrower
 *
 * @apiQuery {Number} limit The number of items per page.
 * @apiQuery {Number} page The page number.
 *
 * @apiSuccess {Number} totalItems Total number of the Borrowers.
 * @apiSuccess {Number} totalPages Total number of the pages.
 * @apiSuccess {Number} currentPage Current page.
 * @apiSuccess {Object[]} items Borrowers.
 *
 * @apiSuccess {Number} items.id ID of the Borrower.
 * @apiSuccess {Number} items.userId ID of the User.
 * @apiSuccess {String} items.contactNumber Contact number of the Borrower.
 * @apiSuccess {Object} items.user User info.
 * @apiSuccess {String} items.user.email Email of the User.
 * @apiSuccess {Boolean} items.user.isActive Active status of the User.
 * @apiSuccess {Boolean} items.user.isDeleted Deletion Status of the User.
 * @apiSuccess {String} items.user.firstName First name of the User.
 * @apiSuccess {String} items.user.lastName Last name of the User.
 * @apiSuccess {String} items.user.role Role of the User.
 * @apiSuccess {Date} items.user.createdAt Creation time of the User.
 * @apiSuccess {Date} items.user.updatedAt  Last update time of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "totalItems": 200,
 *         "totalPages": 200,
 *         "currentPage": 1,
 *         "items": [
 *             {
 *                 "id": 1,
 *                 "userId": 1,
 *                 "contactNumber": "94933759080",
 *                 "user": {
 *                     "id": 1,
 *                     "email": "borrower@test.com",
 *                     "isActive": true,
 *                     "isDeleted": false,
 *                     "firstName": "Hussein",
 *                     "lastName": "Test",
 *                     "role": "borrower",
 *                     "createdAt": "2024-02-03T07:54:29.000Z",
 *                     "updatedAt": "2024-02-03T14:28:12.000Z"
 *                 }
 *             }
 *         ]
 *     }
 *
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 * @apiUse UnauthenticatedError
 * @apiUse UnauthorizedError
 */
router.route('/').get(borrowerController.getAll);

/**
 * @api {get} /v1/borrowers/:id Get Borrower data
 * @apiName GetBorrower
 * @apiGroup Borrower
 * @apiParam {Number} id Borrower unique ID.
 *
 * @apiSuccess {Number} id ID of the Borrower.
 * @apiSuccess {Number} userId ID of the User.
 * @apiSuccess {String} contactNumber Contact number of the Borrower.
 * @apiSuccess {Object} user User info.
 * @apiSuccess {String} user.email Email of the User.
 * @apiSuccess {Boolean} user.isActive Active status of the User.
 * @apiSuccess {Boolean} user.isDeleted Deletion Status of the User.
 * @apiSuccess {String} user.firstName First name of the User.
 * @apiSuccess {String} user.lastName Last name of the User.
 * @apiSuccess {String} user.role Role of the User.
 * @apiSuccess {Date} user.createdAt Creation time of the User.
 * @apiSuccess {Date} user.updatedAt  Last update time of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 8,
 *         "userId": 8,
 *         "contactNumber": "64177777332",
 *         "user": {
 *             "id": 8,
 *             "email": "Jannie.Wintheiser@gmail.com",
 *             "isActive": true,
 *             "isDeleted": false,
 *             "firstName": "Anibal",
 *             "lastName": "Schinner",
 *             "role": "borrower",
 *             "createdAt": "2024-02-03T07:54:29.000Z",
 *             "updatedAt": "2024-02-03T07:54:29.000Z"
 *         }
 *     }
 *
 * @apiUse BadRequestError
 * @apiUse NotFoundError
 * @apiUse UnauthenticatedError
 * @apiUse UnauthorizedError
 */
router.route('/:borrowerId').get(borrowerController.getOne);

export default router;
