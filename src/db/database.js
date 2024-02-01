import createUserModel from './models/user.model.js';
import { Sequelize, DataTypes } from 'sequelize';

import logger from '../logger.js';
import Config from '../config.js';

async function initDatabase() {
  const sequelize = initSequelize();
  await checkDatabaseConnection(sequelize);

  const models = await initSequelizeModels(sequelize);

  const db = {
    sequelize,
    Sequelize,
    ...models,
  };
  return db;
}

function initSequelize() {
  const sequelize = new Sequelize(
    Config.DB_NAME,
    Config.DB_USER,
    Config.DB_PASSWORD,
    {
      host: Config.DB_HOST,
      port: Config.DB_PORT,
      dialect: 'mysql',
    },
  );

  return sequelize;
}

async function checkDatabaseConnection(sequelize) {
  try {
    await sequelize.authenticate();
    logger.log('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

async function initSequelizeModels(sequelize) {
  const modelsConstructors = [createUserModel];
  const models = {};

  modelsConstructors.forEach((modelConstructor) => {
    const model = modelConstructor(sequelize, DataTypes);
    models[model.name] = model;
  });

  return models;
}

export default initDatabase;
