import { Request, Response } from 'express';
import { BaseController } from '../../../common/models/classes/baseControllerClass';
import { IUserService } from '../../../common/models/interfaces/IUserService';
import { UserDto } from '../../../modules/login/dto/registration/user';
import { IUserController } from '../../../common/models/interfaces/IUserController';
import { LoginDto } from '../../../modules/login/dto/registration/login';
import { RegistrationError } from '../../../common/util/errors/errors';
import { Middleware } from '../../middleware/middleware';
import { Str } from '../../../common/util/constants/constants';

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

      const accessToken = isValidLogin ? Middleware.generateAccessToken(userInstance) :
        Str.EMPTY_STRING;

      return super.successRequest(res, { access: isValidLogin, token: accessToken });
    } catch (err) {
      return super.notFound(res, { access: false, token: Str.EMPTY_STRING });
    }
  }

  public override async Create(req: Request, res: Response): Promise<Response> {
    try {
      const userInstance = <UserDto>req.body;
      await this._userService.Create(userInstance);
    
      return super.successRequest(res, { user: userInstance });
    } catch (err) {
      return super.clientError(res, RegistrationError.COULD_NOT_CREATE_USER);
    }
  }

  public override async Update(req: Request, res: Response): Promise<Response> {
    try {
      const userInstance = <UserDto>req.body;
      const updatedUser = await this._userService.Update(userInstance);

      return super.successRequest(res, { user: updatedUser })
    } catch (err) {
      return super.clientError(res, RegistrationError.COULD_NOT_UPDATE_USER);
    }
  }
}
