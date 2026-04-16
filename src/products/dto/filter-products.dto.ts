import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsUUID } from 'class-validator';

export class FilterProductsDto {
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;
}