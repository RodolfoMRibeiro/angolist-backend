import { IRouter, Router } from 'express';
import { Builder } from '../api/builders/userBuilder';
import { IUserController } from '../../common/models/interfaces/IUserController';
import { RegistrationRoutes } from '../../common/util/constants/routes';

export class ApiRouter {
  private static _router: IRouter = Router();

  public static GetRouter(): IRouter {
    this._loadRegistrationRoutes();
    return this._router;
  }

  private static _loadRegistrationRoutes(): void {
    const controller: IUserController = Builder.NewUserController();
    const routes = RegistrationRoutes;

    this._router.post(routes.CREATE_USER, (res, resp) => {controller.Create(res, resp)});
    this._router.put(routes.UPDATE_USER, (res, resp) => {controller.Update(res, resp)});
    this._router.post(routes.LOGIN, (res, resp) => {controller.Login(res, resp)});
  }
}
