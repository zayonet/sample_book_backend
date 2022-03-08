import { Request, Response } from 'express';
import BooksRepository from '../repositories/BookRepository';
import UserRepository from '../repositories/UserRepository';
import ListAllBooksOfUserService from '../services/ListAllBooksOfUserService';
import ShowBookService from '../services/ShowBookService';
import CreateBookService from '../services/CreateBookService';
import UploadImageOfBookService from '../services/UploadImageOfBookService';
import UpdateBookService from '../services/UpdateBookService';
import UpdateBookCategoryService from '../services/UpdateBookCategoryService';
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

  public async search(request: Request, response: Response): Promise<Response> {
    const { title } = request.query;
    const booksRepository = new BooksRepository();

    const books = await booksRepository.findAllByTitle(title?.toString() || '');

    return response.json(books);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, price, description, user_id, category, author, publishing_company } = request.body;
    const booksRepository = new BooksRepository();
    const createBook = new CreateBookService(booksRepository);

    const book = await createBook.execute({
      title,
      user_id,
      price,
      image: request.file?.filename,
      description,
      category,
      author,
      publishing_company
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
    const { title, user_id, price, description, category, author, publishing_company } = request.body;
    const { filename } = request.file;
    const booksRepository = new BooksRepository();
    const userRepository = new UserRepository();
    const updateBook = new UpdateBookService(booksRepository, userRepository);

    const book = await updateBook.execute({
      id,
      title,
      user_id,
      price,
      description,
      image: filename,
      category,
      author,
      publishing_company
    });

    return response.json(book);
  }

  public async changeCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { category } = request.body;
    const booksRepository = new BooksRepository();
    const updateBook = new UpdateBookCategoryService(booksRepository);

    const book = await updateBook.execute({
      id,
      category,
    });

    return response.json(book);
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