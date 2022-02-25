import { Router } from 'express';
import UserController from '../controller/UserController';
import authenticate from '../middlewares/auth';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import { ValidateUserSchemaOnRegistering, ValidateUserSchemaOnUpdating } from '../schema/validate-user-schema-on-regitering';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.index);
userRoutes.get('/search', userController.search);
userRoutes.get('/:id', authenticate, userController.show);
userRoutes.post('/', ValidateUserSchemaOnRegistering, validateRequestSchema, userController.create);
userRoutes.put('/:id', authenticate, ValidateUserSchemaOnUpdating, validateRequestSchema, userController.updates);
userRoutes.patch('/:id', authenticate, userController.enable);
userRoutes.delete('/:id', authenticate, userController.destroy);

export default userRoutes;
