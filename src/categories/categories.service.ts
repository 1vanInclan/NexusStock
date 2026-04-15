import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {

  constructor ( private prisma: PrismaService ){}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError){
        if( error.code === 'P2002' ){
          throw new ConflictException('Ya existe una categoria con ese nombre')
        }
      }
    }
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
    const cat = await this.prisma.category.findUnique({
      where: {id},
      include: {
        _count: {
          select: {products: true}
        }
      }
    })

    if(!cat){
      throw new NotFoundException(`Categorie with id ${id} not found`)
    }

    return cat
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    const cat = await this.findOne(id)

    if(cat._count.products > 0){
      throw new ConflictException(
        `No se puede eliminar la categoria porque tiene ${cat._count.products} productos asociados`
      )
    }

    return await this.prisma.category.delete({
      where: {id}
    })

  }
}
