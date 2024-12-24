import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user-dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signup(userDto: UserDto): Promise<void> {
    return this.userRepository.createUser(userDto);
  }
}
