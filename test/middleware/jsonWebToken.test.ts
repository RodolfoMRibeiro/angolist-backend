import { Middleware } from '../../src/adapter/middleware/middleware';

describe('generate json web token from token_secret', () => {
  const mockedUsername = { email: 'teste@test.com', password: '' };

  test('Middleware fail to generate access token', () => {
    expect(() => Middleware.generateAccessToken(mockedUsername)).toThrowError(
      Error,
    );
  });
});
