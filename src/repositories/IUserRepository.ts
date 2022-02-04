import User from '../models/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  create(createUserDTO: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}