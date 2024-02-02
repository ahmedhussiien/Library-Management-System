import httpStatus from '../utils/httpStatus.js';
import * as bookService from '../../services/book.service.js';

async function getAll(req, res) {
  const result = await bookService.findAll();
  res.status(httpStatus.OK).send(result);
}

export { getAll };
