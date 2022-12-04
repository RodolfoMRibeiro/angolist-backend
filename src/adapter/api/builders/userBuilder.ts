import { UserService } from '../../../modules/login/service/UserServiceClass';
import { UserRepository } from '../../database/user/login';
import { UserController } from '../controller/user';
import { IController } from '../models/interfaces/IController';

export class Builder {
  public static NewUserController(): IController {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return userController;
  }
}
