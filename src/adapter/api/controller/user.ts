import { Request, Response } from 'express';
import { BaseController } from '../models/baseControllerClass';
import { IUserService } from '../../../modules/login/ports/service/UserService';
import { UserDto } from '../../../modules/login/ports/dto/user';

export class UserController extends BaseController {
  private _userService: IUserService;
  constructor(userService: IUserService) {
    super();
    this._userService = userService;
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const userInstance = req.body as UserDto;
      await this._userService.create(userInstance);
    } catch (e) {
      this.clientError(res);
    }
  };
}
