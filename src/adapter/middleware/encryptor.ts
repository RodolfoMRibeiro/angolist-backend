import * as bcrypt from 'bcrypt';

export class Encryptor {
  private static readonly _saltRounds: number = 10;

  public static HashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt
      .hash(password, this._saltRounds)
      .then((encryptedPassword) => {
        return encryptedPassword;
      })
      .catch((err) => {
        throw new Error(`COULD NOT GENERATE HASH: ${err}`);
      });

    return hashedPassword;
  };

  public static IsSamePassword = async (
    currentPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> => {
    const isSamePassword = bcrypt
      .compare(currentPassword, encryptedPassword)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(`COULD NOT VALIDATE PASSWORD: ${err}`);
      });

    return isSamePassword;
  };
}
