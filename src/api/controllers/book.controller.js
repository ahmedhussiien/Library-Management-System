import httpStatus from '../utils/httpStatus.js';
import * as bookService from '../../services/book.service.js';

async function getAll(req, res) {
  const { query } = req;
  const result = await bookService.findAll(query);
  res.status(httpStatus.OK).send(result);
}

async function getOne(req, res) {
  const { bookId } = req.params;
  const result = await bookService.findOne(bookId);
  res.status(httpStatus.OK).send(result);
}

async function createOne(req, res) {
  const data = req.body;
  const result = await bookService.createOne(data);
  res.status(httpStatus.CREATED).send(result);
}

async function deleteOne(req, res) {
  const { bookId } = req.params;
  await bookService.deleteOne(bookId);
  res.sendStatus(httpStatus.NO_CONTENT);
}

async function updateOne(req, res) {
  const { bookId } = req.params;
  const data = req.body;

  const result = await bookService.updateOne(bookId, data);
  res.status(httpStatus.OK).send(result);
}

export { getAll, getOne, createOne, deleteOne, updateOne };
