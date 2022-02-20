import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepository';
import EnableUserService from '../services/EnableUserService';
import DeleteUserervice from '../services/DeleteUserService';
import UpdateUserService from '../services/UpdateUserService';
import ShowUserService from '../services/ShowUserService';

interface IUser {
  password?: string;
}

class UserController {

  public async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UserRepository();

    const users = await usersRepository.findAll();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userRepository = new UserRepository();
    const userService = new ShowUserService(userRepository);

    const user = await userService.execute(id);

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRespository = new UserRepository();
    const createUser = new CreateUserService(userRespository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const deleteUserPwd: IUser = { password: user.password };
    delete deleteUserPwd.password; //Para nao retornar a senha do usuario 

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;
    const userRepository = new UserRepository();
    const updateUser = new UpdateUserService(userRepository);

    const user = await updateUser.execute({
      id,
      name,
      email,
      password
    });

    const deleteUserPwd: IUser = { password: user.password };
    delete deleteUserPwd.password; //Para nao retornar a senha do usuario 

    return response.json(user);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const userRepository = new UserRepository();

    const users = await userRepository.findAllByName(name?.toString() || '');

    return response.json(users);
  }


  public async enable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userRespository = new UserRepository();
    const enableUser = new EnableUserService(userRespository);

    const user = await enableUser.execute({
      id,
    });

    const deleteUserPwd: IUser = { password: user.password };
    delete deleteUserPwd.password;

    return response.json(user);
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const bookRepository = new UserRepository();
    const destroyBook = new DeleteUserervice(bookRepository);

    await destroyBook.execute(id);

    return response.status(204).send(); //204 - no content
  }
}

export default UserController;