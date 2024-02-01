import chalk from 'chalk';

import Config from './config.js';
import logger from './logger.js';
import initDatabase from './db/database.js';
import App from './api/app.js';

async function startServer() {
  const db = await initDatabase();
  const app = new App(db);

  const server = app.app.listen(Config.PORT, () => {
    logger.info(`App running on port ${chalk.greenBright(Config.PORT)}...`);
  });

  return server;
}

startServer();
