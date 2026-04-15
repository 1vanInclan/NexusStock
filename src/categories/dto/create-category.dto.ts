import { IsNotEmpty, IsString, MaxLength, MinLength,  } from "class-validator";

export class CreateCategoryDto {
  @IsString({message: 'El nombre debe ser un string'})
  @IsNotEmpty({message: 'El nombre de la categoria es obligatoria'})
  @MinLength(3, {message: 'El nombre debe ser mayor a 3 caracteres'})
  @MaxLength(50, {message: 'La longitud maxima del nombre es de 50 caracteres'})
  name: string;
}
