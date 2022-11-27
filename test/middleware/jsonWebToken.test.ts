import { Jwt } from '../../src/adapter/middleware/jsonWebToken';

describe('generate json web token from secret_token', () => {
  const empty_string = '';
  const mockedUsername = 'mathias';

  test('json web token successfully generated', () => {
    expect(Jwt.generateAccessToken(mockedUsername)).not.toBe(empty_string);
  });
});
