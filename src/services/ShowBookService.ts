import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';

class ShowBookService {
  private booksRepository: IBooksRepository;

  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute(id: string): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found', 400);
    }

    return book;
  }
}

export default ShowBookService;