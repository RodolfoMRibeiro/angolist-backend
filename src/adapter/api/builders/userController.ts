import { Response, Request } from 'express';
import { IController } from '../../../common/models/interfaces/IController';

export interface IUserController extends IController {
  Login(req: Request, res: Response): Promise<Response>;
}
