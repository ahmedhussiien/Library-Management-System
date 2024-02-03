import httpStatus from '../../utils/httpStatus.js';
import * as bookAuthorService from './bookAuthor.service.js';

async function getAll(req, res) {
  const { query } = req;
  const result = await bookAuthorService.findAll(query);
  res.status(httpStatus.OK).send(result);
}

async function getOne(req, res) {
  const { authorId } = req.params;
  const result = await bookAuthorService.findOne(authorId);
  res.status(httpStatus.OK).send(result);
}

async function createOne(req, res) {
  const data = req.body;
  const result = await bookAuthorService.createOne(data);
  res.status(httpStatus.CREATED).send(result);
}

export { getAll, getOne, createOne };
