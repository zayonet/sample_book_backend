import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import UserRepository from '../repositories/UserRepository';
import EnableUserService from '../services/EnableUserService';

interface IUser {
  password?: string;
}

class UserController {
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
}

export default UserController;