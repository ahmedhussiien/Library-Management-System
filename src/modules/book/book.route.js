import express from 'express';
import * as bookController from './book.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();

router
  .route('/')
  .get(bookController.getAll)
  .post(protect, restrictTo(userRoles.STAFF), bookController.createOne);

router
  .route('/:bookId')
  .get(bookController.getOne)
  .patch(protect, restrictTo(userRoles.STAFF), bookController.updateOne)
  .delete(protect, restrictTo(userRoles.STAFF), bookController.deleteOne);

export default router;
