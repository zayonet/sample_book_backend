import ICreateBookDTO from '../dtos/ICreateBookDTO';
import Book from '../models/Book';

export default interface IBooksRepository {
  findAll(): Promise<Book[]>;
  findAllOfUser(user_id: string): Promise<Book[]>;
  findById(id: string): Promise<Book | undefined>;
  findAllByTitle(title: string): Promise<Book[]>;
  create(createBook: ICreateBookDTO): Promise<Book>;
  save(book: Book): Promise<Book>;
  delete(id: string): Promise<void>;
}