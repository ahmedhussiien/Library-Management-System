import httpStatus from '../utils/httpStatus.js';

async function getHealth(req, res) {
  const data = {
    message: 'Ok',
    uptime: process.uptime(),
    date: new Date(),
  };

  res.status(httpStatus.OK).send(data);
}

export { getHealth };
