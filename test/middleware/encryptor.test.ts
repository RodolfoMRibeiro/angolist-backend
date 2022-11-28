import { Encryptor } from '../../src/adapter/middleware/encryptor';

describe('Encryptor', () => {
  test('encrypt password using HashPassword functions', async () => {
    const commonPassword = 'normal_password';
    const encryptedPassword = await Encryptor.HashPassword(commonPassword);

    expect(encryptedPassword).not.toStrictEqual(commonPassword);
  });
});
