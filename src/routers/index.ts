import { Router } from 'express';
import userRoutes from './user';
import sessionRoutes from './session';

import bookRoutes from './book';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) =>
  response.json({ message: 'Hello ZayoCode' }),
);

routes.use(`${prefixRoutes}/user`, userRoutes);
routes.use(`${prefixRoutes}/session`, sessionRoutes);

routes.use(`${prefixRoutes}/book`, bookRoutes);

export default routes; 
 