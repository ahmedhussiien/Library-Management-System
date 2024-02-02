import express from 'express';
import * as bookController from '../../controllers/book.controller.js';

const router = express.Router();
router.route('/').get(bookController.getAll);

export default router;
