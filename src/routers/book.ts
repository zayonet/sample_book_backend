import { Router } from 'express';
import multer from 'multer';
import authenticate from '../middlewares/auth';
import BooksController from '../controller/BookController';
import multerConfig from '../config/multer';

const bookRoutes = Router();
const bookController = new BooksController();

bookRoutes.use(authenticate);

bookRoutes.get('/books', bookController.index);
bookRoutes.get('/users/:user_id', bookController.findUserBooks);
bookRoutes.get('/:id', bookController.show);
bookRoutes.get('/search', bookController.search);
bookRoutes.post(
  '/',
  multer(multerConfig).single('image'),
  bookController.create,
);
bookRoutes.put(
  '/:id/upload',
  multer(multerConfig).single('image'),
  bookController.uploadImage,
);
bookRoutes.put('/:id', bookController.update);
bookRoutes.patch('/:id', bookController.changeStatus);
bookRoutes.delete('/:id', bookController.destroy);

export default bookRoutes;