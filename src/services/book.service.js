import db from '../db/database.js';

const { Book } = db;

async function findAll() {
  return Book.findAll();
}

async function findOne(id) {
  return this.Book.findOne({ where: { id } });
}

async function createOne(data) {
  return this.Book.create(data);
}

export { findAll, findOne, createOne };
