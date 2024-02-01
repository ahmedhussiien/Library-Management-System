import Config from '../config.js';

export default {
  username: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
  host: Config.DB_HOST,
  dialect: 'mysql',
};
