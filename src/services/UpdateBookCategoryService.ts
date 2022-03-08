import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';
import BookCategory from '../enums/BookCategory';

interface IRequest {
  id: string;
  category: string;
}

class UpdateBookCategoryService {
  private booksRepository: IBooksRepository;

  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute({ id, category }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }

    book.category = category;

    await this.booksRepository.save(book);

    return book;
  }
}

export default UpdateBookCategoryService;