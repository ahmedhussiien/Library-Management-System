import express from 'express';
import * as authController from './auth.controller.js';

const router = express.Router();

/**
 * @api {post} /auth/login Login user
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiBody {Object} user
 * @apiBody  {String} email Email of the User.
 * @apiBody  {String} password Password of the User.
 *
 * @apiUse UserSuccess
 * @apiUse UnauthenticatedError
 * @apiUse BadRequestError
 */
router.route('/login').post(authController.login);

/**
 * @api {post} /auth/logout Logout user
 * @apiName Logout
 * @apiGroup Auth
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *
 */
router.route('/logout').post(authController.logout);

export default router;
