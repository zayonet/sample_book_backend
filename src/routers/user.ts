import { Router } from 'express';
import UserController from '../controller/UserController';
import authenticate from '../middlewares/auth';

const userRoutes = Router();
const userController = new UserController();


userRoutes.post('/', userController.create);
userRoutes.patch('/:id', userRoutes.use(authenticate), userController.enable);

export default userRoutes; 