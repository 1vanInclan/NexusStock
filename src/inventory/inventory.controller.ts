import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(id);
  }
}
