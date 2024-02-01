import chalk from 'chalk';

import app from './app.js';
import Config from './config.js';
import logger from './logger.js';
import initDatabase from './db/database.js';

initDatabase();

const server = app.listen(Config.PORT, () => {
  logger.info(`App running on port ${chalk.greenBright(Config.PORT)}...`);
});
