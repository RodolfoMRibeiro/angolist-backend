import { IRouter, Router } from 'express';
import { Builder } from '../api/builders/userBuilder';
import { IUserController } from '../../common/models/interfaces/IUserController';

export class ApiRouter {
  private static _router: IRouter = Router();

  public static GetRouter(): IRouter {
    this._loadRegistrationRoutes();
    return this._router;
  }

  private static _loadRegistrationRoutes(): void {
    const controller: IUserController = Builder.NewUserController();

    this._router.post('/registration/create', (res, resp) => {controller.Create(res, resp)});
    this._router.post('/registration/login', (res, resp) => {controller.Login(res, resp)});
    this._router.put('registration/update', (res, resp) => {controller.Update(res, resp)});
  }
}
