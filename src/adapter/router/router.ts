import { IRouter, Router } from 'express';
import { Builder } from '../api/builders/userBuilder';
import { IUserController } from '../api/builders/userController';

export class ApiRouter {
  private static _router: IRouter = Router();
  private static _userController: IUserController = Builder.NewUserController();

  public static GetRouter(): IRouter {
    this._loadRouter();
    return this._router;
  }

  private static _loadRouter(): void {
    this._userController.SetupRouter(this._router);
  }
}
