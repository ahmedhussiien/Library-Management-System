import express from 'express';

import * as borrowerController from '../../controllers/borrower.controller.js';

import protect from '../../middlewares/protect.js';
import restrictTo from '../../middlewares/restrictTo.js';
import userRoles from '../../../db/enums/userRoles.js';

const router = express.Router();

router.route('/').get(borrowerController.getAll);

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
