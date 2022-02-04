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


    public async findAllOfUser(user_id: number): Promise<Book[]> {
        return this.ormRepository.find({
            where: { user_id },
        });
    }

    public async findById(id: number): Promise<Book | undefined> {
        return this.ormRepository.findOne(id);
    }

    public async create({
        user_id,
        title,
        image,
        price,
        description,
        status,
    }: ICreateBookDTO): Promise<Book> {
        const book = this.ormRepository.create({
            title,
            user_id,
            image,
            price,
            description,
            status,
        });

        await this.ormRepository.save(book);
        return book;
    }

    public async save(book: Book): Promise<Book> {
        return this.ormRepository.save(book);
    }

    public async finAllByTitle(title: string): Promise<Book[]> {
        return this.ormRepository.find({
          title: Like(`%${title}%`),
        });
    }

    public async delete(id: number): Promise<void> {
      this.ormRepository.delete(id);
    }
}

export default BooksRepository;