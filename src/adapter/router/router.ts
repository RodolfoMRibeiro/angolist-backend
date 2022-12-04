import { IRouter, Router } from 'express';
import { Builder } from '../api/builders/userBuilder';
import { IController } from '../api/models/interfaces/IController';

export class ApiRouter {
  private static _router: IRouter = Router();
  private static _userController: IController = Builder.NewUserController();

  public static getRouter(): IRouter {
    this._loadRouter();
    return this._router;
  }

  private static _loadRouter(): void {
    this._userController.SetupRouter(this._router);
  }
}
