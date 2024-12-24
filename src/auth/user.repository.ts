import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user-dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
  async createUser(userDto: UserDto): Promise<void> {
    const { username, password } = userDto;

    const user = this.create({ username, password });
    try {
      await this.save(user);
    } catch (error) {
      if (error.detail.includes('already exists')) {
        throw new ConflictException('Username already exists');
      }
      throw new InternalServerErrorException();
    }
  }
}
