import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsIn } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(25)
  password: string;

  @IsNotEmpty()
  @IsIn(['user', 'admin'])
  role: string;
}
