import Config from '../../config.js';
import httpStatus from '../utils/httpStatus.js';

import * as userService from '../../services/user.service.js';

async function signup(req, res) {
  const data = req.body;
  const user = await userService.signup(data);
  res.status(httpStatus.CREATED).send({ user });
}

export { signup };
