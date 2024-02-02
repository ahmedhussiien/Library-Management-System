import express from 'express';
import 'express-async-errors';

import healthRoute from './routes/health.route.js';
import v1Routes from './routes/v1/index.js';
import errorController from './middlewares/error.controller.js';

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// health route
app.use('/health', healthRoute);

// v1 routes
app.use('/v1', v1Routes);

// catch all errors
app.use(errorController);

export default app;
