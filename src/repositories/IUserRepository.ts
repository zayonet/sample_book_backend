import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  searcUserByName(name: string): Promise<User[]>;
  create(createUserDTO: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}