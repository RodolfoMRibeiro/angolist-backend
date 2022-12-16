import { UserDto } from '../dto/user';
import { LoginDto } from '../dto/login';

export interface IUserService {
  Create(user: UserDto): Promise<void>;
  Login(user: LoginDto): Promise<boolean>;
  Update(user: UserDto): Promise<UserDto>;
}
