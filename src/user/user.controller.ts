import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
  HttpCode,
  HttpStatus,
  ConflictException,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { JWTAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  // create user
  @ApiOperation({ summary: 'Create user. Only admin can create a new user.' })
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @Roles('admin')
  @UseGuards(JWTAuthGuard, RolesGuard)
  async createUser(@Body() CreateUserDTO: UserDTO) {
    try {
      return await this.service.createUser(CreateUserDTO);
    } catch (error) {
      throw new ConflictException('User already exists');
    }
  }

  // get user by id
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.service.findOne({ id: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    delete user.role;
    delete user.password;
    return user;
  }

  // delete user by id
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @Roles('admin')
  @UseGuards(JWTAuthGuard, RolesGuard)
  async deleteUserByID(@Param('id') id: string) {
    const user = await this.service.findOne({ id: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    try {
      await this.service.deleteUserByID(user.id);
      return `${user.username} deleted`;
    } catch (error) {
      return error.message;
    }
  }

  //get all user , cache test
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllCache() {
    const users = await this.service.getAllCache();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return { result: users };
  }


  // get all user.
  // @HttpCode(HttpStatus.OK)
  // @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async getAll(@Query() queries: QueryParamsDto) {
  //   const users = await this.service.getAll(queries);
  //   if (!users) {
  //     throw new NotFoundException('Users not found');
  //   }
  //   return { result: users };
  // }

}
