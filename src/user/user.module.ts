import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { AuthService } from '../auth/auth.service';
import { Role } from './entities/role.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    PassportModule,
    CacheModule.register(),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, AuthService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
