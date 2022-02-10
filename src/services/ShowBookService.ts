import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';

class ShowBookService {
  private booksRepository: IBooksRepository;

  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute(id: string): Promise<Book | undefined> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }

    return book;
  }
}

export default ShowBookService;