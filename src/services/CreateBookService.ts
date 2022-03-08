import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';
import BookCategory from '../enums/BookCategory';

interface IRequest {
  title: string;
  image?: string;
  description: string;
  user_id: string;
  price: string;
  author: string;
  publishing_company: string;
  category: string;

}

class CreateBookService {
  private booksRepository: IBooksRepository;


  constructor(booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository;
  }

  public async execute({
    title,
    user_id,
    image,
    price,
    description,
    category,
    author,
    publishing_company
  }: IRequest): Promise<Book> {

    const book = await this.booksRepository.create({
      title,
      user_id,
      image,
      price,
      description,
      category,
      author,
      publishing_company
    });

    return book;
  }
}

export default CreateBookService;