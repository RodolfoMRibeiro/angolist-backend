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
    this._registerRoutes();
  }

  public async Login(req: Request, res: Response): Promise<Response<boolean>> {
    const userInstance = <LoginDto>req.body;
    const isValidLogin = await this._userService.Login(userInstance);

    const successResponseStatusCode = 200;
    return res.status(successResponseStatusCode).json({ access: isValidLogin });
  }

  public override async Create(req: Request, res: Response): Promise<Response> {
    try {
      const userInstance = <UserDto>req.body;
      await this._userService.Create(userInstance);
      return this.successRequest(res, 'user created successfully');
    } catch (err) {
      return this.clientError(res, <string>err);
    }
  }

  public override SetupRouter(router: IRouter): void {
    router.use(Routes.USER, this._router);
  }

  private _registerRoutes() {
    this._router.post(Routes.CREATE, this.Create);
  }
}
