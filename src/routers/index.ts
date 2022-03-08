import express, { Router, Request, Response, NextFunction, request } from 'express';
import userRoutes from './user';
import sessionRoutes from './session';

import bookRoutes from './book';
import { generateToken } from '../services/generateToken';
import { resolve } from 'path';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: 'Hello ZayoCode' }),
);

routes.get("/terms", (request, response) => response.json({ message: 'My terms' }));

routes.get("/generate", (request, response) => response.json(generateToken()))

routes.use('/files', express.static(resolve(__dirname, '..', '..', 'uploads')))

routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/session`, sessionRoutes);

routes.use(`${prefixRoutes}/book`, bookRoutes);

export default routes;