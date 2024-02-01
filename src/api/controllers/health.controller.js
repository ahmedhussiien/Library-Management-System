import { Router } from 'express';
import HttpStatus from '../../utils/httpStatus.js';

class HealthController {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getStatus);
  }

  async getStatus(req, res) {
    const data = {
      message: 'Ok',
      uptime: process.uptime(),
      date: new Date(),
    };

    res.status(HttpStatus.OK).send(data);
  }
}

export default HealthController;
