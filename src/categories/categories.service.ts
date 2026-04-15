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
      where: {id}
    })

    if(!cat){
      throw new NotFoundException(`Categorie with id ${id} not found`)
    }

    return cat
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
