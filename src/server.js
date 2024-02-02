import chalk from 'chalk';

import Config from './config.js';
import logger from './logger.js';
import app from './api/app.js';

const server = app.listen(Config.PORT, () => {
  logger.info(`App running on port ${chalk.greenBright(Config.PORT)}...`);
});
