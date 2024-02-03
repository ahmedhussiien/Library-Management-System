import { faker } from '@faker-js/faker';

import * as bookAuthorService from './modules/bookAuthor/bookAuthor.service.js';
import * as bookService from './modules/book/book.service.js';
import * as bookLoanService from './modules/bookLoan/bookLoan.service.js';
import * as userService from './modules/user/user.service.js';

/** CONSTANTS */
const NUM_AUTHORS = 100;
const NUM_BOOKS = 2000;
const NUM_USERS = 200;
const NUM_LOANS = 100;

const STAFF_USER_EMAIL = 'staff@test.com';
const BORROWER_USER_EMAIL = 'borrower@test.com';
const USER_PASSWORD = '12345678';

/** Fake Data Generators */
function generateAuthorData() {
  return { name: faker.person.fullName() };
}

function generateBookData() {
  return {
    authorId: faker.number.int({ min: 1, max: NUM_AUTHORS }),
    title: faker.lorem.sentence(),
    ISBN: faker.commerce.isbn({ separator: '' }),
    availableQuantity: 1000,
    shelfNumber: faker.number.int({ min: 0, max: 30 }),
  };
}

function generateUserData() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}

function generateBorrowerData() {
  return {
    contactNumber: faker.string.numeric(11),
  };
}

function generateLoanData() {
  return {
    bookId: faker.number.int({ min: 1, max: NUM_BOOKS }),
    borrowerId: faker.number.int({ min: 1, max: NUM_USERS }),
    dueDate: faker.date.between({
      from: '2022-01-01T00:00:00.000Z',
      to: '2025-01-01T00:00:00.000Z',
    }),
  };
}

async function seedDataBase() {
  // add authors
  let authorData;
  for (var i = 0; i < NUM_AUTHORS; i++) {
    authorData = generateAuthorData();
    await bookAuthorService.createOne(authorData);
  }

  // add books
  let bookData;
  for (var i = 0; i < NUM_BOOKS; i++) {
    bookData = generateBookData();
    await bookService.createOne(bookData);
  }

  // add borrower user
  let userData;
  let borrowerData;
  userData = {
    email: BORROWER_USER_EMAIL,
    password: USER_PASSWORD,
    firstName: 'Borrower',
    lastName: 'Test',
  };

  borrowerData = generateBorrowerData();
  await userService.signup({ user: userData, borrower: borrowerData });

  // add users
  for (var i = 1; i < NUM_USERS; i++) {
    userData = generateUserData();
    borrowerData = generateBorrowerData();
    await userService.signup({ user: userData, borrower: borrowerData });
  }

  // add loans
  let loanData;
  for (var i = 0; i < NUM_LOANS; i++) {
    loanData = generateLoanData();
    await bookLoanService.createOne(loanData, loanData.borrowerId);
  }

  // add staff user
  await userService.createStaffUser({
    email: STAFF_USER_EMAIL,
    password: USER_PASSWORD,
    firstName: 'staff',
    lastName: 'test',
  });
}

seedDataBase().then(() => console.log('Seeding database finished!'));
