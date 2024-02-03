import express from 'express';
import * as userController from './user.controller.js';

import protect from '../../middlewares/protect.js';

const router = express.Router();

router.route('/signup').post(userController.signup);

router
  .route('/me')
  .get(protect, userController.getMe)
  .patch(protect, userController.updateMe);

export default router;
