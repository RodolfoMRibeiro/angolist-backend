import { UserDto } from '../dto/registration/user';
import { IUserService } from '../../../common/models/interfaces/IUserService';
import { IUserRepository } from '../repository/IUserRepository';
import { Encryptor } from '../../../adapter/middleware/encryptor';
import { LoginDto } from '../dto/registration/login';

export class UserService implements IUserService {
  private _repository: IUserRepository;

  public constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  public async Create(user: UserDto): Promise<void> {
    try {
      user.password = await Encryptor.HashPassword(user.password);
      await this._repository.Create(user);
    } catch (err) {
      throw new Error(<string>err);
    }
  }

  public async Login(user: LoginDto): Promise<boolean> {
    try {
      const registredUser = await this._repository.Login(user.email);
      const isValidPassword = await Encryptor.ComparePasswordWithHash(
        user.password,
        registredUser.password,
      );
      return isValidPassword;
    } catch (err) {
      throw new Error(<string>err);
    }
  }

  public async Update(user: UserDto): Promise<UserDto> {
    try {
      if (user.password != undefined && user.password != null) {
        user.password = await Encryptor.HashPassword(user.password);
      }
      return await this._repository.Update(user);
    } catch (err) {
      throw new Error(<string>err);
    }
  }

  public async Delete(email: string): Promise<boolean> {
    try {
      await this._repository.Delete(email);
      return true;
    }catch(err) {
      return false
    }
  }
}
