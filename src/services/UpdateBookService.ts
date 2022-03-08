import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  id: string;
  title: string;
  user_id: string;
  price: string;
  description: string;
  image: string;
  category: string;
  author: string;
  publishing_company: string;
}

class UpdateBookService {
  private booksRepository: IBooksRepository;
  private userRepository: IUserRepository;

  constructor(booksRepository: IBooksRepository, userRepository: IUserRepository) {
    this.booksRepository = booksRepository;
    this.userRepository = userRepository;
  }

  public async execute({
    id,
    title,
    user_id,
    price,
    description,
    image,
    category,
    author,
    publishing_company
  }: IRequest): Promise<Book> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Livro não encontrado', 404);
    }

    const verifyUser = await this.userRepository.findById(user_id);

    if (!verifyUser) {
      throw new AppError('Id do utilizador não encontrado', 404);
    }

    book.title = title;
    book.user_id = verifyUser.id;
    book.price = price;
    book.description = description;
    book.image = image;
    book.category = category;
    book.author = author;
    book.publishing_company = publishing_company;

    await this.booksRepository.save(book);

    return book;
  }
}

export default UpdateBookService;