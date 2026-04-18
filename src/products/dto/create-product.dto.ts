import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, Min, ValidateNested } from "class-validator";

export class CreateProductDto {

  @IsString({message: 'El sku debe ser un string'})
  @IsNotEmpty({message: 'No puede ir vacio el sku'})
  @MaxLength(15, {message: 'La cantidad maxima de caracteres es 15'})
  sku: string;

  @IsString({message: 'El name debe ser un string'})
  @IsNotEmpty({message: 'No puede ir vacio el name'})
  @MaxLength(100)
  name: string;

  @IsNumber({maxDecimalPlaces: 2})
  @IsNotEmpty({message: 'No puede ir vacio el price'})
  @Type(() => Number)
  @IsPositive({message: "El numero debe ser positivo"})
  price: number;

  @IsInt({message: 'El stock debe ser un numero'})
  @IsNotEmpty({message: 'No puede ir vacio el stock'})
  @Min(0)
  @Type(() => Number)
  stock: number;

  @IsUUID()
  @IsNotEmpty({message: 'No puede ir vacio el categoryId'})
  categoryId: string;
}

export class CreateProductsBulkDto {
  @ApiProperty({ type: [CreateProductDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}
