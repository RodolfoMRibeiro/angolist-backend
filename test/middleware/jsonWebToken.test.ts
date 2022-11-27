import { Middleware } from '../../src/adapter/middleware/middleware';

describe('generate json web token from token_secret', () => {
  const empty_string = '';
  const mockedUsername = { email: 'teste@test.com', password: '' };

  test('middleware should successfully generate a json web token ', () => {
    expect(Middleware.generateAccessToken(mockedUsername)).not.toBe(
      empty_string,
    );
  });

  test('Middleware ', () => {
    process.env.TOKEN_SECRET = empty_string;
    expect(() => Middleware.generateAccessToken(mockedUsername)).toThrowError(
      Error,
    );
  });
});
