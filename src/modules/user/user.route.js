import express from 'express';
import * as userController from './user.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();

/**
 * @apiDefine UserSuccess
 *
 * @apiSuccess {Number} id ID of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {Boolean} isActive Active status of the User.
 * @apiSuccess {Boolean} isDeleted Deletion Status of the User.
 * @apiSuccess {String} firstName First name of the User.
 * @apiSuccess {String} lastName Last name of the User.
 * @apiSuccess {String} role Role of the User.
 * @apiSuccess {Date} createdAt Creation time of the User.
 * @apiSuccess {Date} updatedAt  Last update time of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": 1,
 *         "email": "borrower@test.com",
 *         "isActive": true,
 *         "isDeleted": false,
 *         "firstName": "Borrower",
 *         "lastName": "Test",
 *         "role": "borrower",
 *         "createdAt": "2024-02-03T07:54:29.000Z",
 *         "updatedAt": "2024-02-03T07:54:29.000Z"
 *     }
 */

/**
 * @api {post} /users/signup Sign Up New User
 * @apiName SignUp
 * @apiGroup User
 *
 * @apiBody {Object} user
 * @apiBody  {String} user.email Email of the User.
 * @apiBody  {String} user.firstName First name of the User.
 * @apiBody  {String} user.lastName Last name of the User.
 * @apiBody  {String} user.password Password of the User.
 *
 * @apiBody {Object} borrower
 * @apiBody {String} borrower.contactNumber
 *
 * @apiUse UserSuccess
 * @apiUse ValidationError
 * @apiUse BadRequestError
 */
router.route('/signup').post(userController.signup);

router
  .route('/me')
  /**
   * @api {get} /users/me Get Current User information
   * @apiName GetMe
   * @apiGroup User
   *
   * @apiUse UserSuccess
   * @apiUse UnauthenticatedError
   */
  .get(protect, userController.getMe)

  /**
   * @api {patch} /users/me Update Current User information
   * @apiName UpdateMe
   * @apiGroup User
   *
   * @apiBody {Object} user
   * @apiBody  {String} [user.email] Email of the User.
   * @apiBody  {String} [user.firstName] First name of the User.
   * @apiBody  {String} [user.lastName] Last name of the User.
   * @apiBody  {String} [user.password] Password of the User.
   *
   * @apiBody {Object} borrower
   * @apiBody {String} [borrower.contactNumber]
   *
   * @apiUse UserSuccess
   * @apiUse UnauthenticatedError
   * @apiUse ValidationError
   * @apiUse BadRequestError
   */
  .patch(protect, userController.updateMe);

router
  .route('/:userId')
  /**
   * @api {get} /users/:userId Get User information
   * @apiParam {Number} userId Users unique ID.
   * @apiName GetUser
   * @apiGroup User
   *
   * @apiUse UserSuccess
   * @apiUse NotFoundError
   * @apiUse UnauthenticatedError
   * @apiUse UnauthorizedError
   */
  .get(protect, restrictTo(userRoles.STAFF), userController.getOne)

  /**
   * @api {patch} /users/:userId Update User information
   * @apiParam {Number} userId Users unique ID.
   * @apiName UpdateUser
   * @apiGroup User
   *
   * @apiBody {Object} user
   * @apiBody  {String} [user.email] Email of the User.
   * @apiBody  {String} [user.firstName] First name of the User.
   * @apiBody  {String} [user.lastName] Last name of the User.
   * @apiBody  {String} [user.isActive] Active status of the User.
   *
   * @apiBody {Object} borrower
   * @apiBody {String} [borrower.contactNumber]
   *
   * @apiUse UserSuccess
   * @apiUse NotFoundError
   * @apiUse UnauthorizedError
   * @apiUse UnauthenticatedError
   * @apiUse ValidationError
   * @apiUse BadRequestError
   */
  .patch(protect, restrictTo(userRoles.STAFF), userController.updateOne)

  /**
   * @api {delete} /users/:userId Delete user
   * @apiParam {Number} userId Users unique ID.
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 204 No Content
   *
   * @apiUse BadRequestError
   * @apiUse NotFoundError
   * @apiUse UnauthenticatedError
   * @apiUse UnauthorizedError
   */
  .delete(protect, restrictTo(userRoles.STAFF), userController.deleteOne);

export default router;
