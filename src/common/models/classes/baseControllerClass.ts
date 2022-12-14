import * as express from 'express';
import { Str } from '../../util/constants/constants';
import { IController } from '../interfaces/IController';

export abstract class BaseController implements IController {
  public abstract Create(
    request: express.Request,
    response: express.Response,
  ): Promise<express.Response>;

  public abstract Update(
    request: express.Request,
    response: express.Response,
  ): Promise<express.Response>;

  public static jsonResponse(
    response: express.Response,
    code: number,
    message: any,
  ): express.Response {
    return response.status(code).json({ message });
  }

  protected successRequest(
    response: express.Response,
    message?: any,
  ): express.Response {
    const successResponseStatusCode = 200;

    return BaseController.jsonResponse(
      response,
      successResponseStatusCode,
      message ? message : Str.EMPTY_STRING,
    );
  }

  protected clientError(
    response: express.Response,
    message?: any,
  ): express.Response {
    const clientErrorResponseStatusCode = 400;

    return BaseController.jsonResponse(
      response,
      clientErrorResponseStatusCode,
      message ? message : 'Unauthorized',
    );
  }

  protected unauthorized(
    response: express.Response,
    message?: any,
  ): express.Response {
    const unauthorizedResponseStatusCode = 401;

    return BaseController.jsonResponse(
      response,
      unauthorizedResponseStatusCode,
      message ? message : 'Unauthorized',
    );
  }

  protected forbidden(
    response: express.Response,
    message?: any,
  ): express.Response {
    const forbiddenResponseStatusCode = 403;

    return BaseController.jsonResponse(
      response,
      forbiddenResponseStatusCode,
      message ? message : 'Forbidden',
    );
  }

  protected notFound(
    response: express.Response,
    message?: any,
  ): express.Response {
    const notFoundResponseStatusCode = 404;

    return BaseController.jsonResponse(
      response,
      notFoundResponseStatusCode,
      message ? message : 'Not found',
    );
  }
}
