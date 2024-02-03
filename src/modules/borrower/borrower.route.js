import express from 'express';

import * as borrowerController from './borrower.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();

router
  .route('/')
  .get(protect, restrictTo(userRoles.SUPERVISOR), borrowerController.getAll);

router
  .route('/:borrowerId')
  .get(protect, restrictTo(userRoles.SUPERVISOR), borrowerController.getOne)
  .patch(
    protect,
    restrictTo(userRoles.SUPERVISOR),
    borrowerController.updateOne,
  )
  .delete(
    protect,
    restrictTo(userRoles.SUPERVISOR),
    borrowerController.deleteOne,
  );

export default router;
