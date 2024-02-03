import express from 'express';
import 'express-async-errors';

import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import v1Routes from './routes/v1.js';
import errorController from './middlewares/error.controller.js';

import { healthRoute } from './modules/health/index.js';

const app = express();

// disable `X-Powered-By` header that reveals information about the server
app.disable('x-powered-by');

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser());

// enable cors
app.use(cors());
app.options('*', cors());

// log requests
app.use(morgan('dev'));

// health route
app.use('/health', healthRoute);

// v1 routes
app.use('/v1', v1Routes);

// catch all errors
app.use(errorController);

export default app;
