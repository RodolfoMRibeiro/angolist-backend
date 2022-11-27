import { WebToken } from '../../src/adapter/middleware/jsonWebToken';

describe('generate json web token from secret_token', () => {
  const empty_string = '';
  const mockedUsername = { email: 'teste@test.com', password: '' };

  test('json web token successfully generated', () => {
    expect(WebToken.generateAccessToken(mockedUsername)).not.toBe(empty_string);
  });

  test('json web token failed to generate access token because of secret token', () => {
    process.env.TOKEN_SECRET = empty_string;
    expect(WebToken.generateAccessToken(mockedUsername)).toStrictEqual(
      empty_string,
    );
  });
});
