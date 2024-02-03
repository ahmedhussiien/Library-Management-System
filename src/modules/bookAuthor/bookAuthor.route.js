import express from 'express';

import * as bookAuthorController from './bookAuthor.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();

router
  .route('/')
  .get(bookAuthorController.getAll)
  .post(
    protect,
    restrictTo(userRoles.SUPERVISOR),
    bookAuthorController.createOne,
  );

router.route('/:authorId').get(bookAuthorController.getOne);

export default router;
