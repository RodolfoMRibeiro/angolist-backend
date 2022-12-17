import { UserService } from '../../../modules/login/service/UserService';
import { UserRepository } from '../../database/registration/userRepository';
import { UserController } from '../controller/user';
import { IUserController } from '../../../common/models/interfaces/IUserController';

export class Builder {
  public static NewUserController(): IUserController {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return userController;
  }
}
