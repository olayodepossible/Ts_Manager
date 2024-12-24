import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwtPayload';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: 'test223test',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('You are not authorized');
    }
    return user;
  }
}
