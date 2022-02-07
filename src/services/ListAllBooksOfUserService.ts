import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';

class ListAllBooksOfUserService {
  private booksRepository: IBooksRepository;

  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute(user_id: string): Promise<Book[]> {
    const books = await this.booksRepository.findAllOfUser(user_id);

    return books;
  }
}

export default ListAllBooksOfUserService;