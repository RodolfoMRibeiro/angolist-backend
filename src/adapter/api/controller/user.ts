import { Request, Response } from 'express';
import { BaseController } from '../../../common/models/classes/baseControllerClass';
import { IUserService } from '../../../modules/login/service/UserServiceInterface';
import { UserDto } from '../../../modules/login/dto/user';
import { IUserController } from '../builders/userController';
import { LoginDto } from '../../../modules/login/dto/login';
import { RegistrationError } from '../../../common/util/errors/errors';

export class UserController extends BaseController implements IUserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    super();
    this._userService = userService;
  }

  public async Login(req: Request, res: Response): Promise<Response<boolean>> {
    try {
      const userInstance = <LoginDto>req.body;
      const isValidLogin = await this._userService.Login(userInstance);

      return super.successRequest(res, { access: isValidLogin });
    } catch (err) {
      console.log(err);
      return super.notFound(res, RegistrationError.COULD_NOT_FIND_USER);
    }
  }

  public override async Create(req: Request, res: Response): Promise<Response> {
    try {
      const userInstance = <UserDto>req.body;
      await this._userService.Create(userInstance);
    
      return super.successRequest(res, 'user created successfully');
    } catch (err) {
      console.log(err);
      return super.clientError(res, RegistrationError.COULD_NOT_CREATE_USER);
    }
  }

  public override async Update(req: Request, res: Response): Promise<Response> {
    try {
      const userInstance = <UserDto>req.body;
      const updatedUser = await this._userService.Update(userInstance);

      return super.successRequest(res, { updatedUser: updatedUser })
    } catch (err) {
      console.log(err);
      return super.clientError(res, RegistrationError.COULD_NOT_UPDATE_USER);
    }
  }

}
