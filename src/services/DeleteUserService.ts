import IUserRepository from '../repositories/IUserRepository';
import AppError from '../errors/AppError';

class DeleteUserervice {
  private userRepository: IUserRepository;

  constructor(UserRepository: IUserRepository) {
    this.userRepository = UserRepository;
  }

  public async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('Utilizador não encontrado!', 404);
    }

    await this.userRepository.delete(id);
  }
}

export default DeleteUserervice;