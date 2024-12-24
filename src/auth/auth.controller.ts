import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() userDto: UserDto) {
    return this.authService.signup(userDto);
  }
  @Post('/signin')
  async signInUser(@Body() userDto: UserDto): Promise<{ token: string }> {
    return this.authService.signIn(userDto);
  }
}
