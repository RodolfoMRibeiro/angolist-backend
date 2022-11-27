import { WebToken } from '../../src/adapter/middleware/jsonWebToken';

describe('generate json web token from secret_token', () => {
  const empty_string = '';
  const mockedUsername = 'mathias';

  test('json web token successfully generated', () => {
    expect(WebToken.generateAccessToken(mockedUsername)).not.toBe(empty_string);
  });
});
