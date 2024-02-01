import express from 'express';
import routes from './controllers/index.js';

import BookService from '../services/book/book.service.js';

const { v1Routers, HealthController } = routes;
const { BookController } = v1Routers;

class App {
  app = express();
  API_PREFIX = '/api/v1';

  constructor(db) {
    this.db = db;
    this.initializeExpressApp();
    this.initializeV1Routes(db);
  }

  initializeExpressApp() {
    // parse json request body
    this.app.use(express.json());

    // parse urlencoded request body
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeV1Routes(db) {
    this.initializeHealthRoute();
    this.initializeV1BookRoute(db);
  }

  initializeHealthRoute() {
    const controller = new HealthController();
    this.setRouter('health', controller.router);
  }

  initializeV1BookRoute(db) {
    const service = new BookService(db);
    const controller = new BookController(service);
    this.setRouter('books', controller.getRouter());
  }

  setRouter(path, router) {
    this.app.use(`${this.API_PREFIX}/${path}`, router);
  }
}

export default App;
