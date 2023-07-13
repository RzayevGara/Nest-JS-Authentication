import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
// import { UserDto, User } from './dto/user.dto';

@Injectable()
export class ConverterDtoToEntity {
  dtoToEntity(dto, entity) {
    return plainToClass(entity, dto);
  }
}
