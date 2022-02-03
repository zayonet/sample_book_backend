import AppError from '../errors/AppError';
import IBooksRepository from '../repositories/IBooksRepository';
import Book from '../models/Book';

interface IRequest {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
}

class UpdateBookService {
    private booksRepository: IBooksRepository;

    constructor(booksRepository: IBooksRepository) {
        this.booksRepository = booksRepository;
    }

    public async execute({
        id,
        title,
        price,
        description,
        image,
    }: IRequest): Promise<Book> {
        const book = await this.booksRepository.findById(id);

        if (!book) {
            throw new AppError('Book not found', 400);
        }
        
        book.title = title;
        book.price = price;
        book.description = description;
        book.image = image;

        await this.booksRepository.save(book);

        return book;
    }
}

export default UpdateBookService;