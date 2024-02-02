import express from 'express';

import bookRoute from './book.route.js';
import authRoute from './auth.route.js';
import userRoute from './user.route.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/books', bookRoute);

export default router;
