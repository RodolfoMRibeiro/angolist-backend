import * as express from 'express';
import { Str } from '../../../common/util/constants/constants';

export abstract class BaseController {
  public static jsonResponse = (
    response: express.Response,
    code: number,
    message: string,
  ): express.Response => {
    return response.status(code).json({ message });
  };

  protected abstract create(
    req: express.Request,
    res: express.Response,
  ): Promise<any>;

  protected successRequest = (
    response: express.Response,
    message?: string,
  ): express.Response => {
    const successResponseStatusCode = 200;

    return BaseController.jsonResponse(
      response,
      successResponseStatusCode,
      message ? message : Str.EMPTY_STRING,
    );
  };

  protected clientError = (
    response: express.Response,
    message?: string,
  ): express.Response => {
    const clientErrorResponseStatusCode = 400;

    return BaseController.jsonResponse(
      response,
      clientErrorResponseStatusCode,
      message ? message : 'Unauthorized',
    );
  };

  protected unauthorized = (
    response: express.Response,
    message?: string,
  ): express.Response => {
    const unauthorizedResponseStatusCode = 401;

    return BaseController.jsonResponse(
      response,
      unauthorizedResponseStatusCode,
      message ? message : 'Unauthorized',
    );
  };

  protected forbidden = (
    response: express.Response,
    message?: string,
  ): express.Response => {
    const forbiddenResponseStatusCode = 403;

    return BaseController.jsonResponse(
      response,
      forbiddenResponseStatusCode,
      message ? message : 'Forbidden',
    );
  };

  protected notFound = (
    response: express.Response,
    message?: string,
  ): express.Response => {
    const notFoundResponseStatusCode = 404;

    return BaseController.jsonResponse(
      response,
      notFoundResponseStatusCode,
      message ? message : 'Not found',
    );
  };
}