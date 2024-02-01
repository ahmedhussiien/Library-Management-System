import { Router } from 'express';
import HttpStatus from '../../../utils/httpStatus.js';

class BookController {
  router = Router();

  constructor(bookService) {
    this.bookService = bookService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAll);
  }

  async getAll(req, res) {
    const result = await this.bookService.getAll();
    res.status(HttpStatus.OK).send(result);
  }

  getRouter() {
    return this.router;
  }
}

export default BookController;
