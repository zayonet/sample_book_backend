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

bookRoutes.get('/', bookController.index);
bookRoutes.get('/user/:user_id', bookController.findUserBooks);
bookRoutes.get('/search', bookController.search);
bookRoutes.get('/:id', bookController.show);
bookRoutes.post('/', multer(multerConfig).single('image'), validateBookSchemaFields, validateRequestSchema, ValidateImageBookSchema, bookController.create);
bookRoutes.put('/:id', multer(multerConfig).single('image'), validateBookSchemaFields, validateRequestSchema, ValidateImageBookSchema, bookController.update);
bookRoutes.patch('/:id', bookController.changeCategory);
bookRoutes.patch('/:id/upload', multer(multerConfig).single('image'), ValidateImageBookSchema, validateRequestSchema, bookController.uploadImage);
bookRoutes.delete('/:id', bookController.destroy);

export default bookRoutes;