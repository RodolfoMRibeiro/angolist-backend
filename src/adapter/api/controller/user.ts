import { Request, Response } from 'express';
import { BaseController } from '../models/baseControllerClass';
import { IUserService } from '../../../modules/login/service/UserServiceInterface';
import { UserDto } from '../../../modules/login/dto/user';

export class UserController extends BaseController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    super();
    this._userService = userService;
  }

  public override create = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const userInstance = <UserDto>req.body;
      await this._userService.create(userInstance);
      return this.successRequest(res, 'user created successfully');
    } catch (e) {
      return this.clientError(res, 'COULD NOT CREATE USER');
    }
  };
}
