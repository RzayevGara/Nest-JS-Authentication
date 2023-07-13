import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  ConflictException,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JWTAuthGuard } from './guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  // register user
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async registerUser(@Body() createUserDTO: RegisterDTO) {
    try {
      return await this.service.register(createUserDTO);
    } catch (error) {
      throw new ConflictException('User already exists');
    }
  }

  // login user
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Req() req, @Body() authDto: AuthDTO) {
    return this.service.login(req.user);
  }

  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  @Get('check-token')
  checkToken(@Req() req) {
    delete req.user.role;
    return req.user;
  }
}
