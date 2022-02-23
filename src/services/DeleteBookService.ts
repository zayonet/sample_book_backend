import IBooksRepository from '../repositories/IBooksRepository';
import AppError from '../errors/AppError';

class DeleteBookService {
  private bookRepository: IBooksRepository;

  constructor(BookRepository: IBooksRepository) {
    this.bookRepository = BookRepository;
  }

  public async execute(id: string): Promise<void> {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new AppError('Livro não encontrado!', 404);
    }

    await this.bookRepository.delete(id);
  }
}

export default DeleteBookService;