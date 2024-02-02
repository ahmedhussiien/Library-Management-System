import express from 'express';
import * as healthController from '../controllers/health.controller.js';

const router = express.Router();
router.route('/').get(healthController.getHealth);

export default router;
