import express from 'express';

import * as borrowerController from './borrower.controller.js';

import protect from '../../middlewares/protect.js';
import { restrictTo, userRoles } from '../../middlewares/restrictTo.js';

const router = express.Router();
router.use(protect, restrictTo(userRoles.STAFF));

router.route('/').get(borrowerController.getAll);
router.route('/:borrowerId').get(borrowerController.getOne);

export default router;
