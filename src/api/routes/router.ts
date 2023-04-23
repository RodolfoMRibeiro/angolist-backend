import { Router } from 'express';

class ApplicationRouter {
  protected router!: Router;

  constructor() {
    this.router = Router();
  }

  private _configureUserRoutes() {}
}

export default new ApplicationRouter();
