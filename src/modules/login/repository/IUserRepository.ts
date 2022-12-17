import { LoginDto } from '../dto/registration/login';
import { UserDto } from '../dto/registration/user';

export interface IUserRepository {
  Create(user: UserDto): Promise<void>;
  Login(email: string): Promise<LoginDto>;
  Update(user: UserDto): Promise<UserDto>;
}
