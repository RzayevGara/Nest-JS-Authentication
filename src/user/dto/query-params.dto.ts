import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize = 3;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNum = 1;

  @IsOptional()
  @IsIn(['username', 'email'])
  sortBy = 'email';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortDir = 'asc';
}
