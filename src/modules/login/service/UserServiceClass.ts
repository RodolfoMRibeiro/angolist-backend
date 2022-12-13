import { UserDto } from '../dto/user';
import { IUserService } from './UserServiceInterface';
import { IUserRepository } from '../repository/userRepository';
import { Encryptor } from '../../../adapter/middleware/encryptor';
import { LoginDto } from '../dto/login';

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
}
