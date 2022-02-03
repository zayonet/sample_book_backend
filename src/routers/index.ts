import { Router } from 'express';
import userRoutes from './user';
import sessionRoutes from './session';

import bookRoutes from './book';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: 'Hello ZayoCode' }),
);

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);

routes.use(`${prefixRoutes}/books`, bookRoutes);

export default routes; 
 