import AppError from '../errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import User from '../models/User';
import { hash } from 'bcryptjs';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({
    id,
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(id);
    const passwordHash = await hash(password, 8);

    if (!user) {
      throw new AppError('Não foi encontrado este utilizador no sistema', 404);
    }

    if (email !== user.email) {
      const verifyEmail = this.userRepository.findByEmail(email);

      if (await verifyEmail) {
        throw new AppError('Este email já foi utilizado! Tente outro', 422);
      }
    }

    user.name = name;
    user.email = email;
    user.password = passwordHash;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserService;