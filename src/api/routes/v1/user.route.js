import express from 'express';
import * as userController from '../../controllers/user.controller.js';

const router = express.Router();
router.route('/signup').post(userController.signup);

export default router;
