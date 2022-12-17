import { Router, IRouter, Request, Response } from 'express';
import { BaseController } from '../../../common/models/classes/baseControllerClass';
import { IUserService } from '../../../modules/login/service/UserServiceInterface';
import { UserDto } from '../../../modules/login/dto/user';
import { Routes } from '../../../common/util/constants/constants';
import { IUserController } from '../builders/userController';
import { LoginDto } from '../../../modules/login/dto/login';

export class UserController extends BaseController implements IUserController {
  private _router: IRouter;
  private _userService: IUserService;

  constructor(userService: IUserService) {
    super();
    this._router = Router();
    this._userService = userService;
  }

  public async Login(req: Request, res: Response): Promise<Response<boolean>> {
    try {
      const userInstance = <LoginDto>req.body;
      const isValidLogin = await this._userService.Login(userInstance);

      const successResponseStatusCode = 200;
      return res
        .status(successResponseStatusCode)
        .json({ access: isValidLogin });
    } catch (err) {
      return super.notFound(res, <string>err);
    }
  }

  public override async Create(req: Request, res: Response): Promise<Response> {
    try {
      const userInstance = <UserDto>req.body;
      await this._userService.Create(userInstance);
      return super.successRequest(res, 'user created successfully');
    } catch (err) {
      console.log('entrou aqui');
      return super.clientError(res, <string>err);
    }
  }

  public override async Update(req: Request, res: Response): Promise<Response> {
    try {
      const userInstance = <UserDto>req.body;
      const updatedUser = await this._userService.Update(userInstance);

      const successResponseStatusCode = 200;
      return res
        .status(successResponseStatusCode)
        .json({ updatedUser: updatedUser });
    } catch (err) {
      throw new Error(<string>err);
    }
  }

}
