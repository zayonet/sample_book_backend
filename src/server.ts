import 'reflect-metadata'
import express, { Request, Response, NextFunction, request } from 'express';
import 'express-async-errors'; //handle async errors on express
import cors from 'cors';
import { resolve } from 'path';

import './database';
import routes from './routers'
import AppError from './errors/AppError';

import './config/env';

import swagguerUi from 'swagger-ui-express';
import swaggerJson from './swagger/swagger.json'
import { generateToken } from './services/generateToken';
import logger from './logs';

const app = express();
app.use(cors());

app.use("/api-documentation", swagguerUi.serve, swagguerUi.setup(swaggerJson))
app.use(express.json());
app.use(routes);

app.use('/files', express.static(resolve(__dirname, '..', 'uploads')))


app.get("/terms", (request, response) => response.json({ message: 'My terms' }));
app.use((error: Error, _request: Request, response: Response, _: NextFunction) => {

  logger.error(error.message);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });

})

app.get("/generate", (request, response) => response.json(generateToken()))

app.listen(3333, () => logger.info("Server is running on port 3333"));
