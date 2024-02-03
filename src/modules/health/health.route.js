import express from 'express';
import * as healthController from './health.controller.js';

const router = express.Router();

/**
 * @api {get} /health/ Get status
 * @apiName GetStatus
 * @apiGroup Health
 *
 * @apiSuccess {String} message
 * @apiSuccess {Number} uptime The uptime of the API.
 * @apiSuccess {Date} date Response time.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "Ok",
 *           "uptime": 33.9450948,
 *           "date": "2024-02-03T15:25:13.718Z"
 *       }
 *
 */
router.route('/').get(healthController.getHealth);

export default router;
