import { MovementType } from "@prisma/client"
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator"


export class CreateInventoryDto {

  @IsEnum(MovementType)
  @IsNotEmpty()
  type: MovementType

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number

  @IsString()
  @IsOptional()
  reason: string

  @IsUUID()
  @IsNotEmpty()
  productId: string
}
