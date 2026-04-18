import { Injectable } from '@nestjs/common';
import { CreateProductDto, CreateProductsBulkDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto,
    });
  }

  async createMany(createProductsBulkDto: CreateProductsBulkDto) {
    const { products } = createProductsBulkDto;

    return await this.prisma.product.createMany({
      data: products,
      skipDuplicates: true,
    });
  }

  async findAll(categoryId?: string, minPrice?: number, maxPrice?: number) {
    return await this.prisma.product.findMany({
      where: {
        categoryId: categoryId || undefined,

        price: {
          gte: minPrice || undefined,
          lte: maxPrice || undefined,
        },
      },
      include: {
        category: { select: { name: true } },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: {
        category: {
          select: { name: true },
        },
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }

  async getLowStock() {
    const min = 5;
    return await this.prisma.product.findMany({
      where: {
        stock: {
          lte: min,
        },
      },
      include: {
        category: { select: { name: true } },
      },
      orderBy: {
        stock: 'asc',
      },
    });
  }
}
