import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(userDto: UserDto): Promise<void> {
    return this.userRepository.createUser(userDto);
  }

  async signIn(userDto: UserDto): Promise<{ token: string }> {
    const { username, password } = userDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const token = this.jwtService.sign(payload);

      return { token };
    }
    throw new UnauthorizedException('wrong username or password');
  }
}
