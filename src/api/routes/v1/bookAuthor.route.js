import express from 'express';
import * as bookAuthorController from '../../controllers/bookAuthor.controller.js';

const router = express.Router();

router
  .route('/')
  .get(bookAuthorController.getAll)
  .post(bookAuthorController.createOne);

router.route('/:authorId').get(bookAuthorController.getOne);

export default router;
