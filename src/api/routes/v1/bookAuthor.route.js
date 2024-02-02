import express from 'express';
import * as authorController from '../../controllers/bookAuthor.controller.js';

const router = express.Router();

router.route('/').get(authorController.getAll).post(authorController.createOne);
router.route('/:authorId').get(authorController.getOne);

export default router;
