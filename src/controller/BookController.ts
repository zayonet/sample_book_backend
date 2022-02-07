import { Request, Response } from 'express';
import BooksRepository from '../repositories/BookRepository';
import ListAllBooksOfUserService  from '../services/ListAllBooksOfUserService';
import ShowBookService from '../services/ShowBookService'; 
import CreateBookService from '../services/CreateBookService';
import UploadImageOfBookService from '../services/UploadImageOfBookService';
import UpdateBookService from '../services/UpdateBookService';
import UpdateBookStatusService from '../services/UpdateBookStatusService';
import DeleteBookService from '../services/DeleteBookService';


class BooksController {
    public async index(request: Request, response: Response): Promise<Response> {
        const booksRepository = new BooksRepository();
    
        const books = await booksRepository.findAll();
    
        return response.json(books);
      }
    public async findUserBooks(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.params;
        const booksRepository = new BooksRepository();
        const booksService = new ListAllBooksOfUserService(
        booksRepository,
        );

        const books = await booksService.execute(user_id);

        return response.json(books);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const booksRepository = new BooksRepository();
        const booksService = new ShowBookService(booksRepository);

        const book = await booksService.execute(id);

        return response.json(book);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { title, price, description, user_id } = request.body;
        const booksRepository = new BooksRepository();
        const createBook = new CreateBookService(booksRepository);

        const book = await createBook.execute({
            title,
            user_id,
            price,
            image: request.file?.filename,
            description
        });

        return response.status(201).json(book);
    }

    public async uploadImage(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { filename } = request.file;
        const booksRepository = new BooksRepository();
        const service = new UploadImageOfBookService(booksRepository);

        const book = await service.execute({
        id,
        image: filename,
        });

        return response.json(book);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { title, price, description, image } = request.body;
        const booksRepository = new BooksRepository();
        const updateBook = new UpdateBookService(booksRepository);

        const book = await updateBook.execute({
        id,
        title,
        price,
        description,
        image,
        });

        return response.json(book);
    }

    public async changeStatus(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { status } = request.body;
        const booksRepository = new BooksRepository();
        const updateBook = new UpdateBookStatusService(booksRepository);

        const book = await updateBook.execute({
        id,
        status,
        });

        return response.json(book);
    }

    public async search(request: Request, response: Response): Promise<Response> {
        const { title } = request.query;
        const booksRepository = new BooksRepository();
    
        const books = await booksRepository.finAllByTitle(title?.toString() || '');
    
        return response.json(books);
    }    

    public async destroy(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const bookRepository = new BooksRepository();
        const destroyBook = new DeleteBookService(bookRepository);

        await destroyBook.execute(id);

        return response.status(204).send(); //204 - no content
    }
}

export default BooksController;