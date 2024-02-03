import express from 'express';
import * as userController from './user.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();

router.route('/signup').post(userController.signup);

router
  .route('/me')
  .get(protect, userController.getMe)
  .patch(protect, userController.updateMe);

router
  .route('/:userId')
  .get(protect, restrictTo(userRoles.STAFF), userController.getOne)
  .patch(protect, restrictTo(userRoles.STAFF), userController.updateOne)
  .delete(protect, restrictTo(userRoles.STAFF), userController.deleteOne);

export default router;
