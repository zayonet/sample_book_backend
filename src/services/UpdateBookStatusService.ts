import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';
import BookStatus from '../enums/BookStatus';

interface IRequest {
  id: string;
  status: BookStatus;
}

class UpdateBookStatusService {
  private booksRepository: IBooksRepository;

  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute({ id, status }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found', 400);
    }

    book.status = status;

    await this.booksRepository.save(book);

    return book;
  }
}

export default UpdateBookStatusService;