import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';
import BookStatus from '../enums/BookStatus';

interface IRequest {
    title: string;
    image?: string;
    description: string;
    user_id: string;
    price: string

}

class CreateBookService {
  private booksRepository: IBooksRepository;


  constructor( booksRepository: IBooksRepository ) {
    this.booksRepository = booksRepository;
  }

  public async execute({
    title,
    user_id,
    image,
    price,
    description
  }: IRequest): Promise<Book> {

    const book = await this.booksRepository.create({
        title,
        user_id,
        image,
        price,
        description,
        status: BookStatus.NEW,
    });

    return book;
  }
}

export default CreateBookService;