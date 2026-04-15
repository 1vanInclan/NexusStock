import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [InventoryModule, ProductsModule, CategoriesModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
