import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';

interface IRequest {
  id: number;
  image: string;
}

class UploadImageOfBookService {
  private booksRepository: IBooksRepository;

  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute({ id, image }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found', 400);
    }

    book.image = image;

    await this.booksRepository.save(book);

    return book;
  }
}

export default UploadImageOfBookService;