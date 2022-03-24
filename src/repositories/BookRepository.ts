import { Repository, getRepository, Like } from 'typeorm';
import IBooksRepository from './IBooksRepository';
import ICreateBookDTO from '../dtos/ICreateBookDTO';
import Book from '../models/Book';

class BooksRepository implements IBooksRepository {

  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async findAll(): Promise<Book[]> {
    return this.ormRepository.find();
  }


  public async findAllOfUser(user_id: string): Promise<Book[]> {
    return this.ormRepository.find({
      where: { user_id },
    });
  }

  public async findAllByTitle(title: string): Promise<Book[]> {
    return this.ormRepository.find({
      title: Like(`%${title}%`),
    });
  }

  public async findById(id: string): Promise<Book | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['user'],
    });
  }

  public async create({
    user_id,
    title,
    image,
    price,
    description,
    category,
    author,
    publishing_company
  }: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create({
      title,
      user_id,
      image,
      price,
      description,
      category,
      author,
      publishing_company
    });

    await this.ormRepository.save(book);
    return book;
  }

  public async save(book: Book): Promise<Book> {
    return this.ormRepository.save(book);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default BooksRepository;