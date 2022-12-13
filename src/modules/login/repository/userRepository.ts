import { LoginDto } from '../dto/login';
import { UserDto } from '../dto/user';

export interface IUserRepository {
  Create(user: UserDto): Promise<void>;
  Login(email: string): Promise<LoginDto>;
}
