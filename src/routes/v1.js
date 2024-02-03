import express from 'express';

import { bookRoute } from '../modules/book/index.js';
import { authRoute } from '../modules/auth/index.js';
import { userRoute } from '../modules/user/index.js';
import { bookAuthorRoute } from '../modules/bookAuthor/index.js';
import { borrowerRoute } from '../modules/borrower/index.js';
import { bookLoanRoute } from '../modules/bookLoan/index.js';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/books', bookRoute);
router.use('/authors', bookAuthorRoute);
router.use('/borrowers', borrowerRoute);
router.use('/loans', bookLoanRoute);

export default router;
