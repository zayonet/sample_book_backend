import 'reflect-metadata'
import express, { Request, Response, NextFunction, request } from 'express';
import 'express-async-errors'; //handle async errors on express
import cors from 'cors';

import './database';
import routes from './routers'
import AppError from './errors/AppError';
import logger from './logs';

import './config/env';

import swagguerUi from 'swagger-ui-express';
import swaggerJson from './swagger/swagger.json'

const app = express();
app.use(cors());

app.use("/api-documentation", swagguerUi.serve, swagguerUi.setup(swaggerJson))
app.use(express.json());
app.use(routes);

app.use((error: Error, _request: Request, response: Response, _: NextFunction) => {

  logger.error(error.message);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });

})


app.listen(3333, () => logger.info("Server is running on port 3333"));
