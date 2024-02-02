import express from 'express';
import * as bookController from '../../controllers/book.controller.js';

const router = express.Router();

router.route('/').get(bookController.getAll).post(bookController.createOne);

router
  .route('/:bookId')
  .get(bookController.getOne)
  .patch(bookController.updateOne)
  .delete(bookController.deleteOne);

export default router;
