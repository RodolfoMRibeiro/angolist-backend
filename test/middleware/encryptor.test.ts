import { Encryptor } from '../../src/adapter/middleware/encryptor';

describe('Encryptor --> HashPassword', () => {
  test('encrypt password using HashPassword functions', async () => {
    const commonPassword = 'normal_password';
    const encryptedPassword = await Encryptor.HashPassword(commonPassword);

    expect(encryptedPassword).not.toStrictEqual(commonPassword);
  });
});

describe('Encryptor --> IsSamePassword', () => {
  const commonPassword = 'normal_password';

  test('compare encrypted password with unencrypted password --> Success', async () => {
    const encryptedPassword = await Encryptor.HashPassword(commonPassword);
    const expectedBoolean = await Encryptor.IsSamePassword(
      commonPassword,
      encryptedPassword,
    );

    expect(expectedBoolean).toBeTruthy();
  });

  test('compare encrypted password with unencrypted password --> Fail', async () => {
    const encryptedPassword = await Encryptor.HashPassword(commonPassword);
    const expectedBoolean = await Encryptor.IsSamePassword(
      encryptedPassword,
      commonPassword,
    );

    expect(expectedBoolean).toBeFalsy();
  });
});
