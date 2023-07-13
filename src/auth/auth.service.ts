import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../utils/bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async register(createUserDTO) {
    const user = await this.userService.createUser(createUserDTO);
    delete user.password;
    delete user.role;
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (user) {
      const matched = await comparePassword(password, user.password);
      if (matched) {
        return user;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      email: user.email,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyPayload(payload) {
    const user = await this.userService.findOne({ email: payload.email });
    delete user.password;
    return user;
  }
}
