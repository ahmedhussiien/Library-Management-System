import express from 'express';

import * as bookAuthorController from '../../controllers/bookAuthor.controller.js';

import protect from '../../middlewares/protect.js';
import restrictTo from '../../middlewares/restrictTo.js';
import userRoles from '../../../db/enums/userRoles.js';

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
