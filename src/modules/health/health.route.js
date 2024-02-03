import express from 'express';
import * as healthController from './health.controller.js';

const router = express.Router();
router.route('/').get(healthController.getHealth);

export default router;
