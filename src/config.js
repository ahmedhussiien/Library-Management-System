import 'dotenv/config';
import logger from './logger.js';

const Config = {
  PORT: 3000,
  NODE_ENV: 'prod',
  DB_NAME: 'library',
  DB_USER: '',
  DB_PASSWORD: '',
  DB_HOST: 'localhost',
  DB_PORT: 3306,
  DB_SYNC: false,
};

function setConfigVariablesFromEnv(Config) {
  for (const key in Config) {
    if (key in process.env) {
      Config[key] = process.env[key];
    }

    if (!Config[key]) {
      logger.warn(`Environment variable "${key}" is not set!`);
    }
  }
}

setConfigVariablesFromEnv(Config);

export default Config;
