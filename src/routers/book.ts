import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import authenticate from '../middlewares/auth';
import BooksController from '../controller/BookController';
import multerConfig from '../config/multer';
import { validateRequestSchema } from '../middlewares/validate-request-schema';
import { validateBookSchemaFields } from '../schema/validate-book-schema';
import { ValidateImageBookSchema } from '../schema/validate-image-schema-book';

const bookRoutes = Router();
const bookController = new BooksController();

bookRoutes.use(authenticate);

const app = express();

bookRoutes.get('/get', bookController.index);
bookRoutes.get('/users/:user_id', bookController.findUserBooks);
bookRoutes.get('/search', bookController.search);
bookRoutes.get('/:id', bookController.show);
bookRoutes.post('/', multer(multerConfig).single('image'), validateBookSchemaFields, validateRequestSchema, ValidateImageBookSchema, bookController.create);
bookRoutes.put( '/:id/upload', multer(multerConfig).single('image'), ValidateImageBookSchema, validateRequestSchema, bookController.uploadImage);
bookRoutes.put('/:id', validateBookSchemaFields, validateRequestSchema, bookController.update);
bookRoutes.patch('/:id', bookController.changeStatus);
bookRoutes.delete('/:id', bookController.destroy);

export default bookRoutes;