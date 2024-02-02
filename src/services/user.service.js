import { hash } from 'bcrypt';

import db from '../db/database.js';
import Config from '../config.js';

const { User } = db;

async function signup(data) {
  const hashedPassword = await hashPassword(data.password);

  const user = await User.create({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
    password: hashedPassword,
  });

  user.password = undefined;
  return user;
}

async function hashPassword(password) {
  return hash(password, Config.PASSWORD_HASH_SALT_ROUNDS);
}

export { signup };
