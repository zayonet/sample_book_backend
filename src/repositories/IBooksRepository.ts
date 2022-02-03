import ICreateBookDTO from '../dtos/ICreateBookDTO';
import Book from '../models/Book';

export default interface IBooksRepository {
  findAll(): Promise<Book[]>;
  findAllOfUser(user_id: number): Promise<Book[]>;
  findById(id: number): Promise<Book | undefined>;
  finAllByTitle(title: string): Promise<Book[]>;
  create(createBook: ICreateBookDTO): Promise<Book>;
  save(book: Book): Promise<Book>;
  delete(id: number): Promise<void>;
}