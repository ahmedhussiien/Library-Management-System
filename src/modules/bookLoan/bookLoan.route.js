import express from 'express';
import * as bookLoanController from './bookLoan.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();
router.use(protect, restrictTo(userRoles.BORROWER));

router
  .route('/')
  .get(bookLoanController.getAllBorrowerLoans)
  .post(bookLoanController.createOne);

router.route('/active').get(bookLoanController.getAllActiveBorrowerLoans);
router.route('/:loanId').get(bookLoanController.getOne);
router.route('/:loanId/check_in').post(bookLoanController.checkIn);

export default router;
