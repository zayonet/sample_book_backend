import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';

class ListallBooksService {
  private booksRepository: IBooksRepository;

  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute(): Promise<Book[]> {
    const books = await this.booksRepository.findAll();

    return books;
  }
}

export default ListallBooksService;