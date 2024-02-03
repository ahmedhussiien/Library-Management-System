import express from 'express';
import 'express-async-errors';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import v1Routes from './routes/v1.js';
import errorController from './middlewares/error.controller.js';

import { healthRoute } from './modules/health/index.js';
import NotFoundError from './utils/exceptions/notFoundError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// disable `X-Powered-By` header that reveals information about the server
app.disable('x-powered-by');

// log requests
app.use(morgan('dev'));

// docs
app.use('/docs', express.static(__dirname + '/docs'));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json({ limit: '5kb' }));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '5kb' }));

// parse cookies
app.use(cookieParser());

// enable cors
app.use(cors());
app.options('*', cors());

// health route
app.use('/health', healthRoute);

// v1 routes
app.use('/v1', v1Routes);

// handle 404 not found error
app.use(async (req, res, next) => next(new NotFoundError('_RouteNotFound')));

// catch all errors
app.use(errorController);

export default app;
