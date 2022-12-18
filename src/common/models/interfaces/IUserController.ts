import { Response, Request } from 'express';
import { IController } from './IController';

export interface IUserController extends IController {
  Login(req: Request, res: Response): Promise<Response>;
  Delete(req: Request, res: Response): Promise<Response>;
}
