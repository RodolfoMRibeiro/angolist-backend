import { UserDto } from '../dto/user';
import { UserService } from './UserServiceClass';
import { IUserRepository } from '../repository/userRepository';
import { LoginDto } from '../dto/login';

export const NewService = (repository: IUserRepository): IUserService => {
  return new UserService(repository);
};

export interface IUserService {
  Create(user: UserDto): Promise<void>;
  Login(user: LoginDto): Promise<boolean>;
}
