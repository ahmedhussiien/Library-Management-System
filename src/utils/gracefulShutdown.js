import db from '../db/database.js';
import logger from '../logger.js';

const gracefulShutdown = async (server) => {
  try {
    await db.sequelize.close();
    logger.info('Closed database connection!');
    server.close();
    process.exit();
  } catch (error) {
    logger.info(error.message);
    process.exit(1);
  }
};

export { gracefulShutdown };
