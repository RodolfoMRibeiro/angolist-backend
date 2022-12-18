import { UserDto } from '../../../modules/login/dto/registration/user';
import { LoginDto } from '../../../modules/login/dto/registration/login';

export interface IUserService {
  Create(user: UserDto): Promise<void>;
  Login(user: LoginDto): Promise<boolean>;
  Update(user: UserDto): Promise<UserDto>;
  Delete(email: string): Promise<boolean>;
}
