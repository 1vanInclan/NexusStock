import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested,  } from "class-validator";

export class CreateCategoryDto {
  @IsString({message: 'El nombre debe ser un string'})
  @IsNotEmpty({message: 'El nombre de la categoria es obligatoria'})
  @MinLength(3, {message: 'El nombre debe ser mayor a 3 caracteres'})
  @MaxLength(50, {message: 'La longitud maxima del nombre es de 50 caracteres'})
  name: string;
}

export class CreateCategoriesBulkDto {
  @ApiProperty({ type: [CreateCategoryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  categories: CreateCategoryDto[];
}
