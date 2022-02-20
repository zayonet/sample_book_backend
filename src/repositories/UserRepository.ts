import { Repository, getRepository, Like } from 'typeorm';
import User from '../models/User';
import IUserRepository from './IUserRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import AppError from '../errors/AppError';

class UserRepository implements IUserRepository {

  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find();
  }


  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllByName(name: string): Promise<User[]> {
    return this.ormRepository.find({
      name: Like(`%${name}%`),
    });
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {

    const checkUser = await this.ormRepository.findOne({
      where: { email },
    });

    if (checkUser?.email) {
      throw new AppError('Este email já foi utilizado! Tente outro', 422);
    }

    const user = this.ormRepository.create({
      name,
      email,
      password,
    });


    await this.ormRepository.save(user);

    return user;
  }


  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    const user = this.ormRepository.delete(id);
    if (await user) {
      throw new AppError('Utilizador excluido', 200);
    }
  }

}

export default UserRepository;