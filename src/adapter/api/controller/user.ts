import { Router, IRouter, Request, Response } from 'express';
import { BaseController } from '../models/classes/baseControllerClass';
import { IUserService } from '../../../modules/login/service/UserServiceInterface';
import { UserDto } from '../../../modules/login/dto/user';
import { Routes } from '../../../common/util/constants/constants';

export class UserController extends BaseController {
  private _router: IRouter;
  private _userService: IUserService;

  constructor(userService: IUserService) {
    super();
    this._router = Router();
    this._userService = userService;
    this._registerRoutes();
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

  public override SetupRouter(router: IRouter): void {
    router.use(Routes.USER, this._router);
  }

  private _registerRoutes() {
    this._router.post(Routes.CREATE, this.create);
  }
}
