import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {  Product } from './entities/product.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService], // optional, if used in other modules
})
export class ProductModule {}
