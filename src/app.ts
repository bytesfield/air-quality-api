import express from 'express';
import cors from 'cors';
/* eslint-disable import/first */
import morgan from 'morgan';
import { handleErrors } from './api/middlewares/handleErrors';
import { logger } from './core/utils/logger';
import { Errors } from './core/constants/errors';
import { routes } from './api/routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

// Load routes
app.use('/', routes());

app.use(handleErrors);

// handles 404 errors
app.use((req, res, _next): void => {
  res.status(404).send({
    status: false,
    error: 'not_found',
    message: Errors.RESOURCE_NOT_FOUND,
    data: {},
    path: req.url
  });
});

// handles unexpected errors
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  logger.error('[Unhandled Error] => ', err);

  res.status(err.status || 500).send({
    status: false,
    error: 'server_error',
    message: Errors.SERVER_ERROR,
    data: {}
  });
});

export default app;
