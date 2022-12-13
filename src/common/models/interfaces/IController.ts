import { IRouter, Request, Response } from 'express';
export interface IController {
  Create(request: Request, response: Response): Promise<Response>;
  SetupRouter(router: IRouter): void;
}
