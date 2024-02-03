import httpStatus from '../../utils/httpStatus.js';
import * as borrowerService from './borrower.service.js';

async function getAll(req, res) {
  const { query } = req;
  const result = await borrowerService.findAll(query);
  res.status(httpStatus.OK).send(result);
}

async function getOne(req, res) {
  const { borrowerId } = req.params;
  const result = await borrowerService.findOne(borrowerId);
  res.status(httpStatus.OK).send(result);
}

export { getAll, getOne };
