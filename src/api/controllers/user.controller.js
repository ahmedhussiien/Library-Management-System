import httpStatus from '../utils/httpStatus.js';
import * as userService from '../../services/user.service.js';

async function signup(req, res) {
  const data = req.body;
  const user = await userService.signup(data);
  res.status(httpStatus.CREATED).send(user);
}

async function updateMe(req, res) {
  const data = req.body;
  const id = req.session.userId;
  const result = await userService.updateOne(id, data);
  res.status(httpStatus.OK).send(result);
}

async function getMe(req, res) {
  const id = req.session.userId;
  const result = await userService.getOne(id);
  res.status(httpStatus.OK).send(result);
}

export { signup, updateMe, getMe };
