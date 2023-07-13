import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/user.dto';
import { Role } from './entities/role.entity';
import { encodePassword } from '../utils/bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async findOne(data) {
    return await this.userRepository.findOne({
      where: data,
      relations: ['role'],
    });
  }

  // create user service
  async createUser(data: UserDTO) {
    const dataRole = !data.role ? 'user' : data.role;
    const existingRole = await this.roleRepository.findOne({
      where: { name: dataRole },
    });
    const hashedPassword = await encodePassword(data.password);
    const user = await this.userRepository.create({
      ...data,
      role: existingRole,
      password: hashedPassword,
    });

    const newUser = await this.userRepository.save(user);

    // cache user
    const cacheKey = 'users';
    const users = await this.userRepository.find({});
    await this.cacheManager.set(cacheKey, users, 300000);
    //cache user

    delete newUser.role;
    delete newUser.password;
    return newUser;
  }

  // delete user by id service
  async deleteUserByID(id) {
    return await this.userRepository.delete(parseInt(id));
  }

  // get all user service
  async getAll(queries) {
    const { pageSize, pageNum, sortBy, sortDir } = queries;

    const sortQuery = { [sortBy]: sortDir.toUpperCase() };
    const skipUser = pageSize * pageNum - pageSize;

    const users = await this.userRepository.find({
      order: sortQuery,
      take: pageSize,
      skip: skipUser,
      select: ['id', 'username', 'email'],
    });

    return users;
  }

  async getAllCache() {
    const cacheKey = 'users';
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const users = await this.userRepository.find({});

    await this.cacheManager.set(cacheKey, users, 300000);

    return users;
  }
}
