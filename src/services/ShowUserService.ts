import AppError from '../errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import User from '../models/User';

class ShowUserService {
  private usersRepository: IUserRepository;

  constructor(usersRepository: IUserRepository) {
    this.usersRepository = usersRepository;
  }

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('Utilizador não encontrado', 404);
    }

    return user;
  }
}

export default ShowUserService;