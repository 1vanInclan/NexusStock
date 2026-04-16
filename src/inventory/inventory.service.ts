import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovementType } from '@prisma/client';

@Injectable()
export class InventoryService {

  constructor(private prisma: PrismaService){}


  async create(createInventoryDto: CreateInventoryDto) {
    const {productId, quantity, type, reason} = createInventoryDto

    return await this.prisma.$transaction(async (tx) => {

      const product = await tx.product.findUniqueOrThrow({
        where: { id: productId }
      });

      if(product.stock < quantity && type === MovementType.OUT) {
        throw new BadRequestException(
          `Stock insuficiente. Disponible: ${product.stock}, Solicitado: ${quantity}`
        )
      }

      const newStock = type === MovementType.IN
        ? product.stock + quantity
        : product.stock - quantity;

      const updatedProduct = await tx.product.update({
        where: {id: productId},
        data: {stock: newStock}
      })

      const log = await tx.inventoryLog.create({
        data: {
          type,
          quantity,
          reason: reason || (type === MovementType.IN ? 'Entrada manual' : 'Salida Manual'),
          productId
        }
      })

      return {
        message: "Ajuste realizado con exito",
        newStock: updatedProduct.stock,
        logId: log.id
      }
      
    })
  }

  async findAll() {
    return await this.prisma.inventoryLog.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.inventoryLog.findFirstOrThrow({
      where: {id}
    })
  }
}
