import express from 'express';

import healthRoute from './routes/health.route.js';
import v1Routes from './routes/v1/index.js';

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// health route
app.use('/health', healthRoute);

// v1 routes
app.use('/v1', v1Routes);

export default app;
