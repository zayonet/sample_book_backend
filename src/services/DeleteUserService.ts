import IUserRepository from '../repositories/IUserRepository';
import AppError from '../errors/AppError';
import BooksRepository from '../repositories/BookRepository';
import ListAllBooksOfUserService from './ListAllBooksOfUserService';
import DeleteBookService from './DeleteBookService';

class DeleteUserervice {
  private userRepository: IUserRepository;

  constructor(UserRepository: IUserRepository) {
    this.userRepository = UserRepository;
  }

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    const bookRepository = new BooksRepository();
    const booksService = new ListAllBooksOfUserService(bookRepository);
    const destroyBook = new DeleteBookService(bookRepository);

    const books = await booksService.execute(id);
    books.map(book => {
      destroyBook.execute(book.id);
    })

    if (!user) {
      throw new AppError('Utilizador não encontrado!', 404);
    }

    await this.userRepository.delete(id);
  }
}

export default DeleteUserervice;