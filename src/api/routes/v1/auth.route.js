import express from 'express';
import * as authController from '../../controllers/auth.controller.js';

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/logout').post(authController.logout);

export default router;
