import express from 'express';

import bookRoute from './book.route.js';
import authRoute from './auth.route.js';

const router = express.Router();

router.use('/books', bookRoute);
router.use('/auth', authRoute);

export default router;
