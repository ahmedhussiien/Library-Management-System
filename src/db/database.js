import { Sequelize, DataTypes } from 'sequelize';

import logger from '../logger.js';
import Config from '../config.js';

import createUserModel from './models/user.model.js';
import createBookModel from './models/book.model.js';
import createBookLoanModel from './models/bookLoan.model.js';
import createBookAuthorModel from './models/bookAuthor.model.js';

async function initDatabase() {
  const sequelize = initSequelize();
  await checkDatabaseConnection(sequelize);

  const models = await initSequelizeModels(sequelize);

  if (Config.DB_SYNC) {
    await sequelize.sync();
  }

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
  const modelsConstructors = [
    createUserModel,
    createBookAuthorModel,
    createBookModel,
    createBookLoanModel,
  ];

  const models = {};

  // create models
  modelsConstructors.forEach((modelConstructor) => {
    const model = modelConstructor(sequelize, DataTypes);
    models[model.name] = model;
  });

  // set associations
  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  return models;
}

const db = await initDatabase();
export default db;
