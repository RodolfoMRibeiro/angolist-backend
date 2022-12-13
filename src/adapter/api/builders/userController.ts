import { Response, Request } from 'express';

export interface IUserController {
  Create(req: Request, res: Response): Promise<Response>;
  Login(req: Request, res: Response): Promise<Response>;
}
