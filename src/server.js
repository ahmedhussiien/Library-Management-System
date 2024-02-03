import chalk from 'chalk';
import stoppable from 'stoppable';

import Config from './config.js';
import logger from './logger.js';
import app from './app.js';

import { gracefulShutdown } from './utils/gracefulShutdown.js';

const server = app.listen(Config.PORT, () => {
  logger.info(`App running on port ${chalk.greenBright(Config.PORT)}...`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', async (err) => {
  logger.error(chalk.bgRed('UNHANDLED REJECTION! 💥 Shutting down...'));
  logger.error(err.name, err.message);

  await gracefulShutdown(stoppable(server));
});

// Handle uncaught exceptions
process.on('uncaughtException', async (uncaughtExc) => {
  // Won't execute
  logger.error(chalk.bgRed('UNCAUGHT EXCEPTION! 💥 Shutting down...'));
  logger.error(`UncaughtException Error: ${uncaughtExc}`);
  logger.error(`UncaughtException Stack: ${JSON.stringify(uncaughtExc.stack)}`);

  await gracefulShutdown(stoppable(server));
});

// Graceful shutdown on SIGINT and SIGTERM signals
['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    logger.warn(`Received ${signal} signal. Shutting down...`);
    await gracefulShutdown(server);
  });
});

export default server;
