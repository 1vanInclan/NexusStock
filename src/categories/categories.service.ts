import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoriesBulkDto, CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor ( private prisma: PrismaService ){}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({
      include: {
        _count: {
          select: {products: true}
        }
      }
    })
  }

  async findOne(id: string) {
    return await this.prisma.category.findUniqueOrThrow({
      where: { id },
      include: {
        _count: { select: { products: true } },
      },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    const cat = await this.findOne(id);

    if (cat._count.products > 0) {
      throw new ConflictException(
        `No se puede eliminar la categoría porque tiene ${cat._count.products} productos asociados`,
      );
    }

    return await this.prisma.category.delete({
      where: { id },
    });

  }

  async createMany(createCategoriesBulkDto: CreateCategoriesBulkDto) {
    const { categories } = createCategoriesBulkDto;

    return await this.prisma.category.createMany({
      data: categories,
      skipDuplicates: true
    })
  }

  
}
