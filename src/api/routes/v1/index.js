import express from 'express';
import bookRoute from './book.route.js';

const router = express.Router();

router.use('/books', bookRoute);

export default router;
