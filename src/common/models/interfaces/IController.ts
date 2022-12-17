import { Request, Response } from 'express';
export interface IController {
  Create(request: Request, response: Response): Promise<Response>;
  Update(req: Request, res: Response): Promise<Response>;
}
