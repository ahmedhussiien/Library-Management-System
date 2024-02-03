import httpStatus from '../../utils/httpStatus.js';
import * as userService from './user.service.js';

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
  const result = await userService.findOne(id);
  res.status(httpStatus.OK).send(result);
}

async function updateOne(req, res) {
  const data = req.body;
  const { userId } = req.params;
  const result = await userService.updateOneByStaff(userId, data);
  res.status(httpStatus.OK).send(result);
}

async function getOne(req, res) {
  const { userId } = req.params;
  const result = await userService.findOne(userId);
  res.status(httpStatus.OK).send(result);
}

async function deleteOne(req, res) {
  const { userId } = req.params;
  await userService.deleteOne(userId);
  res.sendStatus(httpStatus.NO_CONTENT);
}

export { signup, updateMe, getMe, deleteOne, updateOne, getOne };
