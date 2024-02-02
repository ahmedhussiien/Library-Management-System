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

  ACCESS_TOKEN_SECRET: '',
  ACCESS_TOKEN_EXPIRES_IN_MINUTES: 10,
  ACCESS_TOKEN_COOKIE_NAME: 'AX_TKN',

  PASSWORD_HASH_SALT_ROUNDS: 6,
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
