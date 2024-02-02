import express from 'express';
import * as bookController from '../../controllers/book.controller.js';

import protect from '../../middlewares/protect.js';
import restrictTo from '../../middlewares/restrictTo.js';
import userRoles from '../../../db/enums/userRoles.js';

const router = express.Router();

router
  .route('/')
  .get(bookController.getAll)
  .post(protect, restrictTo(userRoles.SUPERVISOR), bookController.createOne);

router
  .route('/:bookId')
  .get(bookController.getOne)
  .patch(protect, restrictTo(userRoles.SUPERVISOR), bookController.updateOne)
  .delete(protect, restrictTo(userRoles.SUPERVISOR), bookController.deleteOne);

export default router;
